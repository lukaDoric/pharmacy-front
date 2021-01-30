<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Medicine reservations</h1>
      <ul class="list-group" v-for="r in reservations" v-bind:key="r.reservationId">
        <li class="list-group-item">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-sm">
                <p>Medicine: {{r.medicineName}}</p>
                <p>Form: {{r.medicineForm}}</p>
              </div>
              <div class="col-sm-8">
                <p>You can purchase this medicine at: {{r.pharmacyName}}, {{r.pharmacyAddress}}</p>
                <p>By: {{r.deadline}}</p>
              </div>
              <div class="col-sm">
                <button class="btn btn-danger">Cancel reservation</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MedicineReservation",
  data() {
    return {
      reservations: []
    }
  },
  mounted() {
    axios
        .get("http://localhost:8080/medicine-reservation/")
        .then(response => {
          this.reservations = response.data;
        })
  },
  methods: {

  }
}
</script>

<style scoped>

</style>