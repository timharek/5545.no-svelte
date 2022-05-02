<script lang="ts">
  import Table from '../components/Table.svelte';
  import Now from '../components/Now.svelte';
  import type { YrWeather } from 'src/types/YrWeather';

  let LOCATION = { lat: 0, lng: 0 };
  let weatherData: YrWeather;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        LOCATION = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        };
      });
      console.log('Retrived location', LOCATION);
    } else {
      alert('Could not retrieve location');
    }
  }

  async function getYr(lat: string, lng: string): Promise<YrWeather> {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`;
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });

    weatherData = result;
    return result;
  }
</script>

<main class="mx-auto max-w-5xl px-4">
  <h1 class="text-green-500">5545.no</h1>
  <button class="p-2 border-2 border-black bg-slate-300 rounded-md" on:click={getLocation}
    >Hent lokasjon</button
  >
  {#if LOCATION}
    <div class="">
      Lokasjon:
      <br />
      lat: {LOCATION.lat}
      lng: {LOCATION.lng}
    </div>
    {#await getYr(String(LOCATION.lat), String(LOCATION.lng))}
      <div class="">laster inner...</div>
    {:then result}
      <Now now={weatherData.properties.timeseries[0]} />
      <Table {weatherData} />
    {/await}
  {/if}
</main>
