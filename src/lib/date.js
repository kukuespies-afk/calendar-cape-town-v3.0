const DAY_MS = 24 * 60 * 60 * 1000;

export function nowIso() {
  return new Date().toISOString();
}

export function startOfDay(dateLike) {
  const date = new Date(dateLike);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfDay(dateLike) {
  const date = new Date(dateLike);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function addDays(dateLike, days) {
  return new Date(new Date(dateLike).getTime() + DAY_MS * days);
}

export function inRange(dateLike, start, end) {
  const value = new Date(dateLike).getTime();
  return value >= new Date(start).getTime() && value <= new Date(end).getTime();
}

export function formatHuman(dateLike, timezone = 'Africa/Johannesburg') {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: timezone,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateLike));
}

export function startOfWeek(dateLike = new Date()) {
  const date = startOfDay(dateLike);
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return addDays(date, mondayOffset);
}
