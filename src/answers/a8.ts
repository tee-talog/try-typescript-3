/*
オブジェクト型から、最低一つは必須のオブジェクト型を生成する型を定義してください。
*/
{
  type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
    Pick<T, Exclude<keyof T, K>>
  type Spread<T, K extends keyof T> = K extends keyof T
    ? PartiallyPartial<T, Exclude<keyof T, K>>
    : never
  type AtLeastOne<T> = Spread<T, keyof T>

  type PrimaryValue = {
    id: string
    name: string
    pos: { x: number; y: number }
  }

  type PrimaryValueAtLeastOne = AtLeastOne<PrimaryValue>
  const a: PrimaryValueAtLeastOne = { id: 'id1' }
  const b: PrimaryValueAtLeastOne = { name: 'hoge' }
  const c: PrimaryValueAtLeastOne = { pos: { x: 100, y: 200 } }
  const d: PrimaryValueAtLeastOne = { id: 'id2', pos: { x: 100, y: 200 } }
  // const x: PrimaryValueAtLeastOne = {} // コンパイルエラー
  // const x: PrimaryValueAtLeastOne = { test: 'test' } // コンパイルエラー
}
