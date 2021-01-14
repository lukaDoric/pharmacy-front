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
                    <input type="text" class="form-control" name="email" id="email" placeholder="Enter your email" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 form-group">
                  <label for="password" class="cols-sm-2 control-label">Password</label>
                  <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input type="password" class="form-control" name="confirm" id="password" placeholder="Enter your password" />
                </div>
                <div class="col-sm-6 form-group">
                  <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                  <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                  <input type="password" class="form-control" name="confirm" id="confirm" placeholder="Confirm your password" />
                </div>
              </div>
              <hr>
              <div class="form-group">
                <label for="firstName" class="cols-sm-2 control-label">First name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input id="firstName" type="text" placeholder="Enter first name here.." class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="lastName" class="cols-sm-2 control-label">Last name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input id="lastName" type="text" placeholder="Enter last name here.." class="form-control">
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-group">
                <label for="country" class="cols-sm-2 control-label">Country</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input id="country" type="text" placeholder="Enter country here.." class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="City" class="cols-sm-2 control-label">City</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input id="city" type="text" placeholder="Enter city here.." class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="Address" class="cols-sm-2 control-label">Address</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input id="Address" type="text" placeholder="Enter address here.." class="form-control">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="phoneNum" class="cols-sm-2 control-label">Phone number</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input id="phoneNum" type="text" placeholder="Enter phone number here.." class="form-control">
                  </div>
                </div>
              </div>

              <div class="form-group ">
                <button type="button" class="btn btn-primary btn-lg btn-block ">Submit</button>
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
export default {
name: "RegisterPatient"
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

.card-footer{
  margin: 3%;
}
</style>