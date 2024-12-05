import fs from "node:fs/promises";

export default class FileReader {
    #filePromise;

    constructor(path) {
        this.#filePromise = fs.open(path);
    }

    async readLines() {
        return (await this.#filePromise).readLines()
    }
}
