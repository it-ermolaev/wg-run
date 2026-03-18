<script lang="ts">
  let data = $state<{ message: string } | null>(null)
  let loading = $state<boolean>(true)
  let error = $state<unknown>(null)

  async function fetchData() {
    try {
      const res = await fetch('/api/v1')

      data = await res.json()
    } catch (exception) {
      error = exception
    } finally {
      loading = false
    }
  }

  fetchData()
</script>

<section class="app">
  {#if loading}Loading...{/if}
  {#if error}{String(error)}{/if}
  {#if !data}No data{:else}{data.message}{/if}
</section>

<style lang="scss">
  @import './style';

  .app {
    padding: 24px;
    margin: 0;
  }
</style>
