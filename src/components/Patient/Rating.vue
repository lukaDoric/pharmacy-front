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
            <p>This is medicine table (use your imagination)</p>
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
                <td></td>
              </tr>
              </tbody>
            </table>
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
                <td></td>
              </tr>
              </tbody>
            </table>
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
export default {
  name: "Rating",
  data() {
    return {
      displayMode: 0,
      medicine: [],
      dermatologists: [],
      pharmacists: [],
      pharmacies: []
    }
  },
  mounted() {
    this.$http
        .get("http://localhost:8080/rating/dermatologists")
        .then(response => {
          this.dermatologists = response.data
        })
        .catch(err => alert(err.response.data))

    this.$http
        .get("http://localhost:8080/rating/pharmacists")
        .then(response => {
          this.pharmacists = response.data
        })
        .catch(err => alert(err.response.data))
  },
  methods: {
    switchDisplayMode(mode) {
      this.displayMode = mode
    }
  }
}
</script>

<style scoped>

</style>