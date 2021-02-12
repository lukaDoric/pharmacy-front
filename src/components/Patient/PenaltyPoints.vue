<template>
  <div>
    <b-jumbotron>
      <h1>Penalty points</h1>
      <p>We use penalty points to track malicious behaviour in users in order to ensure good user experience for
        everyone.</p>
      <p>Users that have exceeded the penalty point limit are forbidden from making medicine reservations and scheduling
        appointments with pharmacists and dermatologists, as well as using the QR code scanner.</p>
      <p>The points are reset at the beginning of every month to give users another chance to enjoy using our
        website, but responsibly and with other people in mind.</p>
      <h2>Your current penalty points are: {{ points }}</h2>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "PenaltyPoints",
  data() {
    return {
      points: ''
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/penaltyPoints")
        .then(response => {
          this.points = response.data
        })
  }
}
</script>

<style scoped>

</style>