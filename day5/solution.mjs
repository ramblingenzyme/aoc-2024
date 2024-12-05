import fs from "node:fs";

const [rawOrderRules, rawUpdates] = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n\n");

const ORDER_RULES = rawOrderRules
  .trim()
  .split("\n")
  .map((str) => str.split("|").map((s) => parseInt(s, 10)))
  .reduce((obj, [l, r]) => ((obj[l] = (obj[l] || new Set()).add(r)), obj), {});

const UPDATES = rawUpdates
  .trim()
  .split("\n")
  .map((l) => l.split(",").map((s) => parseInt(s, 10)));

const sum = (arr) => arr.reduce((s, x) => s + x, 0);
const arrayMiddle = (arr) => arr[Math.floor(arr.length / 2)];
const sumMiddlePages = (updates) => sum(updates.map(arrayMiddle));

const isValidPage = (page, i, update) =>
  ORDER_RULES[page]
    ? new Set(update.slice(0, i)).isDisjointFrom(ORDER_RULES[page])
    : true;

const isValidUpdate = (update) => update.every(isValidPage);

const splitByValidity = (update) => [
  update.filter(isValidPage),
  update.filter((...args) => !isValidPage(...args)),
];

const findFixedLocation = (invalidPage, update) =>
  update.findIndex((page) => ORDER_RULES[invalidPage].has(page));

const fixSplitUpdate = ([validPages, invalidPages]) =>
  invalidPages.reduce(
    (update, invalidPage) =>
      update.toSpliced(findFixedLocation(invalidPage, update), 0, invalidPage),
    validPages
  );

// 5732
console.log(sumMiddlePages(UPDATES.filter(isValidUpdate)));

// 4716
console.log(
  sumMiddlePages(
    UPDATES
      .filter((update) => !isValidUpdate(update))
      .map((update) => fixSplitUpdate(splitByValidity(update)))
  )
);
