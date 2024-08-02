import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(text: string) {
  var trMap: Record<string, string> = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  };

  for (var key in trMap) {
    text = text.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
  }

  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, "")
    .replace(/\s/gi, "-")
    .replace(/[-]+/gi, "-")
    .toLowerCase();
}

export function extractAndRemovePostTitle(url: string, title: string): string {
  title = toSlug(title) + "-";

  const marker = "fiyati/";
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error('Marker "fiyati/" not found in URL');
  }

  const extractedPart = url.substring(markerIndex + marker.length);
  const cleanedPart = extractedPart.replace(title, "").replace(/\/+$/, "");

  return cleanedPart
    .replaceAll("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatMinutes(minutes: number | null): string {
  if (minutes === null) {
    return "";
  }

  if (minutes < 60) {
    return `${minutes} dk`;
  }

  let hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  if (remaining >= 30) {
    hours += 1;
  }

  return `${hours} saat`;
}

export function formatDateToYmd(date: Date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
