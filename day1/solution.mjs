import fs from "node:fs";

const input = fs.readFileSync("./input.txt", "utf-8");

const lists = input
  .trim()
  .split("\n")
  .map((s) => s.split(",").map((s) => Number.parseInt(s, 10)))
  .reduce(
    (lists, [l1, l2]) => (lists[0].push(l1), lists[1].push(l2), lists),
    [[], []]
  );

lists.forEach((l) => l.sort());

let diff = 0;
for (const i of Array(lists[0].length).keys()) {
  diff += Math.abs(lists[0][i] - lists[1][i]);
}

// 1223326
console.log(diff);

let similarityScore = 0;
let current;
for (const i of Array(lists[0].length).keys()) {
  similarityScore += (current = lists[0][i], current * lists[1].filter(x => x === current).length);
}

// 21070419
console.log(similarityScore);
