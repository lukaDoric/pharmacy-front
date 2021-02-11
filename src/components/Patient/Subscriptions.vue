<template>
  <div style="margin: 3%">
    <h1>SUBSCRIPTIONS</h1>
    <table class="table table-dark table-hover">
      <thead>
      <tr>
        <th style="float: left">Pharmacy</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in pharmacies" v-bind:key="p.id">
        <td>{{ p.name }}</td>
        <td>{{ p.address.city }} {{ p.address.street }}</td>
        <td>
          <button class="btn btn-info" v-on:click="Unsubscribe(p)">Unsubscribe</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Subscriptions",
  data() {
    return {
      pharmacies: [],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      if(this.$store.state.userType!=='Patient'){
        this.$router.push("/");
      }
      this.$http.get(process.env.VUE_APP_BACKEND_URL + 'promotion/pharmacies')
          .then(response => this.pharmacies = response.data)
          .catch(err => {
            console.log(err);
            alert("Sorry something went wrong.")
          })
    },
    Unsubscribe(pharmacy) {
      this.$http
          .put(process.env.VUE_APP_BACKEND_URL + 'promotion/subscribe/' + pharmacy.id)
          .then(response => {
            console.log(response);
            this.init();
          })
          .catch(err => {
            {
              this.subscribed = err.response.data;
              alert("Sorry, something went wrong.")
            }
          });
    }
  }
}
</script>

<style scoped>

</style>