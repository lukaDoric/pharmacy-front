<template>
  <div class="card">
    <div class="card-header bg-dark">
      <h1>Log in</h1>
    </div>
    <div class="card-body bg-dark">
      <div class="form-outline mb-4">
        <input v-model="email" type="email" id="form1Example1" class="form-control"
               placeholder="Enter your email address"/>
        <label class="form-label" for="form1Example1">Email address</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input v-model="password" type="password" id="form1Example2" class="form-control"
               placeholder="Enter your password"/>
        <label class="form-label" for="form1Example2">Password</label>
      </div>

      <button v-on:click="login" class="btn btn-primary btn-block">Log in</button>
    </div>
    <div class="card-footer bg-dark">
      <small>
        Don't have account?
        <router-link to="/register/patient"><a class="nav-link" href="#">Register<span class="sr-only">(current)</span></a>
        </router-link>
      </small>
    </div>

  </div>
</template>

<script>


export default {


  data() {
    return {
      email: "",
      password: "",
      Token: null
    }
  },
  name: "LogIn",
  mounted() {
    if (this.$store.state.userType !== null) {
      this.$router.push("/")
    }
  },
  computed: {
    JwtAuthenticationRequest() {
      let account;
      account = {'email': this.email, 'password': this.password}
      return account
    }
  },
  methods: {
    login() {
      let store = this.$store;
      console.log("path:" + process.env.VUE_APP_BACKEND_URL)
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'login/', this.JwtAuthenticationRequest)
          .then(response => {
            store.dispatch('startSession', response.data);
            this.dispatch(response.data.userType);
          }).catch(err => this.handleErr(err.response.data.message));
    },
    handleErr(msg) {
      if (msg === 'User is disabled') {
        this.$router.push({name: 'ChangePassword', params: {oldPassword: this.password, email: this.email}})
      } else {
        alert("Sorry something went wrong. You might have disabled account or entered wrong password");
      }
    },
    dispatch(type) {
      let router = this.$router;
      if (type === 'Patient') {
        router.push("/patientHome");
        return
      }
      else if (type === 'PharmacyAdmin') {
        router.push("/managePharmacy");
        return
      }
      else if (type === 'Pharmacist') {
        router.push("/pharmacistHome");
        return
      }
      else if (type === 'Dermatologist') {
        router.push("/dermatologistHome");
        return
      }
      else if (type != null) {
        router.push("/");
      }
    }
  },
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