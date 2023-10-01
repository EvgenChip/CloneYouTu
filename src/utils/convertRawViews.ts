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
