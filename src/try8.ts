{
  const name: unknown = 'value'
  // console.log(name.toUpperCase()) // => Error
  if (typeof name === 'string') {
    console.log(name.toUpperCase())
  }
}
