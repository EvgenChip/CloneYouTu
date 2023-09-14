// export const convertRawViews = (labelValue: String, isSub = false): string => {
//   // Nine Zeroes for Billions
//   return Math.abs(Number(labelValue)) >= 1.0e9
//     ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(0) + "B"
//     : // Six Zeroes for Millions
//     Math.abs(Number(labelValue)) >= 1.0e6
//     ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(0) + "M"
//     : // Three Zeroes for Thousands
//     Math.abs(Number(labelValue)) >= 1.0e3
//     ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(isSub ? 2 : 0) + "K"
//     : Math.abs(Number(labelValue)).toString();
// };

export const convertRawViews = (labelValue: string, isSub = false): string => {
  const parsed = +labelValue;

  if (parsed >= 1.0e9) {
    return parsed.toFixed(0) + "B";
  }
  if (parsed >= 1.0e6) {
    return parsed.toFixed(0) + "M";
  }
  if (parsed >= 1.0e3) {
    return parsed.toFixed(isSub ? 2 : 0) + "K";
  }

  return labelValue;
};
