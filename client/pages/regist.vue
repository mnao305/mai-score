<template>
  <div>
    <the-login-form :regist-flg="true" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    TheLoginForm: () => import('~/components/TheLoginForm.vue')
  }
})
export default class RegistPage extends Vue {}
</script>
