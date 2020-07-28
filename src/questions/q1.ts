/*
`ObjKeys` は `obj` にあるキーの Union Types になっています。
手動でキーを書くのではなく、 `obj` の定義から自動的に取ってくるようにしてください。
*/
{
  const obj = {
    foo: 'foooooooo',
    bar: 'baaaaaaar',
    baz: 'baz?'
  }

  type ObjKeys = 'foo' | 'bar' | 'baz'
}
