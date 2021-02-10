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
        .get("http://localhost:8080/pharmacy/getPharmacyId")
        .then(response => {
          let id = response.data;
          this.path = "/pharmacyProfile/" + id;
        })

  }
}

</script>

<style scoped>

</style>