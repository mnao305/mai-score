<template>
  <div>
    <p>
      {{ userName }}さんのスコア
      <a
        v-if="publicMode"
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
  async asyncData({ params, store }) {
    const userName = params.userName
    const scoreData: ScoreData[] = []
    const difficultyLevel = [
      'Basic',
      'Advanced',
      'Expert',
      'Master',
      'ReMaster'
    ]
    let publicMode = false
    const snapShot = await db
      .collection('users')
      .where('displayName', '==', userName)
      .get()
    const docs = await snapShot.docs[0]

    if (docs && docs.exists) {
      const userData = (await docs.data()) as {
        displayName: string
        public: boolean
      }

      publicMode = userData.public

      if (
        userData.public ||
        (store.state.user &&
          store.state.user.uid &&
          store.state.user.uid === docs.id)
      ) {
        for (let i = 0; i < difficultyLevel.length; i++) {
          const tmp = await docs.ref
            .collection('scores')
            .doc(difficultyLevel[i])
            .get()
          const data = tmp.data() as GotScoreData[]
          if (data) {
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
          } else {
            break
          }
        }
      }
    }

    return {
      userName,
      scoreData,
      publicMode
    }
  }
})
export default class UserName extends Vue {
  scoreData: ScoreData[] = []

  userName: string = ''

  publicMode = false

  beforeMount() {
    if (this.scoreData.length <= 0) {
      alert(
        'そのユーザ名は存在しない、もしくはスコアデータが登録・公開されていません'
      )
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

<style lang="scss">
.twitterLink {
  border: 1px solid #00b0ed;
  border-radius: 10px;
  padding: 2px 4px;
  right: 10px;
  position: absolute;
  text-decoration: none;
  i {
    padding: 4px;
  }
}
</style>
