<template>
  <div>
    <the-login-form :regist-flg="false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '~/plugins/auth'
@Component({
  components: {
    TheLoginForm: () => import('~/components/TheLoginForm.vue')
  }
})
export default class LoginPage extends Vue {
  async created() {
    const data = await auth.auth()
    if (data) {
      this.$router.push('/myscore')
    } else {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
