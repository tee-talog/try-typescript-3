/*
parsonValue に適切な型を付けてください。
Parson 型の値とそのオブジェクトのキーを受け取って、対応する値を返す関数です。
*/
{
  // ここ！
  const parsonValue = (parson: any, key: any): any => parson[key]

  type Parson = {
    firstName: string
    lastName: string
  }
  const rezero: Parson = {
    firstName: 'Subaru',
    lastName: 'Natsuki'
  }

  parsonValue(rezero, 'firstName') // => 'Subaru'
  parsonValue(rezero, 'lastName') // => 'Natsuki'
}
