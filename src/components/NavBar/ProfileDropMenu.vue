<template>
  <li style="float:right" class="dropdown nav-item ml-auto">
    <a href="javascript:void(0)" class="dropbtn">Profile</a>
    <div class="dropdown-content">
      <a class="drop-link" v-on:click="editProfile">Edit profile</a>
      <a class="drop-link" v-on:click="logOut">Log out</a>
    </div>
  </li>
</template>

<script>
export default {
  name: "ProfileDropMenu",
  methods:{
    logOut(){
      this.$store.dispatch('logOut');
      this.$router.push("/");
    },
    editProfile(){
      this.$router.push("/account/update");
    },
  }
}
</script>

<style scoped>


li a, .dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 8px 16px;
  text-decoration: none;
}

li a:hover, .dropdown:hover .dropbtn {
  background-color: dimgray;
}


.dropdown-content {
  right: 0;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>