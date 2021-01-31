<template>
  <div>
    <b-jumbotron class="jumbotron bg-dark text-light">
      <h1 class="display-4">Schedule an appointment with a dermatologist</h1>
      <p>All scheduled appointments can be cancelled 24 hours before start time.</p>
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
          <td>20</td>
          <td>{{ e.dermatologistName + " " + e.dermatologistSurname }}</td>
          <td>{{ e.dermatologistRating }}</td>
          <td>
            <button class="btn btn-success">Schedule</button>
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
  data() {
    return {
      exams: []
    }
  },
  mounted() {
    this.$http
        .get("http://localhost:8080/patient-exam/4")
        .then(response => {
          this.exams = response.data;
        })
  },
  methods: {},
  filters: {
    dateFormat: function (value) {
      let parsed = moment(value);
      return parsed.format('DD.MM.YYYY');
    },
    twoDecimals: function (value) {
      return (Math.round(value * 100) / 100).toFixed(2);
    }
  }
}
</script>

<style scoped>

</style>