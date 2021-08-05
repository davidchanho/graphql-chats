import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatDate = (date: string) => {
  return dayjs(date).fromNow(false);
};

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
