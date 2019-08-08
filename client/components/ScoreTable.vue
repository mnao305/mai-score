<template>
  <div class="scoreData">
    <v-data-table
      :headers="headers"
      :items="scoreData"
      :search="search"
      multi-sort
      :mobile-breakpoint="50"
      :score-items="scoreData"
      :items-per-page="50"
      :footer-props="{
        itemsPerPageOptions: [50, 100, 250, -1]
      }"
      :loading="tableLoadFlg"
      :sort-desc="[true, false]"
      :custom-filter="customFilterFunc"
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
                  v-model="difficultyLevel"
                  class="checkbox"
                  :label="item"
                  :value="item"
                  hide-details
                ></v-checkbox>
              </v-layout>
              <div class="optionTitle">ジャンル：</div>
              <v-layout class="genreOption" row>
                <v-checkbox
                  v-for="item in genreList"
                  :key="item"
                  v-model="genre"
                  class="checkbox"
                  :label="item"
                  :value="item"
                  hide-details
                ></v-checkbox>
              </v-layout>
              <div class="optionTitle">レベル：</div>
              <v-layout class="levelOption" row>
                <v-checkbox
                  v-for="item in levelList"
                  :key="item"
                  v-model="level"
                  class="checkbox"
                  :label="
                    `${Math.round(item) === item ? item : `${item - 0.5}+`}`
                  "
                  :value="item"
                  hide-details
                ></v-checkbox>
              </v-layout>
              <div class="typeTitle">譜面タイプ：</div>
              <v-layout class="typeOption" row>
                <v-checkbox
                  v-for="item in typeList"
                  :key="item"
                  v-model="type"
                  class="checkbox"
                  :label="item"
                  :value="item"
                  hide-details
                ></v-checkbox>
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
        <td>
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
        </td>
      </template>
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
    <Loading v-if="tableLoadFlg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ScoreData } from '~/types'
@Component({
  components: {
    Loading: () => import('~/components/Loading.vue')
  }
})
export default class ScoreTable extends Vue {
  @Prop() scoreData?: ScoreData[]

  tableLoadFlg = true

  difficultyLevelList = ['Basic', 'Advanced', 'Expert', 'Master', 'ReMaster']

  difficultyLevel = ['Basic', 'Advanced', 'Expert', 'Master', 'ReMaster']

  genreList = [
    'niconico＆ボーカロイド',
    '東方Project',
    'バラエティ',
    'オリジナル',
    'POPS＆アニメ'
  ]

  genre = [
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

  level = [
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

  type = ['deluxe', 'standard']

  get headers() {
    return [
      { text: 'タイトル', value: 'title', divider: true },
      {
        text: 'ジャンル',
        value: 'genre',
        width: 190,
        filter: (value) => {
          return this.genre.some((v) => v === value)
        },
        divider: true
      },
      {
        text: '難易度',
        value: 'difficultyLevel',
        width: 105,
        filter: (value) => {
          return this.difficultyLevel.some((v) => v === value)
        },
        divider: true
      },
      {
        text: 'レベル',
        value: 'level',
        width: 105,
        filter: (value) => {
          return this.level.some((v) => v === value)
        },
        divider: true
      },
      {
        text: '譜面',
        value: 'type',
        width: 95,
        filter: (value) => {
          return this.type.some((v) => v === value)
        },
        divider: true
      },
      { text: '達成率', value: 'achievement', width: 135, divider: true },
      { text: 'ランク', value: 'rank', width: 105, divider: true },
      { text: 'DXスコア', value: 'dxScore', width: 125, divider: true },
      { text: 'コンボ', value: 'comboRank', width: 105, divider: true },
      { text: 'SYNC', value: 'sync', width: 105 }
    ]
  }

  search = ''

  mounted() {
    this.tableLoadFlg = false
  }

  customFilterFunc(value, search, item) {
    return (
      value != null &&
      value === item.title &&
      search != null &&
      value.indexOf(search) !== -1
    )
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
