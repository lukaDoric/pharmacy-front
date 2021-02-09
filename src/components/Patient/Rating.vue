<template>
  <div>
    <b-jumbotron>
      <h2 class="text-dark">Rate our services</h2>
      <p class="text-dark">
        *Ratings are calculated once a day, so your rating may not be taken into account immediately. Either way your
        feedback means a lot to us!
      </p>
      <div class="btn-group btn-block" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-info" @click="switchDisplayMode(0)">Medicine</button>
        <button type="button" class="btn btn-info" @click="switchDisplayMode(1)">Dermatologists</button>
        <button type="button" class="btn btn-info" @click="switchDisplayMode(2)">Pharmacists</button>
        <button type="button" class="btn btn-info" @click="switchDisplayMode(3)">Pharmacies</button>
      </div>

      <div class="panel-group">
        <div class="panel panel-primary">
          <div class="panel-body" v-if="displayMode === 0">
            <table class="table table-dark table-hover table-bordered mt-3">
              <thead>
              <tr>
                <th>Name</th>
                <th>Form</th>
                <th>Manufacturer</th>
                <th>Current rating</th>
                <th>Your rating</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="m in medicine" v-bind:key="m.id">
                <td>{{ m.name }}</td>
                <td>{{ m.form }}</td>
                <td>{{ m.manufacturer }}</td>
                <td>{{ m.rating }}</td>
                <td>
                  <star-rating v-bind:star-size="20" v-bind:show-rating="false"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="panel-body" v-if="displayMode === 1">
            <table class="table table-dark table-hover table-bordered mt-3">
              <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Current rating</th>
                <th>Your rating</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="d in dermatologists" v-bind:key="d.id">
                <td>{{ d.name }}</td>
                <td>{{ d.surname }}</td>
                <td>{{ d.rating }}</td>
                <td>
                  <star-rating @rating-selected="onRatingSelectedDermatologist(d.id, $event)" v-bind:star-size="20"
                               v-bind:show-rating="false"/>
                </td>
              </tr>
              </tbody>
            </table>
            <button class="btn btn-info btn-block" @click="onSubmitRatingDermatologists">Submit rating</button>
          </div>

          <div class="panel-body" v-if="displayMode === 2">
            <table class="table table-dark table-hover table-bordered mt-3">
              <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Current rating</th>
                <th>Your rating</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="p in pharmacists" v-bind:key="p.id">
                <td>{{ p.name }}</td>
                <td>{{ p.surname }}</td>
                <td>{{ p.rating }}</td>
                <td>
                  <div class="d-inline-flex justify-content-center">
                    <star-rating @rating-selected="onRatingSelectedPharmacist(p.id, $event)" v-bind:star-size="25"
                                 v-bind:show-rating="false"/>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <button class="btn btn-info btn-block" @click="onSubmitRatingPharmacists">Submit rating</button>
          </div>

          <div class="panel-body" v-if="displayMode === 3">
            <p>This is pharmacies table (use your imagination)</p>
          </div>
        </div>
      </div>

    </b-jumbotron>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: "Rating",
  components: {StarRating},
  data() {
    return {
      displayMode: 0,
      medicine: [],
      dermatologists: [],
      pharmacists: [],
      pharmacies: [],
      dermatologistRatings: new Map(),
      pharmacistRatings: new Map()
    }
  },
  mounted() {
    this.$http
        .get("http://localhost:8080/rating/medicine")
        .then(response => {
          this.medicine = response.data
        })
        .catch(err => console.log(err.response.data))

    this.$http
        .get("http://localhost:8080/rating/dermatologists")
        .then(response => {
          this.dermatologists = response.data
        })
        .catch(err => console.log(err.response.data))

    this.$http
        .get("http://localhost:8080/rating/pharmacists")
        .then(response => {
          this.pharmacists = response.data
        })
        .catch(err => console.log(err.response.data))
  },
  methods: {
    switchDisplayMode(mode) {
      this.displayMode = mode
    },
    onRatingSelectedDermatologist(id, rating) {
      this.dermatologistRatings.set(id, rating)
    },
    onRatingSelectedPharmacist(id, rating) {
      this.pharmacistRatings.set(id, rating)
    },
    onSubmitRatingMedicine() {

    },
    onSubmitRatingDermatologists() {
      let data = []
      for (let [key, value] of this.dermatologistRatings) {
        data.push({id: key, rating: value})
      }
      this.$http
          .post("http://localhost:8080/rating/dermatologists", data)
          .then(response => {
            response.data
            alert("Rating submitted!")
          })
          .catch(err => alert(err.response.data))
    },
    onSubmitRatingPharmacists() {
      let data = []
      for (let [key, value] of this.pharmacistRatings) {
        data.push({id: key, rating: value})
      }
      this.$http
          .post("http://localhost:8080/rating/pharmacists", data)
          .then(response => {
            response.data
            alert("Rating submitted!")
          })
          .catch(err => alert(err.response.data))
    },
    onSubmitRatingPharmacies() {

    },
  }
}
</script>

<style scoped>

</style>