<template>
  <div>
    <p>{{ userName }}さんのスコア</p>
    <score-table :score-data="scoreData" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '~/plugins/firestore'
import { ScoreData, GotScoreData } from '~/types'
@Component({
  head() {
    return {
      title: `${(this as any).userName}のスコアページ`
    }
  },
  components: {
    ScoreTable: () => import('~/components/ScoreTable.vue')
  },
  async asyncData({ params }) {
    const userName = params.userName
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
        .where('displayName', '==', userName)
        .where('public', '==', true)
        .get()

      const docs = await snapShot.docs[0]
      if (docs && docs.exists) {
        const tmp = await docs.ref
          .collection('scores')
          .doc(difficultyLevel[i])
          .get()
        const data = tmp.data() as GotScoreData[]
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
      }
    }

    return {
      userName,
      scoreData
    }
  }
})
export default class UserName extends Vue {
  scoreData: ScoreData[] = []

  created() {
    if (this.scoreData.length <= 0) {
      alert('そのユーザ名は存在しません')
      this.$router.push('/')
    }
  }
}
</script>
