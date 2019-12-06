{
  type CliOptions = {
    verbose?: boolean
    row?: number
    directory?: string
  }

  const options1: CliOptions = { verbose: true }
  // const options2: CliOptions = { row: 10, help: true } // Error
  const options3: CliOptions = {} // 例外として {} は代入できる
}
