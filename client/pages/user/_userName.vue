<template>
  <div>
    <p>
      {{ userName }}さんのスコア
      <a
        v-if="publicMode"
        :href="twitterUrl()"
        class="twitterLink"
        target="_blank"
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
import { ScoreData, GotScoreData, MusicData, ChartData } from '~/types'
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

  chartData: ChartData[] = []

  musicData: MusicData[] = []

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
    const tmpChartData: ChartData[] = []

    if (
      this.publicMode ||
      (this.$store.state.user &&
        this.$store.state.user.uid &&
        this.$store.state.user.uid === docs.id)
    ) {
      for (let i = 0; i < difficultyLevel.length; i++) {
        const [tmp, tmpChart] = await Promise.all([
          docs.ref
            .collection('scores')
            .doc(difficultyLevel[i])
            .get(),
          db
            .collection('chartData')
            .doc(difficultyLevel[i])
            .get()
        ])
        const data = tmp.data() as GotScoreData[]
        const chartData = tmpChart.data()
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
        if (chartData) {
          tmpChartData.push(
            ...Object.entries(chartData).map(([id, data]) => ({
              id,
              ...data
            }))
          )
        } else {
          break
        }
      }
    }
    this.chartData = tmpChartData
    this.scoreData = tmpScoreData

    if (this.scoreData.length <= 0) {
      alert(
        'そのユーザ名は存在しない、もしくはスコアデータが登録・公開されていません'
      )
      this.$router.push('/')
    }

    const tmp = await db
      .collection('musicData')
      .doc('Master')
      .get()
    this.musicData = tmp.data()!.data

    for (let i = 0; i < this.chartData.length; i++) {
      const tmpChart = this.chartData[i]
      const aryIndex: number[] = []
      const tmp = this.scoreData.filter((el, index) => {
        if (
          el.title === tmpChart.title &&
          el.difficultyLevel === tmpChart.difficultyLevel &&
          el.type === tmpChart.type
        ) {
          aryIndex.push(index)
          return true
        }
      })

      if (aryIndex.length === 1 && tmp.length === 1) {
        tmp[0].maxCombo = tmpChart.maxCombo
        tmp[0].maxDxScore = tmpChart.maxCombo * 3
        if (tmp[0].dxScore != null) {
          tmp[0].minusTheoreticalValue = tmp[0].dxScore - tmpChart.maxCombo * 3
        }
        tmp[0].notes = tmpChart.notes
        tmp[0].songID = tmpChart.musicID
        this.scoreData.splice(aryIndex[0], 1, tmp[0])
      } else if (aryIndex.length > 1 && tmp.length > 1) {
        const musicData = this.musicData.filter((el) => {
          return el.songID === tmpChart.musicID
        })
        const index = tmp.findIndex((v) => v.version === musicData[0].version)

        tmp[index].maxCombo = tmpChart.maxCombo
        tmp[index].maxDxScore = tmpChart.maxCombo * 3
        if (tmp[index].dxScore != null) {
          tmp[index].minusTheoreticalValue =
            tmp[index].dxScore! - tmpChart.maxCombo * 3
        }
        tmp[index].notes = tmpChart.notes
        tmp[index].songID = tmpChart.musicID
        this.scoreData.splice(aryIndex[index], 1, tmp[index])
      }
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
