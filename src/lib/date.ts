import { format } from "date-fns/format";

export function formatDate(date: string | number | Date) {
  return format(date, "MMMM d, yyyy");
}
