export interface GotScoreData {
  achievements: { achievement: number; date: number }[] | null
  achievement: number | null
  difficultyLevel: string
  dxScores: { dxScore: number; date: number }[] | null
  dxScore: number | null
  genre: string
  level: number
  title: string
  type: string
  rank: string | null
  comboRank: string | null
  sync: string | null
  maxCombo?: number
  notes?: {
    break: number
    hold: number
    slide: number
    tap: number
    touch: number
  }
  songID?: string
  maxDxScore?: number
  minusTheoreticalValue?: number
}

export interface ScoreData extends GotScoreData {
  id: string
}

export interface ChartData {
  difficultyLevel: 'Basic' | 'Advanced' | 'Expert' | 'Master' | 'ReMaster'
  id: string
  maxCombo: number
  musicID: string
  notes: {
    break: number
    hold: number
    slide: number
    tap: number
    touch: number
  }
  title: string
  type: 'deluxe' | 'standard'
}

export interface MusicData {
  artist: string
  genre:
    | 'niconico＆ボーカロイド'
    | '東方Project'
    | 'バラエティ'
    | 'オリジナル'
    | 'POPS＆アニメ'
  songID: string
  title: string
  type: 'deluxe' | 'standard'
  version:
    | 'maimai'
    | 'maimai_PLUS'
    | 'GreeN'
    | 'GreeN_PLUS'
    | 'ORANGE'
    | 'ORANGE_PLUS'
    | 'PiNK'
    | 'PiNK_PLUS'
    | 'MURASAKi'
    | 'MURASAKi_PLUS'
    | 'MiLK'
    | 'MiLK_PLUS'
    | 'FiNALE'
    | 'maimaiでらっくす'
}
