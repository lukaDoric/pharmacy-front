<template>
  <div>
    <b-jumbotron>
      <h4 class="text-dark">Pharmacies</h4>
      <br>
      <div class="input-group mb-3 px-5">
        <input type="text" class="form-control" placeholder="Search pharmacies" v-model="searchParam">
      </div>
      <div class="px-5">
        <table class="table table-dark table-hover table-bordered">
          <thead>
          <th>Name</th>
          <th>Address</th>
          <th>Rating</th>
          </thead>
          <tbody v-for="p in filteredPharmacies" v-bind:key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.address.country }}, {{ p.address.city }}, {{ p.address.street }}</td>
          <td>{{ p.rating }}</td>
          </tbody>
        </table>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "PharmacySearch",
  data() {
    return {
      pharmacies: [],
      searchParam: ''
    }
  },
  mounted() {
    this.$http
        .get("http://localhost:8080/pharmacy/getAll/")
        .then(response => {
          this.pharmacies = response.data;
        })
  },
  computed: {
    filteredPharmacies() {
      return this.pharmacies.filter(pharmacy => {
        const name = pharmacy.name.toString().toLowerCase();
        const country = pharmacy.address.country.toLowerCase();
        const city = pharmacy.address.city.toLowerCase();
        const street = pharmacy.address.street.toLowerCase();
        const searchParam = this.searchParam.toLowerCase();
        return name.includes(searchParam) || country.includes(searchParam) || city.includes(searchParam) ||
            street.includes(searchParam);
      });
    }
  },
}
</script>

<style scoped>

</style>