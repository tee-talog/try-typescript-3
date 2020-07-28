/*
ある型からメソッド名だけを抽出した型を定義してください。
*/
{
  type FunctionProperty<T> = {
    [K in keyof T]: T[K] extends Function ? K : never
  }[keyof T]

  type Animal = {
    name: string
    age: number
    run(): number
    walk(): number
    talk(): string
  }

  type Fp = FunctionProperty<Animal> // => 'run' | 'walk' | 'talk'
}
