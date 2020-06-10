<template>
  <div>
    <p v-if="scoreData.length <= 0">
      登録されたスコアデータがありません。
      <a @click="$router.push('/about')">
        Aboutページ
      </a>
      を参考にデータ登録してください。
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
  head: {
    title: 'マイスコア'
  },
  components: {
    ScoreTable: () => import('~/components/ScoreTable.vue')
  },
  async asyncData({ store, redirect }) {
    const col = await db
      .collection('users')
      .doc(store.state.user.uid)
      .collection('scores')
      .get()
    const empty = col.empty

    const userDataDoc = await db
      .collection('users')
      .doc(store.state.user.uid)
      .get()

    if (!empty && userDataDoc && userDataDoc.exists) {
      const userData = await userDataDoc.data()
      if (userData && userData.displayName) {
        redirect(`/user/${userData.displayName}`)
      }
    }
  }
})
export default class MyScore extends Vue {
  $store!: Vuex.ExStore

  scoreData: ScoreData[] = []

  chartData: ChartData[] = []

  musicData: MusicData[] = []

  tableLoadFlg = true

  async mounted() {
    const difficultyLevel = [
      'Basic',
      'Advanced',
      'Expert',
      'Master',
      'ReMaster'
    ]
    if (!(this.$store.state.user && this.$store.state.user.uid)) {
      return
    }
    for (let i = 0; i < difficultyLevel.length; i++) {
      const [doc, tmpChart] = await Promise.all([
        db
          .collection('users')
          .doc(this.$store.state.user.uid)
          .collection('scores')
          .doc(difficultyLevel[i])
          .get(),
        db
          .collection('chartData')
          .doc(difficultyLevel[i])
          .get()
      ])
      const chartData = tmpChart.data()

      if (doc && doc.exists) {
        const data = (await doc.data()) as GotScoreData[]
        this.scoreData.push(
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
      if (chartData) {
        this.chartData.push(
          ...Object.entries(chartData).map(([id, data]) => ({
            id,
            ...data
          }))
        )
      } else {
        break
      }
    }

    const tmp = await db
      .collection('musicData')
      .doc('Master')
      .get()
    this.musicData = tmp.data()!.data

    for (let i = 0; i < this.chartData.length; i++) {
      const tmpChart = this.chartData[i]
      let aryIndex: number[] = []
      const tmp = this.scoreData.find((el, index) => {
        if (
          el.songID === tmpChart.musicID &&
          el.difficultyLevel === tmpChart.difficultyLevel &&
          el.type === tmpChart.type
        ) {
          aryIndex.push(index)
          return true
        }
      })
      if (tmp) {
        // songIDで一致できた場合
        tmp.maxCombo = tmpChart.maxCombo
        tmp.maxDxScore = tmpChart.maxCombo * 3
        if (tmp.dxScore != null) {
          tmp.minusTheoreticalValue = tmp.dxScore - tmpChart.maxCombo * 3
        }
        tmp.notes = tmpChart.notes
        tmp.songID = tmpChart.musicID
        this.scoreData.splice(aryIndex[0], 1, tmp)
      } else {
        // songIDで一致できなかった場合
        aryIndex = []
        const filteredScoreData = this.scoreData.filter((el, index) => {
          if (
            el.title === tmpChart.title &&
            el.difficultyLevel === tmpChart.difficultyLevel &&
            el.type === tmpChart.type
          ) {
            aryIndex.push(index)
            return true
          }
        })
        if (filteredScoreData.length === 1) {
          // タイトルで一致できた場合
          const scoreData = filteredScoreData[0]
          scoreData.maxCombo = tmpChart.maxCombo
          scoreData.maxDxScore = tmpChart.maxCombo * 3
          if (scoreData.dxScore != null) {
            scoreData.minusTheoreticalValue =
              scoreData.dxScore - tmpChart.maxCombo * 3
          }
          scoreData.notes = tmpChart.notes
          scoreData.songID = tmpChart.musicID

          this.scoreData.splice(aryIndex[0], 1, scoreData)
        } else {
          // 1つも一致しなかったか、タイトルのみで一致できなかった場合
          // まぁスキップかな
        }
      }
    }

    this.tableLoadFlg = false
  }
}
</script>
