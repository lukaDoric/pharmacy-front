<template>
  <b-jumbotron>
    <h1>Manage your info</h1>
    <label id="nameLabel">Name</label>
    <b-input id="Name" type="text" placeholder="Name..." v-model="user.name"></b-input>

    <label id="surnameLabel">Surname</label>
    <b-input id="surname" type="text" placeholder="Surname..." v-model="user.surname"></b-input>

    <label id="countryLabel">Country</label>
    <b-input id="country" type="text" placeholder="Country..." v-model="user.address.country"></b-input>

    <label id="cityLabel">City</label>
    <b-input id="city" type="text" placeholder="City..." v-model="user.address.city"></b-input>

    <label id="streetLabel">Street</label>
    <b-input id="Street" type="text" placeholder="Street..." v-model="user.address.street"></b-input>
    <br>
    <div class="ml-auto p-2">
      <button name="updateUserInfo" type="button" @click="updateUserInfo"
              class="btn btn-success mt-3 mr-2">Update Your Info
      </button>
    </div>
    <br>
    <div id="password">
      <div class="d-flex flex-row">
        <div>
          <label id="oldPasswordLabel">Enter Old Password</label>
          <b-input id="old" v-model="oldPassword" type="password"></b-input>
        </div>

        <div>
          <label id="newPasswordLabel">Enter New Password</label>
          <b-input id="new" v-model="newPassword" type="password"></b-input>
        </div>
      </div>
      <div>
        <button id="updatePassButton" @click="changePassword" name="updatePharmacyAdminInfo" type="button"
                class="btn btn-danger mt-3 mr-2">
          Update Your Password
        </button>
      </div>
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  name: "ChangeUserInfo",
  data() {
    return {
      newPassword: '',
      oldPassword: '',
      user: {},
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'user/')
        .then(response => {
          this.user = response.data
        });
  },
  methods: {
    updateUserInfo() {
      if (this.user.name === '' || this.user.surname === '' || this.user.address.country === '' || this.user.address.city === ''
          || this.user.address.street === '') {
        alert("Please input all fields!")
        return;
      }
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'user/', {
        name: this.user.name,
        surname: this.user.surname,
        address: this.user.address
      }).then(response => alert(response.data)).catch(err => alert(err.response.data));
    },

    changePassword() {
      if (this.oldPassword === '' || this.newPassword === '') {
        alert("Please input all fields!")
        return;
      }
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'user/changePassword', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).then(response => {
        alert(response.data);
        this.$store.dispatch('logOut');
        this.$router.push("/login");
      })
          .catch(err => alert(err.response.data));
    },
  }
}
</script>

<style scoped>

</style>