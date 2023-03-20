export  const chartColorHandler = (
    resultColors: string[],
    neutralRefColor: string,
    primaryRefColor: string,
    warningRefColor: string,
    successRefColor: string,
    ): string[] => {
    const basicNeedsColorIndex = resultColors.findIndex(el => el === "neutral");
    const additionalNeedsColorIndex = resultColors.findIndex(el => el === "primary");
    const freeTimeColorIndex = resultColors.findIndex(el => el === "warning");
    const unexpectedColorIndex = resultColors.findIndex(el => el === "success");

    const sortedColorsArr: string[] = [];

    if (basicNeedsColorIndex >= 0) {
        sortedColorsArr.push(neutralRefColor);
    }
    if (additionalNeedsColorIndex >= 0) {
        sortedColorsArr.push(primaryRefColor);
    }
    if (freeTimeColorIndex >= 0) {
        sortedColorsArr.push(warningRefColor);
    }
    if (unexpectedColorIndex >= 0) {
        sortedColorsArr.push(successRefColor);
    }
    return sortedColorsArr
}