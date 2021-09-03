<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h4 class="text-dark">Medicine Issuing</h4>
      <br/>
      <div class="px-5">
        <div class="input-group mb-3 px-5">
          <button class="btn btn-info btn-sm" type="button" v-on:click="search">Search</button>
          <input type="text" class="form-control" placeholder="Reservation number" v-model="searchName">
        </div>
        <table class="table table-dark table-hover table-bordered">
          <thead>
            <th>Name</th>
            <th>Type</th>
            <th>Form</th>
            <th>Rating</th>
            <th></th>
          </thead>
          <tbody v-for="(p, index) in medicineSearched" v-bind:key="index">
            <td>{{ p.medicineName }}</td>
            <td>{{ p.reservationId }}</td>
            <td></td>
            <td></td>
            <td>
              <button class="btn btn-info btn-sm" type="button" v-on:click="issued(p)">Issued</button>
            </td>
          </tbody>
        </table>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "MedicineIssuing",
  data() {
    return {
      medicines: [],
      searchName: '',
      medicineSearched: null
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/getAll/")
        .then(response => {
          this.medicines = response.data;
        })
  },
  methods: {
    search(){
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/getMedicineByUniqueNumber/" + this.searchName)
          .then(response => {
            this.medicineSearched = response.data;
      })

    },
    issued(p){
      this.$http
          .delete(process.env.VUE_APP_BACKEND_URL + "medicine-reservation/issue/" + p.reservationId)
          .then(response => {
            response.data
            window.location.reload()
          })
          .catch(reason => (alert(reason.message)))
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