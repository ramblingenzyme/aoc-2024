import fs from "node:fs";

let input = fs.readFileSync("./input.txt", "utf-8");
let grid = input.split("\n").map((line) => line.split(""));
let grid_dimensions = [grid[0].length, grid.length];

let is_valid_x = (x) => 0 <= x && x <= grid_dimensions[0];
let is_valid_y = (y) => 0 <= y && y <= grid_dimensions[1];

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

let follow_vector = (origin, [dx, dy], len, grid) => {
  const results = [];
  let cursor = [...origin];

  while (results.length < len) {
    const [cx, cy] = cursor;
    if (!is_valid_x(cx) || !is_valid_y(cy)) {
      break;
    }

    results.push(grid[cx][cy]);
    // console.log({ cursor, results });
    cursor = [cx + dx, cy + dy];
  }

  return results.join("");
};

const SEARCH_STRING = "XMAS";

let map_grid = (grid, fn) =>
  grid.flatMap((line, x) => line.flatMap((char, y) => fn(char, [x, y])));

/* Part 1 */
let xmas_results = map_grid(grid, (char, coord) =>
  char === SEARCH_STRING[0]
    ? vectors.map((d) =>
        follow_vector(coord, d, SEARCH_STRING.length, grid)
      )
    : []
).filter((x) => x === SEARCH_STRING);

console.log(xmas_results.length);

/* Part 2 */
let diagonal_vectors = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const MAS_SEARCH_LENGTH = 2;

let is_mas = ({ d: [dx, dy], r }, _, rarr) => {
  if (r === "AS") {
    let iv = [0 - dx, 0 - dy];
    let ir = rarr.find(
      ({ d: [rdx, rdy] }) =>
        rdx === iv[0] && rdy === iv[1]
    );

    return ir.r === "AM";
  }
};

let x_mas_results = map_grid(grid, (char, coord) => {
  if (char !== "A") {
    return false;
  }

  let results = diagonal_vectors.map((d) => ({
    d,
    r: follow_vector(coord, d, MAS_SEARCH_LENGTH, grid),
  }));

  return results.filter(is_mas).length === 2;
}).filter((x) => x === true).length;

console.log(x_mas_results);
