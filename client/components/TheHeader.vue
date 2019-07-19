<template>
  <v-toolbar clipped-left color="cyan lighten-4" app>
    <v-toolbar-title style="cursor: pointer;" @click="$router.push('/')"
      >舞スコア</v-toolbar-title
    >
    <v-spacer />
    <v-menu offset-y>
      <v-btn slot="activator" icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="$router.push('/about')">
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '~/plugins/auth'
@Component
export default class TheHeader extends Vue {
  logout() {
    auth.logout()
  }
}
</script>
