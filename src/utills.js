export const roundDownToNearestTen = (num, minValuePercentage) => {
  if (num < 100) {
    return Math.floor(num / 10) * 10;
  }
  return Math.floor(num / 10) * 10;
};
export const roundUpToNearestTen = (num, minValuePercentage) => {
  if (num < 101) {
    return 100 + 100 - minValuePercentage;
  }
  return Math.ceil(num / 10) * 10;
};

export const calculatePercentage = (value, min, max) => {
  // Normalize min and max if min > max
  if (min > max) {
    [min, max] = [max, min];
  }

  if (value <= min) return 0;
  if (value >= max) return 100;

  const range = max - min;
  const progress = value - min;
  return (progress / range) * 100;
};

export function formatWattsToKWh(watts) {
  // Convert watts to kilowatt-hours (1 kilowatt = 1000 watts)
  const kWh = watts / 1000;

  // Round to the nearest whole number
  const roundedKWh = Math.round(kWh);

  // Format with thousands separator
  const formatted = roundedKWh.toLocaleString();

  // Add unit suffix
  return `${formatted}KWh`;
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
