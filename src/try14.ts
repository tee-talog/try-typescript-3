{
  const actionCreator = (data: string) => {
    return {
      type: 'SET_DATA',
      payload: { value: [data, 'payload'] }
    } as const
  }

  console.log(actionCreator('test'))
  // => { readonly type: 'SET_DATA', readonly payload: { readonly value: [string, 'payload'] } }
}
