{
  type UndefinedFunc<A, B> = (arg: A) => A extends B ? A : B

  const uf1: UndefinedFunc<'a', string> = (arg) => 'a'
  const uf2: UndefinedFunc<'b', number> = () => 1
  const uf3: UndefinedFunc<true, boolean> = () => true
}
