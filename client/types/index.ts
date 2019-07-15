export interface GotScoreData {
  achievement: number | null
  difficultyLevel: string
  dxScore: number | null
  genre: string
  level: number
  title: string
  type: string
  rank: string | null
  comboRank: string | null
  sync: string | null
}

export interface ScoreData extends GotScoreData {
  id: string
}
