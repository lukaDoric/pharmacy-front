<template>
  <div>
    <Dermatologists></Dermatologists>
    <Pharmacists></Pharmacists>
  </div>
</template>

<script>
import Pharmacists from "@/components/OurTeam/Pharmacists";
import Dermatologists from "@/components/OurTeam/Dermatologists";

export default {
  name: "OurTeam",
  components: {Dermatologists, Pharmacists},

  mounted() {
    if (this.$store.state.userType !== 'PharmacyAdmin' && this.$store.state.userType !== 'Patient') {
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>

</style>