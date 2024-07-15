import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getElapsedTime(timeStart){
  if(timeStart === null) return '00:00:00';
  const diffInMilliseconds = moment().diff(timeStart);
  const duration = moment.duration(diffInMilliseconds);
  return moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
}