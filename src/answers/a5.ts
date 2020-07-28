/*
一つ目の型引数が引数の型を表していて、それに `undefined` を指定できる場合に引数が省略できる関数の型を定義してください。
*/
{
  type TypedFunction<A, R> = undefined extends A
    ? (arg?: A) => R
    : (arg: A) => R

  const func1: TypedFunction<string, number> = (arg: string) => 1
  const func2: TypedFunction<number, boolean> = (arg: number) => true
  const func3: TypedFunction<undefined, boolean> = () => true // 引数が不要
  const func4: TypedFunction<number | undefined, void> = (arg?: number) => {} // 引数を書いても書かなくてもいい
}
