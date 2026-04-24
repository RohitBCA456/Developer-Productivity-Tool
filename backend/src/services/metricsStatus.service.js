export const getMetricStatus = (metric) => {
  const { value, healthyRange, lowerIsBetter } = metric;

  if (lowerIsBetter) {
    if (value <= healthyRange.green) return "green";
    if (value <= healthyRange.amber) return "amber";
    return "red";
  } else {
    if (value >= healthyRange.green) return "green";
    if (value >= healthyRange.amber) return "amber";
    return "red";
  }
};
