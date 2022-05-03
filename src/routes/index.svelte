<script lang="ts">
  import Table from '../components/Table.svelte';
  import Now from '../components/Now.svelte';
  import type { YrWeather } from 'src/types/YrWeather';
  import type { NominatimReverse } from 'src/types/Nominatim';

  let LOCATION = { name: 'Vormedal', lat: 59.355091, lng: 5.323378 }; // Vormedal coordinates

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        LOCATION = {
          name: await getNameFromCoordinates(location.coords.latitude, location.coords.longitude),
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
    const result: Promise<YrWeather> = await _fetch(url);

    return result;
  }

  async function _fetch(url: string): Promise<any> {
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

    return result;
  }

  async function getNameFromCoordinates(lat: number, lon: number) {
    const result = await _getNameFromCoordinates(lat, lon);

    if (result.address.city) {
      return result.address.city;
    } else if (result.address.village) {
      return result.address.village;
    }

    return 'Ukjent';
  }

  async function _getNameFromCoordinates(lat: number, lon: number): Promise<NominatimReverse> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const result: Promise<NominatimReverse> = await _fetch(url);

    return result;
  }
</script>

<main class="container">
  <button class="button" on:click={getLocation}>Hent lokasjon fra din nettleser</button>
  {#if LOCATION}
    <div class="my-4">
      <dl>
        <div class="flex gap-1">
          <dt>Sted:</dt>
          <dd>{LOCATION.name}</dd>
        </div>
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
      <Now now={result.properties.timeseries[0]} />
      <Table weatherData={result} />
    {/await}
  {/if}
</main>
