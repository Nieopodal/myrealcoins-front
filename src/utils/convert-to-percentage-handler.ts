export const convertToPercentageHandler = (a: number, b: number): string => {
    return (a/b*100).toFixed(0) + '%';
}
