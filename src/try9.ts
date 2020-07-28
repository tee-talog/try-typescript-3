{
  const func = (a: string): string => a
  type F1 = ReturnType<typeof func> // => string
  type F2 = ReturnType<() => string | number> // => string | number
  type F3 = ReturnType<<T>() => T> // => unknown
}
