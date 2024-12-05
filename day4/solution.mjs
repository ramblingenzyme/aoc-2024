import fs from "node:fs";

let input = fs.readFileSync("./input.txt", "utf-8");
let grid = input.split("\n").map((line) => line.split(""));
let gridDimensions = [grid[0].length, grid.length];

let isValidX = (x) => 0 <= x && x <= gridDimensions[0];
let isValidY = (y) => 0 <= y && y <= gridDimensions[1];

let vectors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],

  [0, -1],
  // [0, 0],
  [0, 1],

  [1, -1],
  [1, 0],
  [1, 1],
];

let followVector = (origin, [dx, dy], len, grid) => {
  const results = [];
  let cursor = [...origin];

  while (results.length < len) {
    const [cx, cy] = cursor;
    if (!isValidX(cx) || !isValidY(cy)) {
      break;
    }

    results.push(grid[cx][cy]);
    // console.log({ cursor, results });
    cursor = [cx + dx, cy + dy];
  }

  return results.join("");
};

const SEARCH_STRING = "XMAS";

let mapGrid = (grid, fn) =>
  grid.flatMap((line, x) => line.flatMap((char, y) => fn(char, [x, y])));

/* Part 1 */
let xmasResults = mapGrid(grid, (char, coord) =>
  char === SEARCH_STRING[0]
    ? vectors.map((d) =>
        followVector(coord, d, SEARCH_STRING.length, grid)
      )
    : []
).filter((x) => x === SEARCH_STRING);

console.log(xmasResults.length);

/* Part 2 */
let diagonalVectors = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const MAS_SEARCH_LENGTH = 2;

let isMas = ({ d: [dx, dy], r }, _, rarr) => {
  if (r === "AS") {
    let inverseVector = [0 - dx, 0 - dy];
    let inverseResult = rarr.find(
      ({ d: [rdx, rdy] }) =>
        rdx === inverseVector[0] && rdy === inverseVector[1]
    );

    return inverseResult.r === "AM";
  }
};

let x_MasResults = mapGrid(grid, (char, coord) => {
  if (char !== "A") {
    return false;
  }

  let results = diagonalVectors.map((d) => ({
    d,
    r: followVector(coord, d, MAS_SEARCH_LENGTH, grid),
  }));

  return results.filter(isMas).length === 2;
}).filter((x) => x === true).length;

console.log(x_MasResults);
