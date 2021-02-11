<template>
  <div class="card">
    <div class="card-header bg-dark">
      <h1>Change password</h1>
    </div>
    <div class="card-body bg-dark">
      <div class="form-outline mb-4">
        <input v-model="password" type="password" id="form1Example2" class="form-control"
               placeholder="Enter your password"/>
        <label class="form-label" for="form1Example2">Password</label>
      </div>
      <button v-on:click="changePassword" class="btn btn-primary btn-block">Submit</button>
    </div>
    <div class="card-footer bg-dark">
      <small>
        First time user logs in, user has to change password.
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      password: "",
    }
  },
  props:['oldPassword', 'email']
  ,
  computed: {
    DTO() {
      return {'password': this.password, 'oldPassword':this.oldPassword, 'email':this.email}
    }
  },
  methods: {
    changePassword() {
      let store = this.$store;
      console.log(this.DTO);
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'login/initialPasswordChange', this.DTO)
          .then(response => {
            store.dispatch('startSession', response.data);
            this.$router.push("/home")
          })
          .catch(err=>{alert("Something went wrong. Please don't refresh page before typing new password and try again!");this.$router.push("/login");console.log(err.response.data)});
    }
  }
}
</script>

<style scoped>
.card {
  color: white;
  background-color: dimgray;
  margin: 6% 40%;
}

.card-body {
  margin: 3%;
}

.card-footer {
  margin: 3%;
}
</style>