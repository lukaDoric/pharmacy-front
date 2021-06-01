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
            <th scope="col">See details</th>
            <th >Name</th>
            <th >Surname</th>
          </thead>
          <tbody v-for="(p, index) in filteredList" v-bind:key="index">
            <tr class="accordion-toggle collapsed" id="accordion1" data-toggle="collapse" data-parent="#accordion1" href="#collapseOne">
              <td class="expand-button"></td>
              <td>{{ p.name }}</td>
              <td>{{ p.surname }}</td>
            </tr>
            <tr class="hide-table-padding" v-if="userType !== 'PharmacyAdmin'">
              <td></td>
              <td colspan="3">
                <div id="collapseOne" class="collapse in p-3">
                  <div class="row">
                    <div class="col-3"><p style="color:forestgreen;">Address:{{ p.address }}</p></div>
                    <div class="col-3"><p style="color:forestgreen;">City:{{ p.city }}</p></div>
                    <div class="col-3"><p style="color:forestgreen;">Country:{{ p.country }}</p></div>
                    <div class="col-3"><p style="color:forestgreen;">Phone number:{{ p.phoneNumber }}</p></div>
                    <div class="col-3"><p style="color:forestgreen;">Email:{{ p.email }}</p></div>
                  </div>
                </div>
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
  name: "PatientSearch",
  data() {
    return {
      patients: [],
      patientsSearched: [],
      searchParam: '',
      searchName: '',
      searchSurname: ''
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
    onFilterSearch() {
      this.$http
          .then(response => {
            this.patients = response.data;
          })
    },

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
#search-name-button {
  margin: 5px;
}

.jumbotron {
  margin: 2%;
}

.display-4 {
  margin-bottom: 0.5em;
}

tr.hide-table-padding td {
  padding: 0;
}

.expand-button {
  position: relative;
}

.accordion-toggle .expand-button:after {
  position: absolute;
  left: .75rem;
  top: 50%;
  transform: translate(0, -50%);
  content: '-';
}

.accordion-toggle.collapsed .expand-button:after {
  content: '+';
}
</style>