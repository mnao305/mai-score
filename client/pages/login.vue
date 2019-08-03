<template>
  <div>
    <the-login-form :regist-flg="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  head: {
    title: 'ログイン'
  },
  components: {
    TheLoginForm: () => import('~/components/TheLoginForm.vue')
  }
})
export default class LoginPage extends Vue {}
</script>
