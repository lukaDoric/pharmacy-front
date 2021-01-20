<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-dark"><h3 style="color: aliceblue">Register</h3></div>
          <div class="card-body bg-dark">

            <div class="form-group">
              <label for="email" class="cols-sm-2 control-label">Your email</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                  <input v-model="email" type="text" class="form-control" name="email" id="email" placeholder="Enter your email"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 form-group">
                <label for="password" class="cols-sm-2 control-label">Password</label>
                <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input v-model="password" type="password" class="form-control" name="confirm" id="password"
                       placeholder="Enter your password"/>
              </div>
              <div class="col-sm-6 form-group">
                <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input v-model="passwordVerification" type="password" class="form-control" name="confirm" id="confirm"
                       placeholder="Confirm your password"/>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label for="firstName" class="cols-sm-2 control-label">First name</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <input v-model="name" id="firstName" type="text" placeholder="Enter first name here.." class="form-control">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="lastName" class="cols-sm-2 control-label">Last name</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <input v-model="surname" id="lastName" type="text" placeholder="Enter last name here.." class="form-control">
                </div>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label for="country" class="cols-sm-2 control-label">Country</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <input v-model="country" id="country" type="text" placeholder="Enter country here.." class="form-control">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="City" class="cols-sm-2 control-label">City</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <input v-model="city" id="city" type="text" placeholder="Enter city here.." class="form-control">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="Address" class="cols-sm-2 control-label">Address</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <input id="Address" v-model="address" type="text" placeholder="Enter address here.." class="form-control">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="phoneNum" class="cols-sm-2 control-label">Phone number</label>
              <div class="cols-sm-10">
                <div class="input-group">
                  <input id="phoneNum" v-model="phoneNumber" type="text" placeholder="Enter phone number here.." class="form-control">
                </div>
              </div>
            </div>

            <div class="form-group ">
              <button v-on:click="submit" type="button" class="btn btn-primary btn-lg btn-block ">Submit</button>
            </div>

          </div>
          <div class="card-footer login-register bg-dark">
            <small>
              Already have account? <a href="#">Login</a>
            </small>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPatient",
  data: function () {
    return {
      redirectURL:"",
      name:"",
      surname:"",
      address:"",
      city:"",
      country:"",
      phoneNumber:"",
      email:"",
      password:"",
      passwordVerification:""
    }
  },
  mounted() {

  },
  methods: {
    submit(){
      if(this.ValidInformation){
        axios
            .post('http://localhost:8080/register/patient', this.User)
            .then(response => {this.redirectURL = response.data; self.$router.push(this.redirectURL);})
            .catch(err => console.log(err.response.data));
      }
      else {
        console.log("NEVALJAJU PODACI")
      }
    }
  },
  computed:{
    User(){
      let user;
      user = {'name':this.name, 'surname':this.surname, 'address':this.address, 'city':this.city, 'country':this.country,
        'phoneNumber':this.phoneNumber, 'email':this.email, 'password':this.password};
      return user
    },
    ValidInformation(){
      return   this.name!="" &&
          this.surname!="" &&
          this.address!="" &&
          this.city!="" &&
          this.country!="" &&
          this.phoneNumber!="" &&
          this.email!="" &&
          this.password!="" &&
          this.passwordVerification!="" &&
          this.password==this.passwordVerification;

    }
  },
}
</script>

<style scoped>
.card {
  color: white;
  background-color: dimgray;
  margin: 2%;
}

.card-body {
  margin: 2%;
}

.card-footer {
  margin: 3%;
}
</style>