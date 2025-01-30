import { omit } from "lodash-es";

export function changeObjectKey<T extends { [key: string]: unknown }>(
  arr: T[],
  originalName: string,
  changedName: string
) {
  return arr.map((item) =>
    omit(
      {
        ...item,
        [changedName]: item[originalName],
      },
      [originalName]
    )
  );
}
