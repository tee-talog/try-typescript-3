{
  type Human = {
    firstName: string
    lastName: string
  }

  const isHuman = (arg: any): arg is Human =>
    arg != null &&
    typeof arg.firstName === 'string' &&
    typeof arg.lastName === 'string'

  const value: any = {
    firstName: 'Tarou',
    lastName: 'Tanaka'
  }
  const tanaka: Human | string = value

  console.log(tanaka.firstName) // => Error

  if (isHuman(tanaka)) {
    // tanaka は Human 型として扱える
    console.log(tanaka.firstName)
  }
}
