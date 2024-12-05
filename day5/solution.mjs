import fs from "node:fs";

const input = fs.readFileSync("./input.txt").toString();

const [rawOrderRules, rawUpdates] = input.split("\n\n");

const orderRules = rawOrderRules
  .trim()
  .split("\n")
  .reduce((obj, str) => {
    const [left, right] = str.split("|").map((s) => parseInt(s, 10));
    obj[left] = (obj[left] || new Set()).add(right);

    return obj;
  }, {});

const updates = rawUpdates
  .trim()
  .split("\n")
  .map((l) => l.split(",").map((s) => parseInt(s, 10)));

const sumMiddlePages = (updates) =>
  updates.reduce(
    (sum, update) => sum + update[Math.floor(update.length / 2)],
    0
  );

const isValidPage = (page, i, update) => {
    const rule = orderRules[page];
    const lookBehind = new Set(update.slice(0, i));

    return rule ? lookBehind.isDisjointFrom(rule) : true;
}

const isValidUpdate = (update) =>
  update.every(isValidPage);

// 5732
console.log(sumMiddlePages(updates.filter(isValidUpdate)));

const fixedUpdates = updates
  .filter((update) => !isValidUpdate(update))
  .map((invalidUpdate) => {
    const updateSet = new Set(invalidUpdate);

    const withoutInvalidPages = invalidUpdate.filter(isValidPage)
    const invalidPages = updateSet.difference(new Set(withoutInvalidPages))

    for (const invalidPage of invalidPages) {
      const rule = orderRules[invalidPage];
      const idx = withoutInvalidPages.findIndex(page => rule.has(page))
      withoutInvalidPages.splice(idx, 0, invalidPage)
    }

    return withoutInvalidPages
  });

// 4716
console.log(sumMiddlePages(fixedUpdates))
