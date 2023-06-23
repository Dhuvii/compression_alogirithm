export default function sortObject<T>(
  a: T,
  b: T,
  property: keyof T,
  type: "desc" | "asc" = "asc"
) {
  const result = () => {
    if (a[property] > b[property]) return 1;
    if (a[property] < b[property]) return -1;
    return 0;
  };
  return type === "desc" ? result() * -1 : result();
}
