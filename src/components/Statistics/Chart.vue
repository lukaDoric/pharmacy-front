<template>
  <div>
    <b-jumbotron>
      <div id class="d-flex flex-row">
        <mdb-container v-if="examLoaded">
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
      <div id class="d-flex flex-row">
        <mdb-container v-if="medicineLoaded">
          <div class="d-flex flex-row">
            <mdb-bar-chart
                :data="barChartDataMedicineMonth"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
            <mdb-bar-chart
                :data="barChartMedicineQuarter"
                :options="barChartOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
            <mdb-bar-chart
                :data="barChartMedicineYear"
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
            data: [],
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
            data: [],
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
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: [],
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
      },

      barChartDataMedicineMonth: {
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
            data: [],
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
      barChartMedicineQuarter: {
        labels: [
          "quarter1",
          "quarter2",
          "quarter3",
          "quarter4"
        ],
        datasets: [
          {
            data: [],
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
      barChartMedicineYear: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }
        ]
      }
      ,
      barChartMedicineOptions: {
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
      },

      examStatistics: '',
      medicineStatistics: '',
      examLoaded: false,
      medicineLoaded: false
    };
  },

  mounted() {

    this.$http
        .get('http://localhost:8080/statistic/exam')
        .then(response => {
          this.examStatistics = response.data;

          this.examStatistics.examYearStatistic.forEach(exam => {
            this.barChartYear.labels.push(exam.year)
            this.barChartYear.datasets[0].data.push(exam.count);
            this.barChartYear.datasets[0].backgroundColor.push("rgba(54, 162, 235, 0.2)");
            this.barChartYear.datasets[0].borderColor.push("rgba(54, 162, 235, 0.2)");
          })

          this.examStatistics.examMonthStatistic.examsPerMonth.forEach(exam => {
            this.barChartDataMonth.datasets[0].data.push(exam)
          })

          this.examStatistics.examQuarterStatistic.examsPerQuarter.forEach(exam => {
            this.barChartQuarter.datasets[0].data.push(exam)
          })

          this.examLoaded = true;
        })

    this.$http
        .get('http://localhost:8080/statistic/medicine')
        .then(response => {
          this.medicineStatistics = response.data;

          this.medicineStatistics.medicineYearStatistic.forEach(medicine => {
            this.barChartMedicineYear.labels.push(medicine.year)
            this.barChartMedicineYear.datasets[0].data.push(medicine.count);
            this.barChartMedicineYear.datasets[0].backgroundColor.push("rgba(54, 162, 235, 0.2)");
            this.barChartMedicineYear.datasets[0].borderColor.push("rgba(54, 162, 235, 0.2)");
          })

          this.medicineStatistics.medicineMonthStatistic.medicinePerMonth.forEach(medicine => {
            this.barChartDataMedicineMonth.datasets[0].data.push(medicine)
          })

          this.medicineStatistics.medicineQuarterStatistic.medicinesPerQuarter.forEach(medicine => {
            this.barChartMedicineQuarter.datasets[0].data.push(medicine)
          })

          this.medicineLoaded = true;
        })
  }
};
</script>

<style scoped>

</style>