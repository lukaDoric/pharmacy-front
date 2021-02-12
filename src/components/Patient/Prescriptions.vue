<template>
  <div>
    <b-jumbotron>
      <h1>Your prescriptions</h1>
      <br>
      <div class="d-flex justify-content-between bg-dark text-light align-middle">
        <div class="p-2">
          <button class="btn btn-outline-light" v-on:click="prev">&lt;</button>
        </div>
        <div class="p-2">
          <h4>{{ selectedPrescription.prescriptionDate | dateFormat() }}</h4>
        </div>
        <div class="p-2">
          <button class="btn btn-outline-light" v-on:click="next">&gt;</button>
        </div>
      </div>
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <tr>
          <th colspan="3">Medicine</th>
          <th colspan="3">Uuid</th>
          <th colspan="3">Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(m, index) in selectedPrescription.medicines" v-bind:key="index">
          <th colspan="3">{{ m.name }}</th>
          <th colspan="3">{{ m.uuid }}</th>
          <th colspan="3">{{ m.amount }}</th>
        </tr>
        </tbody>
      </table>
    </b-jumbotron>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Prescriptions",
  data() {
    return {
      prescriptions: [],
      index: undefined
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/prescription")
        .then(response => {
          this.prescriptions = response.data
          this.index = 0
        })
  },
  methods: {
    next() {
      if (this.index !== this.prescriptions.length - 1) {
        this.index++
      }
    },
    prev() {
      if (this.index !== 0) {
        this.index--
      }
    }
  },
  computed: {
    selectedPrescription() {
      if (this.index === undefined) {
        return {prescriptionDate: '', medicines: []}
      }
      return this.prescriptions[this.index]
    }
  },
  filters: {
    dateFormat: function (value) {
      let parsed = moment(value);
      return parsed.format('DD.MM.YYYY');
    }
  }
}
</script>

<style scoped>

</style>