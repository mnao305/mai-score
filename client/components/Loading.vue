<template>
  <div class="loadingComponent">
    <div class="loading"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Loading extends Vue {}
</script>

<style lang="scss">
.loadingComponent {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 100;
}
.loading {
  position: fixed;
  top: 40%;
  left: 45%;
  width: 200px;
  height: 200px;
  border: 20px solid #000;
  border-right: 20px solid transparent;
  border-radius: 120px;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% {
  }

  50% {
    opacity: 0.6;
  }

  100% {
    transform: rotate(360deg);
    transform-origin: 50% 50%;
    opacity: 0.3;
  }
}
</style>
