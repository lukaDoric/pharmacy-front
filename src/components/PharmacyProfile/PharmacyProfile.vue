<template>
  <div>
    <div>
      <h1>Pharmacy name</h1>
    </div>

    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
            data-projection="EPSG:4326" style="height: 400px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="_media/marker.png" :scale="0.2" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>
      <vl-feature>
        <vl-geom-point :coordinates="[19.801726, 45.255790]"></vl-geom-point>
      </vl-feature>
      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>

    <div>
      <b-jumbotron>
        <p id="address" align="left">Address: Bulevar Slobodana Jovanovica 35</p>
        <p id="rating" align="left">Rating: 4.35 / 5</p>
      </b-jumbotron>
    </div>

    <div>
      <h1>Dermatologists</h1>
    </div>
    <div class="container my-4">
      <hr>
      <div class="table-responsive">
        <div class="d-flex bd-highlight mb-3">
          <input type="text"
                 placeholder="Search"
                 v-model="filter">
        </div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Rating</th>
          </tr>
          </thead>
          <tbody v-for="(dermatologist, index) in filteredDermatologists" :key="index">
          <tr>
            <td class="expand-button"></td>
            <td>{{ dermatologist.name }}</td>
            <td>{{ dermatologist.surname }}</td>
            <td>{{ dermatologist.rating }}</td>
            <td>
              <button :value="dermatologist.id" @click="checkDetails($event)" type="button" class="btn btn-success">
                Check details
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h1>Pharmacists</h1>
    </div>

    <div class="container my-4">
      <hr>
      <div class="table-responsive">
        <div class="d-flex bd-highlight mb-3">
          <input type="text"
                 placeholder="Search"
                 v-model="filter">
        </div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Rating</th>
          </tr>
          </thead>
          <tbody v-for="(dermatologist, index) in filteredDermatologists" :key="index">
          <tr>
            <td class="expand-button"></td>
            <td>{{ dermatologist.name }}</td>
            <td>{{ dermatologist.surname }}</td>
            <td>{{ dermatologist.rating }}</td>
            <td>
              <button :value="dermatologist.id" @click="checkDetails($event)" type="button" class="btn btn-success">
                Check details
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h1>Medicine</h1>
    </div>

    <div class="container my-4">
      <hr>
      <div class="table-responsive">
        <div class="d-flex bd-highlight mb-3">
          <input type="text"
                 placeholder="Search"
                 v-model="filter">
        </div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Form</th>
            <th scope="col">Rating</th>
          </tr>
          </thead>
          <tbody v-for="(dermatologist, index) in filteredDermatologists" :key="index">
          <tr>
            <td class="expand-button"></td>
            <td>{{ dermatologist.name }}</td>
            <td>{{ dermatologist.surname }}</td>
            <td>{{ dermatologist.rating }}</td>
            <td>
              <button :value="dermatologist.id" @click="checkDetails($event)" type="button" class="btn btn-success">
                Check details
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "PharmacyProfile",

  data() {
    return {
      zoom: 18,
      center: [19.801726, 45.255790],
      rotation: 0,
      address: '',

    }
  },
}
</script>

<style scoped>
#address {
  font-size: large;
}

#rating {
  font-size: large;
}
</style>