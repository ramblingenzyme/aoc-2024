import Report from "./Report.mjs"

export default class ReportFactory {
    constructor() {
    }

    build(line) {
        return new Report(line)
    }
}
