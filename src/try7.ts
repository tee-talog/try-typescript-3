{
  type ArgumentsType<T> = T extends (...args: infer U) => any ? U : T
  type A = (arg: string) => void
  type B = () => void
  type C = (arg1: string, arg2: number) => number
  type D = boolean

  type At1 = ArgumentsType<A> // => [string]
  type At2 = ArgumentsType<B> // => []
  type At3 = ArgumentsType<C> // => [string, number]
  type At4 = ArgumentsType<D> // => boolean
}
