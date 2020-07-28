/*
オブジェクト型の一部のプロパティを省略可能にする型を定義してください。
*/
{
  type PartiallyPartial<T, K> = any // これ！

  type AjaxOption = {
    method: 'get' | 'post'
    url: string
    data: any
    headers: any[]
  }

  type Pp = PartiallyPartial<AjaxOption, 'headers' | 'data'> // => { method: 'get' | 'post'; url: string; data?: any headers?: any[] }
}
