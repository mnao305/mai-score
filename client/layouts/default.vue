<template>
  <v-app>
    <v-content>
      <the-header />
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <TheFooter />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '~/plugins/auth'
@Component({
  components: {
    TheHeader: () => import('~/components/TheHeader.vue'),
    TheFooter: () => import('~/components/TheFooter.vue')
  }
})
export default class IndexLayout extends Vue {
  async beforeMount() {
    const data = await auth.auth()
    if (data) {
      await this.$store.dispatch('user/setUser', data)
    } else {
      await this.$store.dispatch('user/logout')
    }

    if (
      this.$store.state.user.isAuthenticatedFlg &&
      this.$store.state.user.uid
    ) {
      if (
        this.$route.name === 'login' ||
        this.$route.name === 'regist' ||
        this.$route.name === 'index'
      ) {
        this.$router.push('/myscore')
      }
    } else {
      this.$store.dispatch('user/logout')
      if (this.$route.name === 'myscore') this.$router.push('/')
    }
  }
}
</script>
