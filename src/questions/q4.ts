/*
第二引数が partial か required かによって、第一引数のオブジェクトのプロパティを省略可能にしたり省略不可にしたりする型を定義してください。
*/
{
  type PartialOrRequired<T, R> = any // これ！

  type Minna = {
    ore: string
    omae: string
    marukajiri?: string
  }

  type Pr1 = PartialOrRequired<Minna, 'partial'> // => { ore?: string; omae?: string; marukajiri?: string }
  type Pr2 = PartialOrRequired<Minna, 'required'> // => { ore: string; omae: string; marukajiri: string }
}
