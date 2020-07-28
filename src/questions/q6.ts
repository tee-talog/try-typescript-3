/*
ある型からメソッド名だけを抽出した型を定義してください。
*/
{
  type FunctionProperty<T> = any // これ！

  type Animal = {
    name: string
    age: number
    run(): number
    walk(): number
    talk(): string
  }

  type Fp = FunctionProperty<Animal> // => 'run' | 'walk' | 'talk'
}
