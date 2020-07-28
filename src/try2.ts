{
  type MusicCreator = {
    numberOfPeople: number
    lyrics: string
    composer: string
    recordingEngineer: string
    masteringEngineer: string
  }

  type LyricsType = MusicCreator['lyrics']
  // => string
}
