{
  class A {
    show() {
      console.log('A class!')
    }
  }
  class B {}

  const a = new A()
  if (a instanceof A) {
    a.show() // => A class!
  }
}
