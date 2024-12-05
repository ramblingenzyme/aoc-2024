// Didn't end up using this, but afaik it's working and I like it.
const findNeighbours = (search, [x, y], grid) => {
    const start = [isValidX(x - 1) ? x - 1 : x, isValidY(y - 1) ? y - 1 : y];
    const end = [isValidX(x + 1) ? x + 1 : x, isValidY(y + 1) ? y + 1 : y];

    let cursor = [...start];
    const matchingNeighbours = [];

    do {
      const [cx, cy] = cursor;

      if (grid[cx][cy] === search) {
        matchingNeighbours.push([...cursor]);
      }

      if (cursor[0] < end[0]) {
        cursor[0] += 1;
      } else {
        cursor[0] = start[0];
        cursor[1] += 1;
      }
    } while (cursor[0] <= end[0] && cursor[1] <= end[1]);

    return matchingNeighbours;
  };
