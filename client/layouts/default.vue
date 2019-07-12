<template>
  <v-app>
    <v-content>
      <v-container>
        <the-header />
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  components: {
    TheHeader: () => import('~/components/TheHeader.vue')
  }
})
export default class IndexLayout extends Vue {}
</script>
