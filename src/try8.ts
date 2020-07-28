{
  type FuncOption = {
    required: boolean
    env: 'development' | 'production'
  }

  // すべてのプロパティを設定する必要がある
  const initialOption: FuncOption = {
    required: false,
    env: 'development'
  }

  // option にはすべてのプロパティを渡さなくていい
  const func = (option: Partial<FuncOption>) => {
    const funcOption: FuncOption = { ...option, ...initialOption }
    //
  }

  func({ required: true })
}
