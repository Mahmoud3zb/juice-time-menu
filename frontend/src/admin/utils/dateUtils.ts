/**
 * Returns the business date in YYYY-MM-DD format based on local time.
 * For food & beverage businesses operating past midnight (e.g. 10:00 AM - 2:00 AM),
 * hours before cutoffHour (default: 5:00 AM) are considered part of the previous day's shift.
 */
export const getBusinessDate = (cutoffHour: number = 5): string => {
  const now = new Date();
  if (now.getHours() < cutoffHour) {
    now.setDate(now.getDate() - 1);
  }
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Format date string into Arabic friendly representation.
 */
export const formatArabicDate = (dateStr: string): string => {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
};
