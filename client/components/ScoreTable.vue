<template>
  <div class="scoreData">
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
          {{ item.type === 'deluxe' ? 'DX' : 'Std' }}
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
    { text: 'ジャンル', value: 'genre', width: 190 },
    { text: '難易度', value: 'difficultyLevel', width: 105 },
    { text: 'レベル', value: 'level', width: 105 },
    { text: '譜面', value: 'type', width: 95 },
    { text: '達成率', value: 'achievement', width: 135 },
    { text: 'ランク', value: 'rank', width: 105 },
    { text: 'DXスコア', value: 'dxScore', width: 120 },
    { text: 'コンボ', value: 'comboRank', width: 105 },
    { text: 'SYNC', value: 'sync', width: 100 }
  ]

  search = ''

  mounted() {
    this.tableLoadFlg = false
  }
}
</script>

<style lang="scss">
.scoreData {
  .scoreSearch {
    max-width: 400px;
    margin: 0 0 15px auto;
  }

  table > tbody > tr:nth-child(odd) {
    background-color: #e0f7fa !important;
  }
  table > tbody > tr:nth-child(odd):hover {
    background-color: #daebed !important;
  }
}
</style>
