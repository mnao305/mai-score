export interface GotScoreData {
  achievement: number | null
  difficultyLevel: string
  dxScore: number | null
  genre: string
  level: number
  title: string
  type: string
}

export interface ScoreData extends GotScoreData {
  id: string
}
