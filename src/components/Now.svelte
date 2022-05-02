<script lang="ts">
  import { formatNumber } from '../ts/main';

  import type { Timeseries } from 'src/types/YrWeather';

  export let now: Timeseries;
</script>

<div
  class="w-full bg-gray-50 p-4 mb-4 border border-gray-800 rounded-md flex justify-between items-center text-4xl"
>
  <div class="">
    <img src="/weathericons/{now.data.next_1_hours.summary.symbol_code}.svg" alt="" class="w-24" />
  </div>
  <div class="text-red-500">
    {formatNumber(now.data.instant.details.air_temperature, 'celsius')}
  </div>
  <div class="text-blue-500">
    {formatNumber(now.data.next_1_hours.details.precipitation_amount, 'millimeter')}
  </div>
  <div class="text-gray-500">
    {formatNumber(now.data.instant.details.wind_speed, 'meter-per-second')}
  </div>
</div>
