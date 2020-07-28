{
  type MusicCreator = {
    numberOfPeople: number
    lyrics: string
    composer: string
    recordingEngineer: string
    masteringEngineer: string
  }

  type MusicCreatorType = keyof MusicCreator
  // => "numberOfPeople" | "lyrics" | "composer" | "recordingEngineer" | "masteringEngineer"
}
