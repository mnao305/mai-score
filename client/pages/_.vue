<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  fetch({ redirect }) {
    redirect('/')
  }
})
export default class defaultPage extends Vue {}
</script>
