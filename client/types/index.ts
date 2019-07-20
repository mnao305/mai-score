export interface GotScoreData {
  achievements: { achievement: number; date: number }[] | null
  difficultyLevel: string
  dxScores: { dxScore: number; date: number }[] | null
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
