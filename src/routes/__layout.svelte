<script>
  import Footer from '../components/Footer.svelte';
  import Header from '../components/Header.svelte';
  import { locationName } from '../ts/stores';

  import '../css/main.css';
</script>

<svelte:head>
  <title>5545.no</title>
  <script defer data-domain="5545.no" src="https://plausible.io/js/plausible.js"></script>
</svelte:head>
<Header title={locationName} message="🦺 Under utvikling 🦺" />

<slot />

<Footer />
