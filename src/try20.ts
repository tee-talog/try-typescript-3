{
  type State = 'state'
  type SET_ACTION = { type: 'SET_ACTION'; payload: string }
  type REMOVE_ACTION = { type: 'REMOVE_ACTION'; payload: number }
  type Action = SET_ACTION | REMOVE_ACTION

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'SET_ACTION':
        return action.payload.toUpperCase() // => string
      case 'REMOVE_ACTION':
        return action.payload.toFixed() // => number
      default:
        const test: never = action // => never
        throw new Error()
    }
  }

  console.log(
    reducer('state', {
      type: 'SET_ACTION',
      payload: 'value'
    })
  )
}
