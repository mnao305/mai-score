<template>
  <div>
    <p>
      {{ userName }}さんのスコア
      <a
        class="twitterLink"
        target="_blank"
        :href="twitterUrl()"
        title="Twitterで共有"
      >
        <i class="mdi mdi-twitter" />Tweet
      </a>
    </p>
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

  userName: string = ''

  beforeMount() {
    if (this.scoreData.length <= 0) {
      alert('そのユーザ名は存在しません')
      this.$router.push('/')
    }
  }

  twitterUrl() {
    return encodeURI(
      `https://twitter.com/intent/tweet?text=${this.userName}のスコアページ - 舞スコア&hashtags=舞スコア&url=https://mai-score.com${this.$route.path}`
    )
  }
}
</script>

<style>
.twitterLink {
  border: 1px solid #00b0ed;
  border-radius: 10px;
  padding: 2px 4px;
  right: 10px;
  position: absolute;
  text-decoration: none;
}
</style>
