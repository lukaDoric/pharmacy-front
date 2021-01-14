<template>
  <div class="card">
    <div class="card-header bg-dark">
      <h1>Log in</h1>
    </div>
    <div class="card-body bg-dark">
      <div class="form-outline mb-4">
        <input type="email" id="form1Example1" class="form-control" placeholder="Enter your email address"/>
        <label class="form-label" for="form1Example1">Email address</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="form1Example2" class="form-control" placeholder="Enter your password"/>
        <label class="form-label" for="form1Example2">Password</label>
      </div>

      <button type="submit" class="btn btn-primary btn-block">Log in</button>
    </div>
    <div class="card-footer bg-dark">
      <small>
        Don't have account?
        <router-link to="/register"><a class="nav-link" href="#">Register<span class="sr-only">(current)</span></a>
        </router-link>
      </small>
    </div>

  </div>
</template>

<script>
export default {
  name: "LogIn"
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

.card-footer{
  margin: 3%;
}
</style>