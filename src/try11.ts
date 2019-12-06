{
  const value: any = 'success'
  const answer: 'success' | 'fail' = value

  switch (answer) {
    case 'success':
      console.log('ok')
      break
    case 'fail':
      console.log('ng')
      break
    default:
      console.log('never')
      const test: never = answer
  }
}
