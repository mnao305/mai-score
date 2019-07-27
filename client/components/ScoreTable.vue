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
      :rows-per-page-items="[
        25,
        50,
        100,
        { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
      ]"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.genre }}</td>
        <td>{{ props.item.difficultyLevel }}</td>
        <td>
          {{
            Math.round(props.item.level) === props.item.level
              ? props.item.level
              : `${props.item.level - 0.5}+`
          }}
        </td>
        <td>
          {{ props.item.type === 'deluxe' ? 'でらっくす' : 'スタンダード' }}
        </td>
        <td>
          {{
            props.item.achievement != null ? `${props.item.achievement}%` : '-'
          }}
        </td>
        <td>{{ props.item.rank || '-' }}</td>
        <td>
          {{ props.item.dxScore || '-' }}
        </td>
        <td>{{ props.item.comboRank || '-' }}</td>
        <td>{{ props.item.sync || '-' }}</td>
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
}
</script>

<style lang="scss" scoped>
.scoreSearch {
  max-width: 400px;
  margin: 0 0 15px auto;
}
</style>
