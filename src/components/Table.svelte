<script lang="ts">
  import { formatNumber, getFormattedDate } from '../ts/main';

  import type { YrWeather } from 'src/types/YrWeather';
  export let weatherData: YrWeather;
  let currentItems = 13;
</script>

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
      {#each weatherData.properties.timeseries.slice(1, currentItems) as item}
        <tr class="even:bg-gray-200 hover:bg-gray-100">
          <td class="py-2 px-1">{getFormattedDate(item.time)}</td>
          <td class="py-2 px-1">
            {#if item.data.next_1_hours}
              <img
                src="/weathericons/{item.data.next_1_hours.summary.symbol_code}.svg"
                alt=""
                class="w-10"
              />
            {:else}
              N/A
            {/if}
          </td>
          <td class="py-2 px-1"
            >{formatNumber(item.data.instant.details.air_temperature, 'celsius')}</td
          >
          <td class="py-2 px-1"
            >{item.data.next_1_hours
              ? formatNumber(item.data.next_1_hours.details.precipitation_amount, 'millimeter')
              : 'N/A'}</td
          >
          <td class="py-2 px-1"
            >{formatNumber(item.data.instant.details.wind_speed, 'meter-per-second')}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="mt-8 flex gap-4">
    {#if currentItems > 13}
      <button class="button red" on:click={() => (currentItems -= 12)}> Fjern 12 timer </button>
    {/if}
    {#if currentItems < weatherData.properties.timeseries.length - 1}
      <button class="button blue" on:click={() => (currentItems += 12)}> Neste 12 timer </button>
    {/if}
  </div>
</div>
