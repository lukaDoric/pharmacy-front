<template>
  <div class="row">
    <div class="col-lg-6">
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>About</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="p in pharmacies" v-bind:key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.address.street}}, {{p.address.city}}, {{p.address.country}} </td>
          <td>{{ p.about }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-header bg-dark">
          <h1>Add new pharmacy</h1>
        </div>
        <div class="card-body bg-dark">
          <div class="form-outline mb-4">
            <input v-model="name" type="text" id="nameInput" class="form-control"
                   placeholder="Enter pharmacy's name"/>
            <label class="form-label" for="nameInput">Name</label>
          </div>
          <div class="form-outline mb-4">
            <input v-model="address.street" type="text" id="streetInput" class="form-control"
                   placeholder="Enter pharmacy's street"/>
            <label class="form-label" for="streetInput">Street</label>
          </div>
          <div class="form-outline mb-4">
            <input v-model="address.city" type="text" id="cityInput" class="form-control"
                   placeholder="Enter pharmacy's city"/>
            <label class="form-label" for="cityInput">City</label>
          </div>
          <div class="form-outline mb-4">
            <input v-model="address.country" type="text" id="countryInput" class="form-control"
                   placeholder="Enter pharmacy's country"/>
            <label class="form-label" for="countryInput">Country</label>
          </div>
          <div class="form-outline mb-4">
            <input v-model="address.latitude" type="number" id="latitudeInput" class="form-control"/>
            <br>
            <label class="form-label" for="latitudeInput">Latitude</label>
          </div>
          <div class="form-outline mb-4">
            <input v-model="address.longitude" type="number" id="longitudeInput" class="form-control"/><br>
            <label class="form-label" for="longitudeInput">Longitude</label>
          </div>
          <div class="form-outline mb-4">
            <textarea v-model="about" id="aboutInput" class="form-control"
                  placeholder="About this pharmacy"/>
            <label class="form-label" for="aboutInput">About</label>
          </div>
          <button class="btn btn-primary btn-block" @click="registerPharmacy">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPharmacy",
  data() {
    return {
      pharmacies: null,
      name: "",
      address: {},
      about: "",
    }
  },
  mounted() {
    if(this.$store.state.userType!=='SystemAdmin'){
      this.$router.push("/")
    }
    this.getAllPharmacies();
  },
  methods: {
    registerPharmacy() {
      let pharmacy = {
        'name': this.name,
        'address': this.address,
        'about': this.about,

      }
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'pharmacy/register', pharmacy)
          .then(response => {
            alert(response.data);
            this.getAllPharmacies()
          })
          .catch(err => alert(err.response.data));
    },
    getAllPharmacies() {
      this.$http.get(process.env.VUE_APP_BACKEND_URL + 'pharmacy/getAll').then(response => {
        this.pharmacies = response.data
      });
    }
  },
}
</script>

<style scoped>
.card {
  color: white;
  background-color: dimgray;
}

.col-lg-6 {
  padding: 0 1%;
}

.card-body {
  margin: 3%;
}

select {
  width: 100%
}
</style>