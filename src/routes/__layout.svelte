<script>
  import Footer from '../components/Footer.svelte';
  import Header from '../components/Header.svelte';
  import { locationName } from '../ts/stores';

  import '../css/main.css';
</script>

<head>
  <title>5545.no</title>
</head>
<Header title={locationName} message="🦺 Under utvikling 🦺" />

<slot />

<Footer />
