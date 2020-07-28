{
  type Original<T> = { [K in keyof T]: T[K] }
  // => Original = T

  type Nullable<T> = { [K in keyof T]: T[K] | null }
  type MusicCreator = {
    numberOfPeople: number
    lyrics: string
    composer: string
    recordingEngineer: string
    masteringEngineer: string
  }

  const creators: Nullable<MusicCreator> = {
    numberOfPeople: 1,
    lyrics: 'John',
    composer: null,
    recordingEngineer: null,
    masteringEngineer: null
  }
}
