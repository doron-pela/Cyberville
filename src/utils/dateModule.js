import { format, subDays, addDays, getYear, startOfMonth, endOfMonth } from "date-fns";

const today = new Date();
// Past week
const oneWeekAgo = subDays(today, 7);
const pastWeekRange = `${format(oneWeekAgo, "yyyy-MM-dd")},${format(
  today,
  "yyyy-MM-dd"
)}`;

// Next week
const oneWeekFromNow = addDays(today, 7);
const nextWeekRange = `${format(today, "yyyy-MM-dd")},${format(
  oneWeekFromNow,
  "yyyy-MM-dd"
)}`;

function getMonthlyRanges(year) {
  const ranges = [];
  for (let month = 0; month < 12; month++) {
    const firstDay = startOfMonth(new Date(year, month, 1));
    const lastDay = endOfMonth(new Date(year, month, 1));

    const range = `${format(firstDay, "yyyy-MM-dd")},${format(
      lastDay,
      "yyyy-MM-dd"
    )}`;
    ranges.push(range);
  }
  return ranges;
}

const currentYear = getYear(new Date());
const calendarRange = getMonthlyRanges(currentYear);
const monthStrings = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export { today, monthStrings, calendarRange, pastWeekRange, nextWeekRange }


