import FileReader from "./io/FileReader.mjs";
import ReportFactory from "./ReportFactory.mjs";

async function main() {
    const enterpriseFileReader = new FileReader("./input.txt");
    const veryGoodReportFactory = new ReportFactory();

    const allTheFileLines = await Array.fromAsync(await enterpriseFileReader.readLines());
    const allTheReports = new Array(allTheFileLines.length);

    for (let currentIndex = 0; currentIndex < allTheFileLines.length; currentIndex++) {
        allTheReports[currentIndex] = veryGoodReportFactory.build(allTheFileLines[currentIndex])
    }

    let numberOfPassingReports = 0
    for (let currentIndex = 0; currentIndex < allTheReports.length; currentIndex++) {
        const theCurrentReport = allTheReports.at(currentIndex);
        if (theCurrentReport.meetsSafetyStandards()) {
            numberOfPassingReports++;
        }
    }

    // 472
    console.log(numberOfPassingReports);

    let numberOfPassingReportsV2 = 0
    for (let currentIndex = 0; currentIndex < allTheReports.length; currentIndex++) {
        const theCurrentReport = allTheReports.at(currentIndex);
        if (theCurrentReport.meetsSafetyStandardsV2()) {
            numberOfPassingReportsV2++;
        }
    }

    // Unknown
    console.log(numberOfPassingReportsV2);

}

main();
