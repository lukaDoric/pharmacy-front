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
              <button class="btn btn-info btn-sm" type="button" v-on:click="onSelect(p)" v-if="btn1">Select</button>
              <button class="btn btn-info btn-sm" type="button" v-on:click="onDeselect(p)" v-if="!btn1">Deselect</button>
            </td>
          </tr>
          </tbody>
        </table>
        <h4 class="display-4">Your pharmacist appointments</h4>
        <table class="table table-dark table-hover table-bordered">
          <thead>
          <th>Start</th>
          <th>End</th>
          <th>Price</th>
          <th>Pharmacist</th>
          <th>Pharmacy</th>
          </thead>
          <tbody v-for="e in exams" v-bind:key="e.id">
          <tr>
            <td>{{ e.examStart | dateFormat() }}</td>
            <td>{{ e.examEnd | dateFormat() }}</td>
            <td>{{ e.price | toMoney() }}</td>
            <td>{{ e.examinerName + " " + e.examinerSurname }}</td>
            <td>{{ e.pharmacyName }}</td>
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
      btn1: true,
      exams: []
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
  methods: {
    onSelect(e){
      this.btn1 = false
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "pharmacistExam/examHistoryPharmacist/" + e.patientID)
          .then(response => {
            this.exams = response.data;
          })

    },
    onDeselect(e){
      this.btn1 = true
      console.log(e)
    }
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