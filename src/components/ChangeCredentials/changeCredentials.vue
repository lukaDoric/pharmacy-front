<template>
  <div class="card">
    <div class="card-header bg-dark">
      <h1>Change user information's.</h1>
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
      <button class="btn btn-primary btn-block" @click="registerUser">Submit</button>
    </div>


  </div>
</template>

<script>
export default {
name: "changeCredentials"
}
</script>

<style scoped>

</style>