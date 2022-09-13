/* eslint-disable unicorn/no-array-reduce */

/*
    INPUT:
    ["a", "b"]
    [1, 2]
    [true, false]

    OUTPUT:
    ["a", 1, true, "b", 2, false]
*/
export const braidArrays = <T>(...arrays: T[][]) => {
  const braided: T[] = []
  for (let i = 0; i < Math.max(...arrays.map((a) => a.length)); i += 1) {
    arrays.forEach((array) => {
      if (array[i] !== undefined) braided.push(array[i])
    })
  }
  return braided
}
