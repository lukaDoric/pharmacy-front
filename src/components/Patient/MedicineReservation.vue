<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h4 class="display-4">Medicine reservations</h4>
      <p>All medicine reservations can be cancelled 24 hours before expiring.</p>
      <p class="text-danger"> Warning: Medicine that is not cancelled nor purchased at the selected pharmacy by the
        time
        reservation is expired may result in penalty points for the user.</p>
      <ul class="list-group text-light bg-dark" v-for="r in reservations" v-bind:key="r.reservationId">
        <li class="list-group-item bg-dark">
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
            </div>
            <div class="row">
              <div class="col-6"></div>
              <div class="col-4">
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
    this.init()
  },
  methods: {
    init() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/")
          .then(response => {
            this.reservations = response.data;
          })
    },
    onCancel(reservationId) {
      this.$http
          .delete(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/cancel/" + reservationId)
          .then(response => {
                this.init();
                response.data
              })
          .catch(reason => (alert(reason.message)))
    }
  }
}
</script>

<style scoped>

</style>