export default class Report {
  #reportLevelsArray;

  #subReportCheck;

  constructor(theReportLine, subReportCheck = false) {
    if (typeof theReportLine !== "string") {
      throw new Error("reportLine must be string");
    }

    if (!/^(\d+ )+\d+$/.test(theReportLine)) {
      throw new Error(
        `reportLine is not in the correct format of numbers separated by spaces: ${[
          theReportLine,
        ]}`
      );
    }

    const levels = theReportLine.split(" ").map((level) => parseInt(level, 10));

    if (levels.some((level) => isNaN(level))) {
      throw new Error("Some levels could not be parsed as numbers.");
    }

    this.#reportLevelsArray = levels;
    this.#subReportCheck = subReportCheck;
  }

  meetsSafetyStandards() {
    let thePreviousLevel = this.#reportLevelsArray[0];
    let levelsAreAscending = new Boolean(
      this.#reportLevelsArray[1] > thePreviousLevel
    );
    for (let index = 1; index < this.#reportLevelsArray.length; index++) {
      const current = this.#reportLevelsArray[index];

      if (current > thePreviousLevel) {
        if (current - thePreviousLevel > 3) {
          return false;
        } else if (levelsAreAscending.valueOf() === false) {
          return false;
        }
      } else if (current < thePreviousLevel) {
        if (thePreviousLevel - current > 3) {
          return false;
        } else if (levelsAreAscending.valueOf() === true) {
          return false;
        }
      } else {
        return false;
      }

      thePreviousLevel = current;
    }

    return true;
  }

  meetsSafetyStandardsV2() {
    let thePreviousLevel = this.#reportLevelsArray[0];
    let levelsAreAscending = new Boolean(
      this.#reportLevelsArray[1] > thePreviousLevel
    );
    let badLevelIndexes = [];

    for (let index = 1; index < this.#reportLevelsArray.length; index++) {
      const current = this.#reportLevelsArray[index];

      if (current > thePreviousLevel) {
        if (current - thePreviousLevel > 3) {
          badLevelIndexes.push(index);
        } else if (levelsAreAscending.valueOf() === false) {
          badLevelIndexes.push(index);
        }
      } else if (current < thePreviousLevel) {
        if (thePreviousLevel - current > 3) {
          badLevelIndexes.push(index);
        } else if (levelsAreAscending.valueOf() === true) {
          badLevelIndexes.push(index);
        }
      } else {
        badLevelIndexes.push(index);
      }

      thePreviousLevel = current;
    }

    if (badLevelIndexes.length === 1) {
      if (this.#subReportCheck === true) {
        return false;
      }

      const numberOfValidSubReports = badLevelIndexes
        .map((badIndex) => {
          const newReportLine = this.#reportLevelsArray
            .filter((_, index) => index !== badIndex)
            .join(" ");
          return new Report(newReportLine, true);
        })
        .filter((subReport) => subReport.meetsSafetyStandards()).length;

      if (numberOfValidSubReports >= 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  toString() {
    return this.#reportLevelsArray.join(" ");
  }
}
