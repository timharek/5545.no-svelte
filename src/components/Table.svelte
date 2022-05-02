<script lang="ts">
  import type { YrWeather } from 'src/types/YrWeather';
  export let weatherData: YrWeather;

  function getFormattedDate(time: string) {
    const date = new Date(time);

    return new Intl.DateTimeFormat('no', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }

  function formatNumber(number: string | number, format: string | undefined = undefined) {
    if (format) {
      return new Intl.NumberFormat('no', {
        style: 'unit',
        unit: format,
        maximumFractionDigits: 0
      }).format(Number(number));
    }
    return new Intl.NumberFormat('no', { maximumFractionDigits: 0 }).format(Number(number));
  }
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
      {#each weatherData.properties.timeseries as item}
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
</div>
