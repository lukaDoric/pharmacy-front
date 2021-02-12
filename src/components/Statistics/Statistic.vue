<template>
  <div>
    <h1>Business Report</h1>
    <b-jumbotron>
      <h3>Pharmacy: {{ pharmacy.name }}</h3>
      <h3>Rating: {{ pharmacy.rating }}</h3>
    </b-jumbotron>
    <b-jumbotron>
      <h1>Exam statistic</h1>
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
          <div>
          </div>
        </mdb-container>
      </div>
      <hr>
      <div id class="d-flex flex-row">
        <Datepicker v-model="examYear" :format="DatePickerFormat" minimum-view="year"></Datepicker>
        <button @click="calculateExamStatistic" type="button" id="calculateExam" class="btn btn-success">Calculate exam
          statistic
        </button>
      </div>
      <p id="examNote">*NOTE: Pick for which year to calculate statistic.</p>
    </b-jumbotron>

    <b-jumbotron>
      <h1>Medicine statistic</h1>
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
      <hr>
      <div id class="d-flex flex-row">
        <Datepicker v-model="medicineYear" :format="DatePickerFormat" minimum-view="year"></Datepicker>
        <button @click="calculateMedicineStatistic" type="button" id="calculateMedicine" class="btn btn-success">
          Calculate medicine statistic
        </button>
      </div>
      <div class="d-flex flex-row">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">{{ medicineName }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" v-for="(medicine, index) in medicines"
               :key="index" v-on:click.prevent="onMedicineSelected(medicine)">{{
                medicine.name + '--' + medicine.form
              }}</a>
          </div>
        </div>
      </div>
      <p id="medicineNote">*NOTE: Pick for which year and medicine to calculate medicine statistic.</p>
    </b-jumbotron>

    <b-jumbotron>
      <h1>Income statistic</h1>
      <div id class="d-flex flex-row">
        <mdb-container v-if="incomeLoaded">
          <div class="d-flex flex-row">
            <mdb-bar-chart
                :data="barChartIncomeDataMonth"
                :options="barChartIncomeOptions"
                :width="330"
                :height="300"
            ></mdb-bar-chart>
          </div>
        </mdb-container>
      </div>
      <hr>
      <div id class="d-flex flex-row">
        <Datepicker v-model="incomeYear" :format="DatePickerFormat" minimum-view="year"></Datepicker>
        <button @click="calculateIncomeStatistic" type="button" id="calculateIncome" class="btn btn-success">Calculate
          income statistic
        </button>
      </div>
      <p id="incomeId">*NOTE: Pick for which year to calculate income statistic. By default it's current year!</p>
    </b-jumbotron>

    <b-jumbotron>
      <div>
        <h1 id="dermatologists">Dermatologists</h1>
      </div>
      <div class="container my-4">
        <hr>
        <div class="table-responsive">
          <div class="d-flex bd-highlight mb-3">
            <input type="text"
                   placeholder="Search"
                   v-model="filterDermatologist">
          </div>
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Rating</th>
            </tr>
            </thead>
            <tbody v-for="(dermatologist, index) in filteredDermatologists" :key="index">
            <tr>
              <td>{{ dermatologist.name }}</td>
              <td>{{ dermatologist.surname }}</td>
              <td>{{ dermatologist.rating }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <div>
        <h1 id="pharmacists">Pharmacists</h1>
      </div>
      <div class="container my-4">
        <hr>
        <div class="table-responsive">
          <div class="d-flex bd-highlight mb-3">
            <input type="text"
                   placeholder="Search"
                   v-model="filterPharmacist">
          </div>
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Rating</th>
            </tr>
            </thead>
            <tbody v-for="(pharmacist, index) in filteredPharmacists" :key="index">
            <tr>
              <td>{{ pharmacist.name }}</td>
              <td>{{ pharmacist.surname }}</td>
              <td>{{ pharmacist.rating }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <div>
        <h2 id="medicine">Recently searched medicine that were not on stock.</h2>
      </div>
      <div class="container my-4">
        <hr>
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Form</th>
              <th scope="col">Rating</th>
              <th scope="col">Search date</th>
            </tr>
            </thead>
            <tbody v-for="(medicine, index) in searchedMedicine" :key="index">
            <tr>
              <td>{{ medicine.medicine.name }}</td>
              <td>{{ medicine.medicine.form }}</td>
              <td>{{ medicine.medicine.rating }}</td>
              <td>{{ medicine.searchedDate }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-jumbotron>

  </div>
</template>

<script>
import {mdbBarChart, mdbContainer} from "mdbvue";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "Statistic",
  components: {
    mdbBarChart,
    mdbContainer,
    Datepicker
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
            label: "Month",
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
            label: "Quarter",
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
            label: "Year",
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
            label: "Month",
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
            label: "Quarter",
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
            label: "Year",
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

      barChartIncomeDataMonth: {
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
            label: "Month",
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

      barChartIncomeOptions: {
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

      DatePickerFormat: 'yyyy',
      examStatistics: null,
      medicineStatistics: null,
      income: null,
      examLoaded: false,
      medicineLoaded: false,
      incomeLoaded: false,
      selectedMedicine: 0,
      medicineName: 'Select medicine',
      medicines: [{name: '', form: ''}],
      examYear: '',
      medicineYear: '',
      incomeYear: '',
      pharmacy: {name: ''},
      dermatologists: [],
      pharmacists: [],
      filterPharmacist: '',
      filterDermatologist: '',
      searchedMedicine: []
    };
  },

  mounted() {

    if (this.$store.state.userType !== 'PharmacyAdmin') {
      this.$router.push("/")
    }

    this.$http.get(process.env.VUE_APP_BACKEND_URL + 'medicine/get/all')
        .then(response => {
          this.medicines = response.data;
        })

    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'medicine/getSearchedMedicine')
        .then(response => {
          this.searchedMedicine = response.data;
        })

    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'pharmacy/getAllPharmacyInfoByPharmacyAdmin')
        .then(response => {
          this.pharmacy = response.data.pharmacy;
          this.dermatologists = response.data.dermatologists;
          this.pharmacists = response.data.pharmacists;
        })
  },

  methods: {

    onMedicineSelected(medicine) {
      console.log(medicine.id);
      this.medicineName = medicine.name + '--' + medicine.form;
      this.selectedMedicine = medicine.id;
    },

    calculateExamStatistic() {
      this.examLoaded = false;
      this.barChartYear.labels = [];
      this.barChartYear.datasets[0].data = [];
      this.barChartYear.datasets[0].backgroundColor = [];
      this.barChartYear.datasets[0].borderColor = [];

      this.barChartDataMonth.datasets[0].data = [];
      this.barChartQuarter.datasets[0].data = [];

      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'statistic/exam/' + this.examYear.getFullYear())
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
    },

    calculateMedicineStatistic() {
      this.medicineLoaded = false;

      this.barChartMedicineYear.labels = [];
      this.barChartMedicineYear.datasets[0].data = [];
      this.barChartMedicineYear.datasets[0].backgroundColor = [];
      this.barChartMedicineYear.datasets[0].borderColor = [];
      this.barChartDataMedicineMonth.datasets[0].data = [];


      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'statistic/medicine/' + this.medicineYear.getFullYear() + "/" + this.selectedMedicine)
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
    },

    calculateIncomeStatistic() {
      this.incomeLoaded = false;

      this.barChartIncomeDataMonth.datasets[0].data = [];

      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'statistic/income/' + this.incomeYear.getFullYear())
          .then(response => {
            this.income = response.data;

            this.income.incomePerMonth.forEach(income => {
              this.barChartIncomeDataMonth.datasets[0].data.push(income)
            })

            this.incomeLoaded = true;
          })
    }
  },

  computed: {
    filteredDermatologists() {
      return this.dermatologists.filter(dermatologist => {
        const name = dermatologist.name.toString().toLowerCase();
        const surname = dermatologist.surname.toLowerCase();
        const rating = dermatologist.rating.toString();
        const searchTerm = this.filterDermatologist.toLowerCase();
        return name.includes(searchTerm) || surname.includes(searchTerm) || rating.includes(searchTerm);
      });
    },

    filteredPharmacists() {
      return this.pharmacists.filter(pharmacist => {
        const name = pharmacist.name.toString().toLowerCase();
        const surname = pharmacist.surname.toLowerCase();
        const rating = pharmacist.rating.toString();
        const searchTerm = this.filterPharmacist.toLowerCase();
        return name.includes(searchTerm) || surname.includes(searchTerm) || rating.includes(searchTerm);
      });
    }
  }
};
</script>

<style scoped>

#calculateExam {
  margin-left: 3%;
}

#calculateMedicine {
  margin-left: 3%;
}

#calculateIncome {
  margin-left: 3%;
}

#incomeId {
  margin-top: 3%;
}

#medicineNote {
  margin-top: 3%;
}

#examNote {
  margin-top: 3%;
}

</style>