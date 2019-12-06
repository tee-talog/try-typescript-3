{
  class ReadOnlyProperty {
    readonly zero = 0
    one = 1
    // error() { this.zero = 2 } // Error
  }

  const instance = new ReadOnlyProperty()
  console.log(instance.zero)
  // instance.zero = 100 // Error
}
