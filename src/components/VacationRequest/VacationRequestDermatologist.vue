<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h2>Select start date and end day of vacation</h2>
      <div id="appointment">
        <input :min="today" v-model="startDate" type="date"/>
        <input :min="today" v-model="endDate" type="date"/>
        <button  type="button" class="btn btn-info btn-sm" v-on:click="createRequest">Create request</button>
      </div>
      <div>
        <table class="table table-dark table-hover table-bordered">
          <thead>
          <tr>
            <th>Pharmacy</th>
            <th></th>
          </tr>
          </thead>
          <tbody v-for="p in pharmacies" v-bind:key="p.id">
          <tr>
            <td>{{ p.name }}</td>
            <td>
              <button class="btn btn-info btn-sm" type="button" v-on:click="onSelectPharmacy(p)" v-if="btn2">Select</button>
              <button class="btn btn-info btn-sm" type="button" v-on:click="onDeselectPharmacy(p)" v-if="!btn2">Deselect</button>
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
  name: "VacationRequestDermatologist",
  data() {
    return {
      pharmacies: [],
      pharmaciesOther: [],
      btn2: true,
      selectedPharmacy: null,
      startDate: null,
      endDate: null,
      today: '01-01-1970'
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "dermatologist/getDermatologistsPharmacies/")
        .then(response => {
          this.pharmacies = response.data;
          this.pharmaciesOther = response.data;
        })
    this.setToday()
  },
  methods: {
    onSelectPharmacy(p) {
      this.selectedPharmacy = p;
      this.pharmacies = [];
      this.pharmacies.push(p);
      this.btn2 = false;
    },
    onDeselectPharmacy() {
      this.pharmacies = this.pharmaciesOther;
      this.btn2 = true;
      this.selectedPharmacy = null;
    },
    createRequest(){
      if (this.selectedPharmacy === null) {
        alert("Please select pharmacy!")
        return;
      }
      let vacationDTO = {
        pharmacyID: this.selectedPharmacy.id,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'vacation/dermatologistVacationRequest/', vacationDTO)
          .then(response => {
            alert(response.data);
            window.location.reload()
          }).catch(err => {
        alert(err.response.data)
      });
    },
    setToday: function () {
      let today = new Date();
      let dd = today.getDate() + 1;
      let mm = today.getMonth() + 1; //January is 0!
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }

      this.today = yyyy + '-' + mm + '-' + dd;
    }
  }
}
</script>

<style scoped>

</style>