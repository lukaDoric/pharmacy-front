<template>
  <div>
    <b-jumbotron>
      <h4 class="text-dark">Pharmacies</h4>
      <br>
      <div class="input-group mb-3 px-5">
        <input type="text" class="form-control" placeholder="Search pharmacies" v-model="searchParam">
      </div>
      <div class="row mx-5">
        <div class="input-group form-inline mb-3 px-5">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="pharmacistsSort"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ ratingDropdownText }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" v-on:click="onRatingFilterChanged(0)">Any Rating</a>
              <a class="dropdown-item" href="#" v-on:click="onRatingFilterChanged(1)">1+ Star Rating</a>
              <a class="dropdown-item" href="#" v-on:click="onRatingFilterChanged(2)">2+ Star Rating</a>
              <a class="dropdown-item" href="#" v-on:click="onRatingFilterChanged(3)">3+ Star Rating</a>
              <a class="dropdown-item" href="#" v-on:click="onRatingFilterChanged(4)">4+ Star Rating</a>
              <a class="dropdown-item" href="#" v-on:click="onRatingFilterChanged(5)">5 Star Rating (Best)</a>
            </div>
          </div>
          <div class="input-group-prepend">
            <span class="input-group-text bg-light ml-4">Show results within</span>
          </div>
          <input type="number" step="5" min="5" class="form-control" aria-label="Distance"
                 v-model="distance">
          <div class="input-group-append">
            <span class="input-group-text bg-light mr-4">km</span>
          </div>
          <button class="btn btn-info" v-on:click="onFilterSearch()">Filter search</button>
        </div>
      </div>

      <div class="px-5">
        <table class="table table-dark table-hover table-bordered">
          <thead>
          <th>Name</th>
          <th>Address</th>
          <th>Rating</th>
          <th></th>
          </thead>
          <tbody v-for="p in filteredPharmacies" v-bind:key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.address.country }}, {{ p.address.city }}, {{ p.address.street }}</td>
          <td>{{ p.rating }}</td>
          <td>
            <button class="btn btn-info" v-on:click="onDetails(p.id)">Details</button>
          </td>
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
      searchParam: '',
      ratingDropdownTexts: ['All Ratings', '1+ Star Rating', '2+ Star Rating', '3+ Star Rating', '4+ Star Rating', '5 Star Rating (Best)'],
      ratingDropdownText: 'All Ratings',
      ratingFilterValues: ['NONE', 'ONE_STAR', 'TWO_STARS', 'THREE_STARS', 'FOUR_STARS', 'FIVE_STARS'],
      ratingFilter: 'NONE',
      distance: 10,
      userLon: 0.0,
      userLat: 0.0
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
        position => {
          this.userLat = position.coords.latitude;
          this.userLon = position.coords.longitude;
          console.log(this.userLon, this.userLat)
        },
        error => {
          console.log(error.message);
        },
    )

    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "pharmacy/getAll/")
        .then(response => {
          this.pharmacies = response.data;
        })
  },
  methods: {
    onRatingFilterChanged(filter) {
      this.ratingFilter = this.ratingFilterValues[filter]
      this.ratingDropdownText = this.ratingDropdownTexts[filter]
    },
    onFilterSearch() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "pharmacy/" + this.ratingFilter + "/" + this.distance + "/" + this.userLon + "/" + this.userLat)
          .then(response => {
            this.pharmacies = response.data;
          })
    },
    onDetails(pharmacyId) {
      console.log(pharmacyId)
      // TODO: go to pharmacy page
      this.$router.push("/pharmacyProfile/" + pharmacyId);
    }
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
  }
}
</script>

<style scoped>

</style>