<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/"><a class="navbar-brand">Sputnik Pharmacy</a></router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/ourteam"><a class="nav-link" href="#">Our team<span class="sr-only">(current)</span></a>
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/contact"><a class="nav-link" href="#">Contact<span class="sr-only">(current)</span></a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  }
}
</script>
