<template>
  <div>
    <div>
      <h1>{{ pharmacy.name }}</h1>
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
        <vl-geom-point :coordinates="[location[0], location[1]]"></vl-geom-point>
      </vl-feature>
      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
    <button v-on:click="subscription" v-if="userType==='Patient'" class="btn btn-info" style="margin: 1%;width: 30%">
      {{ subscribeText }}
    </button>
    <div>
      <b-jumbotron>
        <p id="address" align="left">Address: {{ pharmacy.address.street }}, {{ pharmacy.address.city }},
          {{ pharmacy.address.country }}</p>
        <p id="rating" align="left">Rating: {{ pharmacy.rating }} \ 5</p>
        <p id="about" align="left">About: {{ pharmacy.about }}</p>
      </b-jumbotron>
    </div>

    <b-jumbotron>
      <div>
        <h1 id="dermatologists">Dermatologists</h1>
      </div>
      <div class="container my-4">
        <hr>
        <div class="table-responsive">
          <div class="d-flex bd-highlight mb-3">
            <input type="text"
                   placeholder="Search"
                   v-model="filterDermatologist">
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
              <td>{{ dermatologist.name }}</td>
              <td>{{ dermatologist.surname }}</td>
              <td>{{ dermatologist.rating }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <div>
        <h1 id="pharmacists">Pharmacists</h1>
      </div>
      <div class="container my-4">
        <hr>
        <div class="table-responsive">
          <div class="d-flex bd-highlight mb-3">
            <input type="text"
                   placeholder="Search"
                   v-model="filterPharmacist">
          </div>
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Rating</th>
            </tr>
            </thead>
            <tbody v-for="(pharmacist, index) in filteredPharmacists" :key="index">
            <tr>
              <td>{{ pharmacist.name }}</td>
              <td>{{ pharmacist.surname }}</td>
              <td>{{ pharmacist.rating }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <div>
        <h1 id="medicine">Medicine</h1>
      </div>
      <div class="container my-4">
        <hr>
        <div class="table-responsive">
          <div class="d-flex bd-highlight mb-3">
            <input type="text"
                   placeholder="Search"
                   v-model="filterMedicine">
          </div>
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Form</th>
              <th scope="col">Rating</th>
              <th scope="col">Current price</th>
            </tr>
            </thead>
            <tbody v-for="(medicine, index) in filteredMedicines" :key="index">
            <tr>
              <td>{{ medicine.name }}</td>
              <td>{{ medicine.form }}</td>
              <td>{{ medicine.rating }}</td>
              <td v-if="medicine.currentPrice !== 0">{{ medicine.currentPrice + "$" }}</td>
              <td v-else>Price is not currently defined!</td>
              <td>
                <button v-if="user == 'PharmacyAdmin'" type="button" class="btn btn-danger"
                        @click="removeMedicine(medicine)">Remove medicine
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <AvailableDermatologistExams :pharmacy-id="pharmacyId" v-if="pharmacyId != null"></AvailableDermatologistExams>
    </b-jumbotron>
  </div>
</template>

<script>
import AvailableDermatologistExams from "@/components/Patient/AvailableDermatologistExams";

export default {
  name: "PharmacyProfile",
  components: {AvailableDermatologistExams},
  watch: {
    '$route'(to) {
      this.pharmacyId = to.params.id;
    }
  },
  data() {
    return {
      zoom: 18,
      center: ['', ''],
      location: ['', ''],
      rotation: 0,
      pharmacy: {about: '', address: '', id: '', name: '', rating: ''},
      dermatologists: [],
      pharmacists: [],
      filterPharmacist: '',
      filterDermatologist: '',
      filterMedicine: '',
      medicines: [],
      pharmacyId: null,
      subscribed: false,
      user: this.$store.state.userType
    }
  },

  mounted() {

    if (this.$store.state.userType !== 'PharmacyAdmin' && this.$store.state.userType !== 'SystemAdmin' && this.$store.state.userType !== 'Patient') {
      this.$router.push("/")
    }

    this.pharmacyId = this.$route.params.id;
    this.$http
        .get('http://localhost:8080/pharmacy/getPharmacyById/' + this.pharmacyId)
        .then(response => {
          this.pharmacy = response.data.pharmacy;
          this.dermatologists = response.data.dermatologists;
          this.pharmacists = response.data.pharmacists;
          this.medicines = response.data.medicines;
          this.location[0] = response.data.pharmacy.address.longitude;
          this.location[1] = response.data.pharmacy.address.latitude;
          this.center[0] = response.data.pharmacy.address.longitude;
          this.center[1] = response.data.pharmacy.address.latitude;
        })
    this.checkIfSubscribed();
  },

  methods: {
    onMarkObject(event) {
      console.log(event.mapBrowserEvent.coordinate)
    },

    checkIfSubscribed() {
      if (this.userType === "Patient") {
        this.$http
            .get('http://localhost:8080/promotion/subscribe/' + this.pharmacyId)
            .then(response => {
              this.subscribed = response.data
            })
            .catch(err => {
              {
                this.subscribed = err.response.data;
                alert("Sorry, something went wrong.")
              }
            });
      }
    },

    subscription() {
      if (this.userType === "Patient") {
        this.$http
            .put('http://localhost:8080/promotion/subscribe/' + this.pharmacyId)
            .then(response => {
              this.subscribed = response.data
            })
            .catch(err => {
              {
                this.subscribed = err.response.data;
                alert("Sorry, something went wrong.")
              }
            });
      }
    },

    removeMedicine(medicine) {
      this.$http.delete('http://localhost:8080/pharmacy/deleteMedicine/' + medicine.id).then(response => {
        alert(response.data);
        window.location.reload()
      }).then(response => {
        alert(response.data);
        window.location.reload();
      }).catch(err => {
        alert(err.response.data)
      });
    }
  },

  computed: {
    filteredDermatologists() {
      return this.dermatologists.filter(dermatologist => {
        const name = dermatologist.name.toString().toLowerCase();
        const surname = dermatologist.surname.toLowerCase();
        const rating = dermatologist.rating.toString();
        const searchTerm = this.filterDermatologist.toLowerCase();
        return name.includes(searchTerm) || surname.includes(searchTerm) || rating.includes(searchTerm);
      });
    },

    filteredPharmacists() {
      return this.pharmacists.filter(pharmacist => {
        const name = pharmacist.name.toString().toLowerCase();
        const surname = pharmacist.surname.toLowerCase();
        const rating = pharmacist.rating.toString();
        const searchTerm = this.filterPharmacist.toLowerCase();
        return name.includes(searchTerm) || surname.includes(searchTerm) || rating.includes(searchTerm);
      });
    },

    filteredMedicines() {
      return this.medicines.filter(medicine => {
        const name = medicine.name.toString().toLowerCase();
        const form = medicine.form.toLowerCase();
        const rating = medicine.rating.toString();
        const searchTerm = this.filterMedicine.toLowerCase();
        return name.includes(searchTerm) || form.includes(searchTerm) || rating.includes(searchTerm);
      });
    },

    userType() {
      return this.$store.state.userType;
    },

    subscribeText() {
      if (this.subscribed) {
        return "Unsubscribe"
      } else {
        return "Subscribe"
      }
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

#about {
  font-size: large;
}

#dermatologists {
  margin-top: 5%;
}

#pharmacists {
  margin-top: 5%;
}

#medicine {
  margin-top: 5%;
}
</style>