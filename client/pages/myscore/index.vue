<template>
  <div>
    <!-- <p>{{ userName }}</p> -->
    <v-data-table :headers="headers" :items="scoreData" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.genre }}</td>
        <td>{{ props.item.difficultyLevel }}</td>
        <td>
          {{
            Math.round(props.item.level) === props.item.level
              ? props.item.level
              : `${props.item.level - 0.5}+`
          }}
        </td>
        <td>
          {{ props.item.type === 'deluxe' ? 'でらっくす' : 'スタンダード' }}
        </td>
        <td>
          {{
            props.item.achievement != null
              ? `${props.item.achievement[props.item.achievement.length - 1].score}%`
              : '-'
          }}
        </td>
        <td>{{ props.item.rank || '-' }}</td>
        <td>
          {{
            props.item.dxScore != null
              ? props.item.dxScore[props.item.dxScore.length - 1].score
              : '-'
          }}
        </td>
        <td>{{ props.item.comboRank || '-' }}</td>
        <td>{{ props.item.sync || '-' }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '~/plugins/firestore'
import { ScoreData, GotScoreData } from '~/types'
import auth from '~/plugins/auth'
@Component({})
export default class MyScore extends Vue {
  headers = [
    { text: 'タイトル', value: 'title' },
    { text: 'ジャンル', value: 'genre' },
    { text: '難易度', value: 'difficultyLevel' },
    { text: 'レベル', value: 'level' },
    { text: '譜面タイプ', value: 'type' },
    { text: '達成率', value: 'achievement' },
    { text: 'ランク', value: 'rank' },
    { text: 'でらっくスコア', value: 'dxScore' },
    { text: 'コンボ', value: 'comboRank' },
    { text: 'SYNC', value: 'sync' }
  ]

  scoreData: ScoreData[] = []

  async created() {
    const user = await auth.auth()

    if (user) {
      const scoreData: ScoreData[] = []
      const difficultyLevel = [
        'Basic',
        'Advanced',
        'Expert',
        'Master',
        'ReMaster'
      ]
      for (let i = 0; i < difficultyLevel.length; i++) {
        const doc = await db
          .collection('users')
          .doc(user.uid)
          .collection('scores')
          .doc(difficultyLevel[i])
          .get()

        if (doc && doc.exists) {
          const data = doc.data() as GotScoreData[]
          scoreData.push(
            ...Object.entries(data).map(([id, data]) => ({
              id,
              ...data
            }))
          )
        }
        this.scoreData = scoreData
      }
    }
  }
}
</script>
