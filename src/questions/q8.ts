/*
オブジェクト型から、最低一つは必須のオブジェクト型を生成する型を定義してください。
*/
{
  type AtLeastOne<T> = any // これ！

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
