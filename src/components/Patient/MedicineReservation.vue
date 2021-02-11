<template>
  <div>
    <b-jumbotron class="jumbotron bg-dark text-light">
      <h1 class="display-4">Medicine reservations</h1>
      <p>All medicine reservations can be cancelled 24 hours before expiring.</p>
      <p class="text-warning"> Warning: Medicine that is not cancelled nor purchased at the selected pharmacy by the
        time
        reservation is expired may result in penalty points for the user.</p>
      <ul class="list-group text-dark" v-for="r in reservations" v-bind:key="r.reservationId">
        <li class="list-group-item bg-light">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-sm">
                <p>Medicine: {{ r.medicineName }}</p>
                <p>Form: {{ r.medicineForm }}</p>
              </div>
              <div class="col-sm-8">
                <p>You can purchase this medicine at: {{ r.pharmacyName }}, {{ r.pharmacyAddress }}</p>
                <p>By: {{ r.deadline }}</p>
              </div>
              <div class="col-sm">
                <button class="btn btn-danger" v-if="r.cancellable" v-on:click="onCancel(r.reservationId)">Cancel
                  reservation
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </b-jumbotron>
  </div>
</template>

<script>

export default {
  name: "MedicineReservation",
  data() {
    return {
      reservations: []
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/")
        .then(response => {
          this.reservations = response.data;
        })
  },
  methods: {
    onCancel(reservationId) {
      console.log(reservationId)
      this.$http
          .delete(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/cancel/" + reservationId)
          .then(window.location.reload())
          .catch(reason => (alert(reason.message)))
    }
  }
}
</script>

<style scoped>

</style>