export default function (
  word: string | undefined | null,
  start: number,
  end: number
) {
  return word
    ? word
        .toUpperCase()
        .trim()
        .split("")
        .filter((letter) => letter !== " ")
        .slice(start, end)
        .join("")
    : "";
}
