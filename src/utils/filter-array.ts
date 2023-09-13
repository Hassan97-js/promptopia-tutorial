export const filterArray = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
) => {
  return array.filter(predicate);
};
