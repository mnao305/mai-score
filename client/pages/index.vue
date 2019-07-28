<template>
  <div id="indexPage">
    <h2>舞スコア</h2>
    <p>
      maimaiでらっくす用のスコア管理ツールです。<br />
      <a @click="$router.push('/about')">このアプリについて詳しく→</a>
    </p>
    <div class="indexBtns">
      <v-btn
        class="loginRegistBtn"
        outlined
        color="cyan darken-4"
        @click="$router.push('/login')"
      >
        ログイン
      </v-btn>
      <br />
      <v-btn
        class="loginRegistBtn"
        outlined
        color="cyan darken-4"
        @click="$router.push('/regist')"
      >
        登録
      </v-btn>
    </div>
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
  .indexBtns {
    margin: 0 auto;
    width: 200px;
    .loginRegistBtn {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
