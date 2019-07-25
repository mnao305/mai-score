<template>
  <div id="indexPage">
    <h2>舞スコア</h2>
    <p>maimaiでらっくす用のスコア管理ツールです。</p>
    <v-btn
      class="loginRegistBtn"
      outline
      color="cyan darken-4"
      @click="$router.push('/login')"
    >
      ログイン
    </v-btn>
    <br />
    <v-btn
      class="loginRegistBtn"
      outline
      color="cyan darken-4"
      @click="$router.push('/regist')"
    >
      登録
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class IndexPage extends Vue {}
</script>

<style lang="scss" scoped>
#indexPage {
  text-align: center;
  .loginRegistBtn {
    width: 200px;
  }
}
</style>
