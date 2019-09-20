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
    <score-table :score-data="scoreData" :table-load-flg="tableLoadFlg" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as Vuex from 'vuex'
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
    }

    return {
      userName,
      publicMode
    }
  }
})
export default class UserName extends Vue {
  $store!: Vuex.ExStore

  scoreData: ScoreData[] = []

  userName: string = ''

  publicMode = false

  tableLoadFlg = true

  async created() {
    const snapShot = await db
      .collection('users')
      .where('displayName', '==', this.userName)
      .get()
    const docs = await snapShot.docs[0]
    const difficultyLevel = [
      'Basic',
      'Advanced',
      'Expert',
      'Master',
      'ReMaster'
    ]
    const tmpScoreData: ScoreData[] = []

    if (
      this.publicMode ||
      (this.$store.state.user &&
        this.$store.state.user.uid &&
        this.$store.state.user.uid === docs.id)
    ) {
      for (let i = 0; i < difficultyLevel.length; i++) {
        const tmp = await docs.ref
          .collection('scores')
          .doc(difficultyLevel[i])
          .get()
        const data = tmp.data() as GotScoreData[]
        if (data) {
          tmpScoreData.push(
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
    this.scoreData = tmpScoreData
    if (this.scoreData.length <= 0) {
      alert(
        'そのユーザ名は存在しない、もしくはスコアデータが登録・公開されていません'
      )
      this.$router.push('/')
    }
    this.tableLoadFlg = false
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
