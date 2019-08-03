<template>
  <div>
    <p v-if="scoreData.length <= 0">
      登録されたスコアデータがありません。
      <a @click="$router.push('/about')">
        Aboutページ
      </a>
      を参考にデータ登録してください。
    </p>
    <score-table :score-data="scoreData" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '~/plugins/firestore'
import { ScoreData, GotScoreData } from '~/types'
@Component({
  head: {
    title: 'マイスコア'
  },
  components: {
    ScoreTable: () => import('~/components/ScoreTable.vue')
  },
  async asyncData({ store, redirect }) {
    const scoreData: ScoreData[] = []
    const difficultyLevel = [
      'Basic',
      'Advanced',
      'Expert',
      'Master',
      'ReMaster'
    ]

    if (!(store.state.user && store.state.user.uid)) {
      return { scoreData }
    }
    for (let i = 0; i < difficultyLevel.length; i++) {
      const doc = await db
        .collection('users')
        .doc(store.state.user.uid)
        .collection('scores')
        .doc(difficultyLevel[i])
        .get()

      if (doc && doc.exists) {
        const data = (await doc.data()) as GotScoreData[]
        scoreData.push(
          ...Object.entries(data).map(([id, data]) => ({
            id,
            ...data,
            achievement: data.achievements
              ? data.achievements[data.achievements.length - 1].achievement
              : null,
            dxScore: data.dxScores
              ? data.dxScores[data.dxScores.length - 1].dxScore
              : null
          }))
        )
        if (scoreData.length > 0) {
          const userDataDoc = await db
            .collection('users')
            .doc(store.state.user.uid)
            .get()

          if (userDataDoc && userDataDoc.exists) {
            const userData = await userDataDoc.data()

            if (userData && userData.displayName) {
              redirect(`/user/${userData.displayName}`)
              return
            }
          }
        }
      }
    }

    return {
      scoreData
    }
  }
})
export default class MyScore extends Vue {
  scoreData: ScoreData[] = []
}
</script>
