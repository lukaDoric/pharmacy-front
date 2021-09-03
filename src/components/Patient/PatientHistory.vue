<template>
  <div>
    <b-jumbotron>
      <h4 class="text-dark">Patients</h4>
      <br>
      <div class="px-5">
        <div class="input-group mb-3 px-5">
          <input type="text" class="form-control" placeholder="Search patients" v-model="searchName">
        </div>
        <table class="table table-dark table-hover table-bordered">
          <thead>

          <th >Name</th>
          <th >Surname</th>
          <th ></th>
          </thead>
          <tbody v-for="(p, index) in filteredList" v-bind:key="index">
          <tr>
            <td>{{ p.name }}</td>
            <td>{{ p.surname }}</td>
            <td>
              <button class="btn btn-danger" v-on:click="onSelect(p)">Select</button>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "PatientHistory",
  data() {
    return {
      patients: [],
      patientsSearched: [],
      searchName: '',
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/getAll/")
        .then(response => {
          this.patients = response.data;
          this.patientsSearched = response.data;
        })
  },
  computed: {
    filteredList(){
      return this.patientsSearched.filter(pat => {
        return pat.name.toLowerCase().concat(pat.surname.toLowerCase()).includes(this.searchName.toLowerCase().replace(/\s/g, ""))
      })
    }
  }
}
</script>

<style scoped>

</style>