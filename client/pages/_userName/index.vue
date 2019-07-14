<template>
  <div>
    <!-- <p>{{ userName }}</p> -->
    <v-data-table :headers="headers" :items="scoreData" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.genre }}</td>
        <td class="text-xs-right">{{ props.item.difficultyLevel }}</td>
        <td class="text-xs-right">
          {{
            Math.round(props.item.level) === props.item.level
              ? props.item.level
              : `${props.item.level - 0.5}+`
          }}
        </td>
        <td class="text-xs-right">
          {{ props.item.type === 'deluxe' ? 'でらっくす' : 'スタンダード' }}
        </td>
        <td class="text-xs-right">
          {{
            props.item.achievement != null ? `${props.item.achievement}%` : '-'
          }}
        </td>
        <td class="text-xs-right">
          {{ props.item.dxScore != null ? props.item.dxScore : '-' }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '~/plugins/firestore'
import { ScoreData, GotScoreData } from '~/types'
@Component({
  async asyncData({ params }) {
    const scoreData: ScoreData[] = []
    const difficultyLevel = [
      'Basic',
      'Advanced',
      'Expert',
      'Master',
      'ReMaster'
    ]
    for (let i = 0; i < difficultyLevel.length; i++) {
      const snapShot = await db
        .collection('users')
        .doc('l6aWFHMbrNhDnvLsHsrH')
        .collection('scores')
        .doc(difficultyLevel[i])
        .get()
        .catch((e) => {
          console.error(e)
        })
      if (snapShot && snapShot.exists) {
        const tmp = snapShot.data() as GotScoreData[]
        scoreData.push(
          ...Object.entries(tmp).map(([id, data]) => ({
            id,
            ...data
          }))
        )
      }
    }
    const userName = params.userName
    return {
      userName,
      scoreData
    }
  }
})
export default class UserName extends Vue {
  headers = [
    {
      text: 'タイトル',
      value: 'title'
    },
    { text: 'ジャンル', value: 'genre' },
    { text: '難易度', value: 'difficultyLevel' },
    { text: 'レベル', value: 'level' },
    { text: '譜面タイプ', value: 'type' },
    { text: '達成率', value: 'achievement' },
    { text: 'でらっくスコア', value: 'dxScore' }
  ]
}
</script>
