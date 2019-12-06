{
  type Foo = { foo: string }
  type Bar = { bar: number }
  type FooBar = Foo & Bar // => { foo: string, bar: number }

  const fb: FooBar = { foo: 'baz', bar: 10 }
}
