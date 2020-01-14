<template>
  <div class="scoreData">
    <v-data-table
      :headers="shownHeaders"
      :items="scoreData"
      :search="search"
      :mobile-breakpoint="50"
      :score-items="scoreData"
      :items-per-page="50"
      :footer-props="{
        itemsPerPageOptions: [50, 100, 250, -1]
      }"
      :loading="tableLoadFlg"
      :sort-desc="[true, false]"
      :custom-filter="customFilterFunc"
      multi-sort
    >
      <template v-slot:top>
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div><v-icon>mdi-filter</v-icon>フィルター</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="optionTitle">難易度：</div>
              <v-layout class="difficultyLevelOption" row>
                <v-checkbox
                  v-for="item in difficultyLevelList"
                  :key="item"
                  v-model="filterOption.difficultyLevel"
                  :label="item"
                  :value="item"
                  class="checkbox"
                  hide-details
                  @change="onFilterOptionChanged"
                ></v-checkbox>
              </v-layout>
              <div class="optionTitle">バージョン：</div>
              <v-layout class="versionOption" row>
                <v-checkbox
                  v-for="item in versionList"
                  :key="item"
                  v-model="filterOption.version"
                  :label="item.replace('_', ' ')"
                  :value="item"
                  class="checkbox"
                  hide-details
                  @change="onFilterOptionChanged"
                ></v-checkbox>
              </v-layout>
              <div class="optionTitle">ジャンル：</div>
              <v-layout class="genreOption" row>
                <v-checkbox
                  v-for="item in genreList"
                  :key="item"
                  v-model="filterOption.genre"
                  :label="item"
                  :value="item"
                  class="checkbox"
                  hide-details
                  @change="onFilterOptionChanged"
                ></v-checkbox>
              </v-layout>
              <div class="optionTitle">レベル：</div>
              <v-layout class="levelOption" row>
                <v-checkbox
                  v-for="item in levelList"
                  :key="item"
                  v-model="filterOption.level"
                  :label="
                    `${Math.round(item) === item ? item : `${item - 0.5}+`}`
                  "
                  :value="item"
                  class="checkbox"
                  hide-details
                  @change="onFilterOptionChanged"
                ></v-checkbox>
              </v-layout>
              <div class="optionTitle">譜面タイプ：</div>
              <v-layout class="typeOption" row>
                <v-checkbox
                  v-for="item in typeList"
                  :key="item"
                  v-model="filterOption.type"
                  :label="item"
                  :value="item"
                  class="checkbox"
                  hide-details
                  @change="onFilterOptionChanged"
                ></v-checkbox>
              </v-layout>
              <div class="optionTitle">表示カラム：</div>
              <v-layout class="typeOption" row>
                <v-checkbox
                  v-for="item in showColumnList"
                  :key="item.value"
                  v-model="filterOption.showColumn"
                  :label="item.text"
                  :value="item.value"
                  class="checkbox"
                  hide-details
                  @change="onFilterOptionChanged"
                ></v-checkbox>
              </v-layout>
              <v-layout row class="optionTitle">
                <v-btn outlined color="indigo" @click="filterReset">
                  フィルターリセット
                </v-btn>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-text-field
          v-model="search"
          append-icon="search"
          class="scoreSearch"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </template>
      <template v-slot:item.title="{ item }">
        <a
          :href="
            `https://maimaidx.jp/maimai-mobile/record/musicDetail/?idx=${encodeURIComponent(
              item.musicID
            )}`
          "
          target="_blank"
        >
          {{ item.title }}
        </a>
      </template>
      <template v-slot:item.version="{ item }">
        {{ item.version.replace('_', ' ') }}
      </template>
      <template v-slot:item.level="{ item }">
        {{
          Math.round(item.level) === item.level
            ? item.level
            : `${item.level - 0.5}+`
        }}
      </template>
      <template v-slot:item.type="{ item }">
        {{ item.type === 'deluxe' ? 'DX' : 'Std' }}
      </template>
      <template v-slot:item.achievement="{ item }">
        {{ item.achievement != null ? `${item.achievement}%` : '-' }}
      </template>
      <template v-slot:item.rank="{ item }">
        {{ item.rank || '-' }}
      </template>
      <template v-slot:item.dxScore="{ item }">
        {{ item.dxScore || '-' }}
        <template v-if="showMaxDxScore">
          / {{ item.maxDxScore || '-' }}
        </template>
      </template>
      <template v-slot:item.minusTheoreticalValue="{ item }">
        {{ item.minusTheoreticalValue || '-' }}
      </template>
      <template v-slot:item.comboRank="{ item }">
        {{ item.comboRank || '-' }}
      </template>
      <template v-slot:item.sync="{ item }">
        {{ item.sync || '-' }}
      </template>
      <template v-slot:item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as Vuex from 'vuex'
import { ScoreData } from '~/types'
@Component({
  components: {
    Loading: () => import('~/components/Loading.vue')
  }
})
export default class ScoreTable extends Vue {
  @Prop() scoreData?: ScoreData[]

  $store!: Vuex.ExStore

  @Prop() readonly tableLoadFlg!: boolean

  difficultyLevelList = ['Basic', 'Advanced', 'Expert', 'Master', 'ReMaster']

  versionList = [
    'maimai',
    'maimai_PLUS',
    'GreeN',
    'GreeN_PLUS',
    'ORANGE',
    'ORANGE_PLUS',
    'PiNK',
    'PiNK_PLUS',
    'MURASAKi',
    'MURASAKi_PLUS',
    'MiLK',
    'MiLK_PLUS',
    'FiNALE',
    'maimaiでらっくす'
  ]

  genreList = [
    'niconico＆ボーカロイド',
    '東方Project',
    'バラエティ',
    'オリジナル',
    'POPS＆アニメ'
  ]

  levelList = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    10,
    10.5,
    11,
    11.5,
    12,
    12.5,
    13,
    13.5,
    14
  ]

  typeList = ['deluxe', 'standard']

  showColumnList = [
    { text: 'タイトル', value: 'title' },
    { text: 'ジャンル', value: 'genre' },
    { text: 'バージョン', value: 'version' },
    { text: '難易度', value: 'difficultyLevel' },
    { text: 'レベル', value: 'level' },
    { text: '譜面', value: 'type' },
    { text: '達成率', value: 'achievement' },
    { text: 'ランク', value: 'rank' },
    { text: 'DXスコア', value: 'dxScore' },
    { text: 'DXスコア理論値', value: 'maxDxScore' },
    { text: 'DXスコア理論値マイナス', value: 'minusTheoreticalValue' },
    { text: 'コンボ', value: 'comboRank' },
    { text: 'SYNC', value: 'sync' },
    { text: '最終更新', value: 'date' }
  ]

  filterOption = {
    difficultyLevel: ['Basic', 'Advanced', 'Expert', 'Master', 'ReMaster'],
    version: [
      'maimai',
      'maimai_PLUS',
      'GreeN',
      'GreeN_PLUS',
      'ORANGE',
      'ORANGE_PLUS',
      'PiNK',
      'PiNK_PLUS',
      'MURASAKi',
      'MURASAKi_PLUS',
      'MiLK',
      'MiLK_PLUS',
      'FiNALE',
      'maimaiでらっくす'
    ],
    genre: [
      'niconico＆ボーカロイド',
      '東方Project',
      'バラエティ',
      'オリジナル',
      'POPS＆アニメ'
    ],
    type: ['deluxe', 'standard'],
    level: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      7.5,
      8,
      8.5,
      9,
      9.5,
      10,
      10.5,
      11,
      11.5,
      12,
      12.5,
      13,
      13.5,
      14
    ],
    showColumn: [
      'title',
      'genre',
      'version',
      'difficultyLevel',
      'level',
      'type',
      'achievement',
      'rank',
      'dxScore',
      'maxDxScore',
      'minusTheoreticalValue',
      'comboRank',
      'sync',
      'date'
    ]
  }

  showMaxDxScore = true

  formatDate(dateNum: number) {
    const date = new Date(dateNum)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  onFilterOptionChanged() {
    this.$store.commit('user/setFilterOption', this.filterOption)
  }

  get shownHeaders() {
    this.showMaxDxScore = this.filterOption.showColumn.includes('maxDxScore')
    return this.headers.filter((h) =>
      this.filterOption.showColumn.includes(h.value)
    )
  }

  get headers() {
    return [
      { text: 'タイトル', value: 'title', divider: true },
      {
        text: 'ジャンル',
        value: 'genre',
        width: 190,
        filter: (value: string) => {
          return this.filterOption.genre.some((v) => v === value)
        },
        divider: true
      },
      {
        text: 'バージョン',
        value: 'version',
        width: 150,
        filter: (value: string) => {
          return this.filterOption.version.some((v) => v === value)
        },
        divider: true
      },
      {
        text: '難易度',
        value: 'difficultyLevel',
        width: 105,
        filter: (value: string) => {
          return this.filterOption.difficultyLevel.some((v) => v === value)
        },
        divider: true
      },
      {
        text: 'レベル',
        value: 'level',
        width: 105,
        filter: (value: number) => {
          return this.filterOption.level.some((v) => v === value)
        },
        divider: true
      },
      {
        text: '譜面',
        value: 'type',
        width: 95,
        filter: (value: string) => {
          return this.filterOption.type.some((v) => v === value)
        },
        divider: true
      },
      { text: '達成率', value: 'achievement', width: 135, divider: true },
      { text: 'ランク', value: 'rank', width: 105, divider: true },
      { text: 'DXスコア', value: 'dxScore', width: 150, divider: true },
      {
        text: '理論値ﾏｲﾅｽ',
        value: 'minusTheoreticalValue',
        width: 130,
        divider: true
      },
      { text: 'コンボ', value: 'comboRank', width: 105, divider: true },
      { text: 'SYNC', value: 'sync', width: 105, divider: true },
      { text: '最終更新', value: 'date', width: 135 }
    ]
  }

  search = ''

  mounted() {
    if (this.$store.state.user.filterOption) {
      this.filterOption = JSON.parse(
        JSON.stringify(this.$store.state.user.filterOption)
      )
    }
  }

  customFilterFunc(value: string, search: string | null, item: any) {
    return (
      value != null &&
      value === item.title &&
      search != null &&
      value.includes(search)
    )
  }

  filterReset() {
    this.filterOption = {
      difficultyLevel: ['Basic', 'Advanced', 'Expert', 'Master', 'ReMaster'],
      genre: [
        'niconico＆ボーカロイド',
        '東方Project',
        'バラエティ',
        'オリジナル',
        'POPS＆アニメ'
      ],
      version: [
        'maimai',
        'maimai_PLUS',
        'GreeN',
        'GreeN_PLUS',
        'ORANGE',
        'ORANGE_PLUS',
        'PiNK',
        'PiNK_PLUS',
        'MURASAKi',
        'MURASAKi_PLUS',
        'MiLK',
        'MiLK_PLUS',
        'FiNALE',
        'maimaiでらっくす'
      ],
      type: ['deluxe', 'standard'],
      level: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        7.5,
        8,
        8.5,
        9,
        9.5,
        10,
        10.5,
        11,
        11.5,
        12,
        12.5,
        13,
        13.5,
        14
      ],
      showColumn: [
        'title',
        'genre',
        'version',
        'difficultyLevel',
        'level',
        'type',
        'achievement',
        'rank',
        'dxScore',
        'maxDxScore',
        'minusTheoreticalValue',
        'comboRank',
        'sync',
        'date'
      ]
    }
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
  .checkbox {
    margin-right: 5px;
    margin-top: 0;
  }
  .optionTitle {
    margin-left: -12px;
    margin-top: 10px;
  }
  a {
    text-decoration: none;
  }
}
</style>
