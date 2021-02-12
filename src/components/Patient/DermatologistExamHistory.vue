<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h4 class="display-4">Your visits to dermatologists</h4>
      <br>
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Price</th>
          <th>Dermatologist</th>
          <th>Pharmacy</th>
        </tr>
        </thead>
        <tbody v-for="e in exams" v-bind:key="e.id">
        <tr>
          <td>{{ e.examStart | dateFormat() }}</td>
          <td>{{ e.examEnd | dateFormat() }}</td>
          <td>{{ e.price | toMoney() }}</td>
          <td>{{ e.examinerName + " " + e.examinerSurname }}</td>
          <td>{{ e.pharmacyName }}</td>
        </tr>
        </tbody>
      </table>
    </b-jumbotron>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "DermatologistExamHistory",
  data() {
    return {
      exams: []
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient-exam/examHistory/")
        .then(response => {
          this.exams = response.data;
        })
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