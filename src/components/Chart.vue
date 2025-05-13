<template>
  <div
    class="max-w-[550px] text-neutral-700 p-6 bg-white border border-gray-200 rounded-xl shadow-lg m-auto"
  >
    <div class="text-2xl">{{ title }}</div>
    <div class="mt-1 font-light text-neutral-600">
      {{ subtitle }}<br />
      <div class="font-semibold">{{ formatWattsToKWh(valueExpected) }}</div>
    </div>
    <div class="w-full max-[350px] mx-auto text-center relative mt-4">
      <div class="absolute top-[47%] left-[17%]">{{ minPercentage }}%</div>
      <div class="top-0 right-0">
        {{ Math.round((minPercentage + maxPercentage) / 2) }}%
      </div>
      <div
        class="absolute top-[10%] right-[50%] bg-black z-10 w-[4px] h-[22px]"
      ></div>
      <div class="absolute top-[47%] right-[16%]">{{ maxPercentage }}%</div>
      <apexchart
        type="radialBar"
        :options="apexChartData.chartOptions"
        :series="apexChartData.series"
        height="300"
      ></apexchart>

      <div class="mt-2 font-bold text-lg">{{ caption1 }}</div>
      <div class="text-sm text-gray-600 max-w-78 mt-4 mx-auto">
        {{ caption2 }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatWattsToKWh } from "../utills";
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Your solar irradiation",
  },
  subtitle: {
    type: String,
    required: true,
    default: "Total expected solar energy this period:",
  },
  minPercentage: {
    type: Number,
    required: true,
    default: 70,
  },
  maxPercentage: {
    type: Number,
    required: true,
    default: 130,
  },
  percentageActualOfExpected: {
    type: Number,
    required: true,
  },
  valueExpected: {
    type: Number,
    required: true,
  },
  caption1: {
    type: String,
    required: true,
    default: "Total Solar Irradiation",
  },
  caption2: {
    type: String,
    required: true,
  },
  apexChartData: {
    type: Object,
    required: true,
  },
});
</script>
