{
  type Foo = 'foo'
  type Bar = 'bar'
  type Baz = 'baz'
  type FooBar<T> = T extends Foo ? Foo : Bar

  type F1 = FooBar<Foo> // => Foo
  type F2 = FooBar<Bar> // => Bar
  type F3 = FooBar<Baz> // => Bar
}
