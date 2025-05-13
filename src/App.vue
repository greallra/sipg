<script setup>
import Chart from "./components/Chart.vue";
import {
  roundDownToNearestTen,
  roundUpToNearestTen,
  calculatePercentage,
  formatDate,
} from "./utills";
import irradiation from "../irradiation";
import policies from "../policies";
const policyStartDate = policies.policies[0].policyStartDate;
const dataActualValues = irradiation.parameters[0].actualValues.map((item) => {
  return {
    time: item.datetime,
    value: item.value,
  };
});
const dataExpectedValues = irradiation.parameters[0].expectedValues.map(
  (item) => {
    return {
      time: item.datetime,
      value: item.value,
    };
  }
);
const dataExpectedValuesAfterStart = dataExpectedValues.filter(
  (item) =>
    new Date(item.time).getMonth() >= new Date(policyStartDate).getMonth()
);

const valueActual = dataActualValues.reduce(
  (acc, curr) => Number(acc) + Number(curr.value),
  0
);

const valueExpected = dataExpectedValuesAfterStart.reduce(
  (acc, curr) => Number(acc) + Number(curr.value),
  0
);
const percentageActual = (valueActual / valueExpected) * 100;
const percentageExpected = 100;

const minValuePercentage = roundDownToNearestTen(percentageActual);
const maxValuePercentage = roundUpToNearestTen(
  percentageActual,
  minValuePercentage
);
const formatNumber = (value, decimalPlaces = 2) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};
const minValue = (valueExpected / 100) * minValuePercentage;
const maxValue = (valueExpected / 100) * maxValuePercentage;
const percentageActualApex = calculatePercentage(
  valueActual,
  minValue,
  maxValue
);

const apexChartData = {
  series: [percentageActualApex], // Actual value shown in the center
  chartOptions: {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: "70%",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            show: true,
            formatter: function (val) {
              return `${formatNumber(percentageActual, 0)}%`;
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#4e73df"],
        stops: [0, 100],
      },
    },
    labels: ["Total Solar Irradiation"],
  },
};
</script>

<template>
  <div class="py-12">
    <Chart
      :minPercentage="minValuePercentage"
      :maxPercentage="maxValuePercentage"
      :valueExpected="valueExpected"
      :apexChartData="apexChartData"
      :caption2="`Since ${formatDate(
        policyStartDate
      )}, your panels have received ${formatNumber(
        percentageActual,
        0
      )}% of the total
      expected sun.`"
    />
  </div>
</template>
