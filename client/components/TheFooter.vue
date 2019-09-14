<template>
  <v-footer color="cyan lighten-4" padless app absolute>
    <v-row justify="center" no-gutters>
      <v-col class="cyan lighten-4 py-4 text-center" cols="12">
        {{ new Date().getFullYear() }} — 舞スコア
        <a
          class="footerLink"
          href="https://twitter.com/mnao_305"
          target="_blank"
          >作者Twitter</a
        >
        <a
          class="footerLink"
          href="https://github.com/mnao305/mai-score"
          target="_blank"
        >
          GitHub
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class TheFooter extends Vue {
  links = ['作者Twitter', 'GitHub']
}
</script>

<style lang="scss" scoped>
.footerLink {
  margin-left: 10px;
}
</style>
