<template>
  <div>

  </div>
</template>

<script>
export default {
name: "PharmacistHome",
  components: {

  },
  data() {
    return {
      display: 0
    }
  },
  mounted() {
    if (this.$store.state.userType !== 'Pharmacist') {
      this.$router.push("/login/");
    }
  },
  methods: {
    changeDisplay(mode) {
      this.display = mode;
    }
  }
}
</script>

<style scoped>

</style>