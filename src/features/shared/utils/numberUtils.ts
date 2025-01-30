export function formatNumberWithCommas(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatNumberToUnit(n: number) {
  if (n < 1_000_000) {
    return n.toLocaleString();
  }
  return (n / 1_000_000).toFixed(1) + "M";
}

export function extractStartAndEnd(arr: number[]) {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }
  arr.sort();
  return { startAt: arr[0], endAt: arr[arr.length - 1] };
}

export function extractNumber(val: string) {
  const mat = val.match(/\d+/) || ["0"];
  return parseFloat(mat[0]);
}
