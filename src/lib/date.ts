import { format } from "date-fns/format";

export function formatDate(date: Date) {
  return format(date, "MMMM d, yyyy");
}
