<script lang="ts">
  import type { YrWeather } from 'src/types/YrWeather';
  import { object_without_properties, time_ranges_to_array } from 'svelte/internal';

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

  function getFormattedDate(time: string) {
    const date = new Date(time);

    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return new Intl.DateTimeFormat('no', options).format(date);
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
      <div class="w-full overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-500 divide-x-2 divide-gray-500">
              <th class="text-left py-2 px-1">Klokkeslett</th>
              <th class="text-left py-2 px-1">Vær</th>
              <th class="text-left py-2 px-1">Temp</th>
              <th class="text-left py-2 px-1">Nedbør</th>
              <th class="text-left py-2 px-1">Vind</th>
            </tr>
          </thead>
          <tbody>
            {#each result.properties.timeseries as item}
              <tr class="even:bg-gray-200 hover:bg-gray-100">
                <td class="py-2 px-1">{getFormattedDate(item.time)}</td>
                <td class="py-2 px-1"
                  >{item.data.next_1_hours ? item.data.next_1_hours.summary.symbol_code : 'N/A'}</td
                >
                <td class="py-2 px-1">{item.data.instant.details.air_temperature}</td>
                <td class="py-2 px-1"
                  >{item.data.next_1_hours
                    ? item.data.next_1_hours.details.precipitation_amount
                    : 'N/A'}</td
                >
                <td class="py-2 px-1">{item.data.instant.details.wind_speed}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/await}
  {/if}
</main>
