<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <the-header />
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '~/plugins/auth'
@Component({
  components: {
    TheHeader: () => import('~/components/TheHeader.vue')
  }
})
export default class IndexLayout extends Vue {
  async created() {
    const data = await auth.auth()
    if (data) {
      this.$store.dispatch('user/setUser', data)
    } else {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
