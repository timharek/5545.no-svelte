<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let title: Writable<string>;
  export let message: string;

  let TITLE: string;

  title.subscribe((value) => {
    TITLE = value;
  });
</script>

{#if message}
  <div class="py-2 border-b-2 border-black bg-blue-300">
    <div class="container text-center">{message}</div>
  </div>
{/if}
<header class="container my-8">
  <h1 class="text-6xl text-center">Været {TITLE}</h1>
</header>
