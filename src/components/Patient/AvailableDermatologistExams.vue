<template>
  <div>
    <b-jumbotron class="jumbotron bg-dark text-light">
      <h1 class="display-4">Schedule an appointment with a dermatologist</h1>
      <div class="row">
        <div class="col-sm-10">
          <p>All scheduled appointments can be cancelled 24 hours before start time.</p>
        </div>
        <div class="col-sm">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort by
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" v-on:click="onSort(0)">Price (lowest first)</a>
              <a class="dropdown-item" href="#" v-on:click="onSort(1)">Price (highest first)</a>
              <a class="dropdown-item" href="#" v-on:click="onSort(2)">Rating (lowest first)</a>
              <a class="dropdown-item" href="#" v-on:click="onSort(3)">Rating (highest first)</a>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <tr>
          <th>Date</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Price</th>
          <th>Dermatologist</th>
          <th>Dermatologist's rating</th>
          <th></th>
        </tr>
        </thead>
        <tbody v-for="e in exams" v-bind:key="e.examId">
        <tr>
          <td>{{ e.date | dateFormat() }}</td>
          <td>{{ e.start }}</td>
          <td>{{ e.end }}</td>
          <td>{{ e.price | toMoney() }}</td>
          <td>{{ e.dermatologistName + " " + e.dermatologistSurname }}</td>
          <td>{{ e.dermatologistRating }}</td>
          <td>
            <button v-if="userType==='Patient'" class="btn btn-success" v-on:click="onSchedule(e.examId)">Schedule
            </button>
            <button v-if="userType==='PharmacyAdmin'" class="btn btn-danger" v-on:click="onDelete(e.examId)">Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </b-jumbotron>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "AvailableDermatologistExams",

  props: ['pharmacyId'],

  data() {
    return {
      exams: [],
      userType: this.$store.state.userType
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient-exam/" + this.pharmacyId)
        .then(response => {
          this.exams = response.data;
        })
  },
  methods: {
    onSchedule(examId) {
      const config = {headers: {'Content-Type': 'application/json'}};
      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + "patient-exam/", examId, config)
          .then(response => {
            alert(response.data);
            window.location.reload()
          })
          .catch(err => {
            alert(err.response.data)
          });
    },
    onDelete(examId) {
      this.$http
          .delete(process.env.VUE_APP_BACKEND_URL + "exam/delete/" + examId)
          .then(response => {
            response.data
            alert("Exam is deleted successfully!")
            window.location.reload()
          })
          .catch(reason => alert(reason.message))
    },
    onSort(sort) {
      let param = ''
      switch (sort) {
        case 0:
          param = 'PRICE_ASC';
          break;
        case 1:
          param = 'PRICE_DESC';
          break;
        case 2:
          param = 'RATING_ASC';
          break;
        case 3:
          param = 'RATING_DESC';
          break;
      }
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "patient-exam/4/" + param)
          .then(response => {
            this.exams = response.data;
          })
    }
  },
  filters: {
    dateFormat: function (value) {
      let parsed = moment(value);
      return parsed.format('DD.MM.YYYY');
    },
    toMoney: function (value) {
      return (Math.round(value * 100) / 100).toFixed(2) + '$';
    }
  }
}
</script>

<style scoped>

</style>