<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Upcoming appointments with pharmacists</h1>
      <div class="">
        <p>All scheduled appointments can be cancelled 24 hours before start time.</p>
      </div>
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <th>Start</th>
        <th>End</th>
        <th>Price</th>
        <th>Pharmacist</th>
        <th>Pharmacy</th>
        <th></th>
        </thead>
        <tbody v-for="e in exams" v-bind:key="e.id">
        <tr>
          <td>{{ e.examStart | dateFormat() }}</td>
          <td>{{ e.examEnd | dateFormat() }}</td>
          <td>{{ e.price | toMoney() }}</td>
          <td>{{ e.examinerName + " " + e.examinerSurname }}</td>
          <td>{{ e.pharmacyName }}</td>
          <td v-if="e.cancellable">
            <button class="btn btn-danger" v-on:click="onCancel(e.id)">Cancel</button>
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
  name: "ScheduledPharmacistExams",
  data() {
    return {
      exams: []
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "pharmacistExam/")
        .then(response => {
          this.exams = response.data
        })
        .catch(err => alert(err.response.data))
  },
  methods: {
    onCancel(id) {
      this.$http
          .delete(process.env.VUE_APP_BACKEND_URL + "pharmacistExam/cancel/" + id)
          .then(response => {
            response.data
            alert("Appointment successfully cancelled!")
            window.location.reload()
          })
          .catch(err => alert(err.response.data))
    }
  },
  filters: {
    dateFormat: function (value) {
      let parsed = moment(value);
      return parsed.format('DD.MM.YYYY HH:mm');
    },
    toMoney: function (value) {
      return (Math.round(value * 100) / 100).toFixed(2) + '$';
    }
  }
}
</script>

<style scoped>

</style>