{
  type Optional<T> = { [K in keyof T]?: T[K] }
  type MusicCreator = {
    readonly numberOfPeople: number
    lyrics: string
    composer: string
    recordingEngineer: string
    masteringEngineer: string
  }

  const creators: Optional<MusicCreator> = {
    numberOfPeople: 1,
    lyrics: 'John'
  }

  // -----

  type Mutable<T> = { -readonly [K in keyof T]: T[K] }
  const readonlyCreators: Mutable<MusicCreator> = {
    numberOfPeople: 1,
    lyrics: 'John',
    composer: 'Smith',
    masteringEngineer: 'Catherine',
    recordingEngineer: 'Jessica'
  }
  readonlyCreators.numberOfPeople = 4
}
