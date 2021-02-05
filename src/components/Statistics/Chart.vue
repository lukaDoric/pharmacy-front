<template>
  <div>
    <b-jumbotron>
      <div class="d-flex flex-row">
        <mdb-container>
          <div class="d-flex flex-row">
            <mdb-bar-chart
                :data="barChartDataMonth"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
            <mdb-bar-chart
                :data="barChartQuarter"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
            <mdb-bar-chart
                :data="barChartYear"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
          </div>
        </mdb-container>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <div class="d-flex flex-row">
        <mdb-container>
          <div class="d-flex flex-row">
            <mdb-bar-chart
                :data="barChartDataMonth"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
            <mdb-bar-chart
                :data="barChartQuarter"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
            <mdb-bar-chart
                :data="barChartYear"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
          </div>
        </mdb-container>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import {mdbBarChart, mdbContainer} from "mdbvue";

export default {
  name: "Chart",
  components: {
    mdbBarChart,
    mdbContainer
  },
  data() {
    return {
      barChartDataMonth: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Maj",
          "Jun",
          "Jul",
          "Avg",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3, 4, 5, 5, 5, 5, 5],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderWidth: 1
          }
        ]
      },
      barChartQuarter: {
        labels: [
          "quarter1",
          "quarter2",
          "quarter3",
          "quarter4"
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderWidth: 1
          }
        ]
      },
      barChartYear: {
        labels: [
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024"
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 20, 15],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderWidth: 1
          }
        ]
      }
      ,
      barChartOptions: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ]
        }
      }
    };
  }
};
</script>

<style scoped>

</style>