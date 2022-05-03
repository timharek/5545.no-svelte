<script lang="ts">
  export let message: string;
</script>

{#if message}
  <div class="py-2 border-b-2 border-black bg-blue-300">
    <div class="container text-center">{message}</div>
  </div>
{/if}
<header class="container my-8">
  <h1 class="text-6xl text-center">Været på Vormedal</h1>
</header>
