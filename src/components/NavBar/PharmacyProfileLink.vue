<template>
  <li class="nav-item active">
    <router-link :to="path"><a class="nav-link" href="#">Pharmacy profile<span
        class="sr-only">(current)</span></a>
    </router-link>
  </li>
</template>

<script>

export default {
  name: "PharmacyProfileLink",

  data() {
    return {
      path: ''
    }
  },

  mounted() {

    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "pharmacy/getPharmacyId")
        .then(response => {
          let id = response.data;
          this.path = "/pharmacyProfile/" + id;
        })

  }
}

</script>

<style scoped>

</style>