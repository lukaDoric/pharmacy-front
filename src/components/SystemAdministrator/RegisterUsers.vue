<template>
  <div class="card">
    <div class="card-header bg-dark">
      <h1>Register user</h1>
    </div>
    <div class="card-body bg-dark">
      <div class="form-group">
        <select class="form-select" id="selectUser" v-model="type">
          <option value="PHARMACIST">Pharmacist</option>
          <option value="DERMATOLOGIST">Dermatologist</option>
          <option value="SUPPLIER">Supplier</option>
          <option value="SYSTEM_ADMIN">System administrator</option>
          <option value="PHARMACY_ADMIN">Pharmacy administrator</option>
        </select>
        <label class="form-label" for="selectUser">Type of user</label>
      </div>

      <div class="form-outline mb-4">
        <input v-model="email" type="email" id="emailInput" class="form-control"
               placeholder="Enter user email address"/>
        <label class="form-label" for="emailInput">Email address</label>
      </div>

      <div class="form-outline mb-4">
        <input v-model="password" type="password" id="passwordInput" class="form-control"
               placeholder="Enter user password"/>
        <label class="form-label" for="passwordInput">Password</label>
      </div>
      <div class="form-outline mb-4">
        <input v-model="name" type="text" id="nameInput" class="form-control"
               placeholder="Enter user name"/>
        <label class="form-label" for="nameInput">Name</label>
      </div>
      <div class="form-outline mb-4">
        <input v-model="surname" type="text" id="surnameInput" class="form-control"
               placeholder="Enter user surname"/>
        <label class="form-label" for="surnameInput">Surname</label>
      </div>
      <div class="form-outline mb-4" v-if="type=='PHARMACY_ADMIN'">
        <select v-model="pharmacyId" id="pharmacySelect">
          <option v-for="p  in pharmacies" v-bind:key="p.id" selected class="dropdown-item" v-bind:value="p.id">
            {{ p.name }}, {{ p.address }}
          </option>
        </select>
        <label class="form-label" for="pharmacySelect">Surname</label>
      </div>
      <button class="btn btn-primary btn-block" @click="registerUser">Submit</button>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      pharmacies: null,
      pharmacyId: 1,
      type: "PHARMACIST",
      email: "",
      password: "",
      name: "",
      surname: ""
    }
  },
  mounted() {
    this.$http.get('http://localhost:8080/pharmacy/getAll').then(response => {
      this.pharmacies = response.data
    });
  },
  methods: {
    registerUser() {
      let user = {
        'email': this.email,
        'password': this.password,
        'name': this.name,
        'surname': this.surname,
        'type': this.type
      }
      if (this.type == "PHARMACY_ADMIN") {
        user['pharmacyId'] = this.pharmacyId;
      }
      this.$http.post('http://localhost:8080/register/user', user)
          .then(response => alert(response.data))
          .catch(err => alert(err.response.data));
    }
  },
  name: "RegisterUsers"
}
</script>

<style scoped>
.card {
  color: white;
  background-color: dimgray;
  margin: 6% 30%;
}

.card-body {
  margin: 3%;
}

select {
  width: 100%
}
</style>