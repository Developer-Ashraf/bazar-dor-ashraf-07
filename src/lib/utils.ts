// bangla digit formating
export function toBanglaNumber(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const str = input.toString();
  return str.replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)]);
}

// taka formating
export function formatBanglaPrice(num: number | undefined | null): string {
  if (num === undefined || num === null) return "০ টাকা";
  const formatted = num.toLocaleString("en-US");
  return `${toBanglaNumber(formatted)} টাকা`;
}

// rice change formating
export function formatChange(pct: number | undefined | null, dir?: string) {
  if (pct === undefined || pct === null) return { text: "— ০.০%", color: "text-gray-500", bg: "bg-gray-100" };
  const absVal = Math.abs(pct).toFixed(1);
  const bnVal = toBanglaNumber(absVal);
  
  if (dir === "up" || pct > 0) {
    return {
      text: `▲ ${bnVal}%`,
      color: "text-rose-600",
      bg: "bg-rose-50",
      dir: "up",
    };
  } else if (dir === "down" || pct < 0) {
    return {
      text: `▼ ${bnVal}%`,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      dir: "down",
    };
  }
  return {
    text: `— ০.০%`,
    color: "text-gray-500",
    bg: "bg-gray-100",
    dir: "flat",
  };
}

// Bangla date formate
export function getBanglaDate(): string {
  const date = new Date();
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  
  const dayName = days[date.getDay()];
  const day = toBanglaNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = toBanglaNumber(date.getFullYear());

  return `${dayName}, ${day} ${month}, ${year}`;
}
