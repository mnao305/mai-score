<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  fetch({ redirect }) {
    redirect('/')
  }
})
export default class userDefaultPage extends Vue {}
</script>
