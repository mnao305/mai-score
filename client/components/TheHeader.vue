<template>
  <v-app-bar clipped-left color="cyan lighten-4" app>
    <v-toolbar-title style="cursor: pointer;" @click="$router.push('/')"
      >舞スコア</v-toolbar-title
    >
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn slot="activator" icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="$router.push('/about')">
          <v-list-item-title>
            About
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="isAuthenticatedFlg"
          @click="$router.push('/setting')"
        >
          <v-list-item-title>
            Setting
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isAuthenticatedFlg" @click="logout">
          <v-list-item-title>
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as Vuex from 'vuex'
import auth from '~/plugins/auth'
@Component
export default class TheHeader extends Vue {
  $store!: Vuex.ExStore

  get isAuthenticatedFlg() {
    return this.$store.state.user.isAuthenticatedFlg
  }

  logout() {
    auth.logout()
    this.$store.dispatch('user/logout')
    this.$router.push('/')
  }
}
</script>
