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
          <td>{{p.name}}</td>
          <td>{{p.address}}</td>
          <td>{{p.about}}</td>
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
                   placeholder="Enter pharmacy name"/>
            <label class="form-label" for="nameInput">Name</label>
          </div>
          <div class="form-outline mb-4">
            <input v-model="address" type="text" id="addressInput" class="form-control"
                   placeholder="Enter pharmacy address"/>
            <label class="form-label" for="addressInput">Address</label>
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
      address: "",
      about: "",
    }
  },
  mounted() {
    this.getAllPharmacies();
  },
  methods: {
    registerPharmacy() {
      let pharmacy = {
        'name': this.name,
        'address': this.address,
        'about': this.about
      }
      this.$http.post('http://localhost:8080/pharmacy/register', pharmacy)
          .then(response => {alert(response.data);this.getAllPharmacies()})
          .catch(err => alert(err.response.data));
    },
    getAllPharmacies(){
      this.$http.get('http://localhost:8080/pharmacy/getAll').then(response => {
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