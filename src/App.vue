<template>
  <div id="app">
    <NavBar><NavGroup side='mr-auto' ><OurTeamLink/><ContactLink/></NavGroup>
      <NavGroup side="ml-auto"><RegisterPatientLink/><LogIn/><ProfileDropMenu/></NavGroup></NavBar>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import ContactLink from "@/components/NavBar/ContactLink";
import OurTeamLink from "@/components/NavBar/OurTeamLink";
import ProfileDropMenu from "@/components/NavBar/ProfileDropMenu";
import NavGroup from "@/components/NavBar/NavGroup";
import RegisterPatientLink from "@/components/NavBar/RegisterPatientLink";
import LogIn from "@/components/NavBar/LogInLink";


export default {
  name: 'App',
  components: {
    LogIn,
    NavBar,
    ContactLink,
    OurTeamLink,
    ProfileDropMenu,
    NavGroup,
    RegisterPatientLink
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
