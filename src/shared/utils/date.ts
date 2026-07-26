import dayjs from "dayjs";

export function formatDate(
  value?: string | null,
) {
  if (!value) {
    return "-";
  }

  return dayjs(value).format("DD.MM.YYYY");
}

export function getDayDifference(
    laterDate: string,
    earlierDate: string,
  ) {
    return Math.max(
      0,
      dayjs(laterDate).diff(
        dayjs(earlierDate),
        "day",
      ),
    );
  }
  
  export function getTodayAsDateString() {
    return dayjs().format("YYYY-MM-DD");
  }