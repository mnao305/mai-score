<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="search"
      class="scoreSearch"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="scoreData"
      :search="search"
      multi-sort
      :score-items="scoreData"
      :items-per-page="50"
      :footer-props="{
        itemsPerPageOptions: [50, 100, 250, -1]
      }"
      :loading="tableLoadFlg"
      :sort-desc="[true, false]"
    >
      <template v-slot:item.level="{ item }">
        <td>
          {{
            Math.round(item.level) === item.level
              ? item.level
              : `${item.level - 0.5}+`
          }}
        </td>
      </template>
      <template v-slot:item.type="{ item }">
        <td>
          {{ item.type === 'deluxe' ? 'でらっくす' : 'スタンダード' }}
        </td>
      </template>
      <template v-slot:item.achievement="{ item }">
        <td>
          {{ item.achievement != null ? `${item.achievement}%` : '-' }}
        </td>
      </template>
      <template v-slot:item.rank="{ item }">
        <td>{{ item.rank || '-' }}</td>
      </template>
      <template v-slot:item.dxScore="{ item }">
        <td>
          {{ item.dxScore || '-' }}
        </td>
      </template>
      <template v-slot:item.comboRank="{ item }">
        <td>{{ item.comboRank || '-' }}</td>
      </template>
      <template v-slot:item.sync="{ item }">
        <td>{{ item.sync || '-' }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ScoreData } from '~/types'
@Component
export default class ScoreTable extends Vue {
  @Prop() scoreData?: ScoreData[]

  tableLoadFlg = true

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

  search = ''

  mounted() {
    this.tableLoadFlg = false
  }
}
</script>

<style lang="scss" scoped>
.scoreSearch {
  max-width: 400px;
  margin: 0 0 15px auto;
}
</style>
