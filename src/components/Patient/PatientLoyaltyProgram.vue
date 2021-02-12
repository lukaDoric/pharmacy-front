<template>
  <div>
    <b-jumbotron>
      <h1>Loyalty program</h1>
      <p>We reward our users for using our services by giving them points that lead to established loyalty status and
        benefits.</p>

      <h1 class="text-left" v-if="displayGold"><span class="badge badge-warning text-light">GOLD</span></h1>
      <h1 class="text-left" v-if="displaySilver"><span class="badge badge-secondary text-light">SILVER</span></h1>
      <h1 class="text-left" v-if="displayRegular"><span class="badge badge-info text-light">REGULAR</span></h1>

      <h2 class="text-left">Your current loyalty points are: {{ loyaltyProgram.points }}</h2>
      <h2 class="text-left">Congratulations! You get {{ loyaltyProgram.discount }}% off on every purchase and exam!</h2>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "PatientLoyaltyProgram",
  data() {
    return {
      loyaltyProgram: {points: 0, status: 'REGULAR', discount: 0},
      displayDiscount: false,
      displayGold: false,
      displaySilver: false,
      displayRegular: true
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/loyaltyProgram")
        .then(response => {
          this.loyaltyProgram = response.data
          this.displayGold = this.loyaltyProgram.status === 'GOLD'
          this.displaySilver = this.loyaltyProgram.status === 'SILVER'
          this.displayRegular = this.loyaltyProgram.status === 'REGULAR'
          this.displayDiscount = this.displaySilver || this.displayGold
        })
  }
}
</script>

<style scoped>

</style>