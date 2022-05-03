<script lang="ts">
  import Table from '../components/Table.svelte';
  import Now from '../components/Now.svelte';
  import type { YrWeather } from 'src/types/YrWeather';

  let LOCATION = { lat: 59.355091, lng: 5.323378 }; // Vormedal coordinates
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

<main class="container">
  <button class="button" on:click={getLocation}>Hent lokasjon fra din nettleser</button>
  {#if LOCATION}
    <div class="my-4">
      <dl>
        <div class="flex gap-1">
          <dt>Breddegrad:</dt>
          <dd>{LOCATION.lat}</dd>
        </div>
        <div class="flex gap-1">
          <dt>Lengdegrad:</dt>
          <dd>{LOCATION.lng}</dd>
        </div>
      </dl>
    </div>
    {#await getYr(String(LOCATION.lat), String(LOCATION.lng))}
      <div class="">laster inner...</div>
    {:then result}
      <Now now={weatherData.properties.timeseries[0]} />
      <Table {weatherData} />
    {/await}
  {/if}
</main>
