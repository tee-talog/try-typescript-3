/*
組み込み型 `Partial` と同じ型 `MyPartial` を定義してください。
受け取った型のキーをすべて省略可能にする型です。
*/
{
  type MyPartial<T> = { [K in keyof T]?: T[K] }

  type Xyz = {
    xx: string
    yy: number
  }

  type P = MyPartial<Xyz> // => { xx?: string; yy?: number }
}
