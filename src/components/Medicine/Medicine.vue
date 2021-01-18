<template>
  <div>
    <b-jumbotron>
      <h1 class="display-4">Medicine</h1>
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Form</th>
        </tr>
        </thead>
        <tbody v-for="(m, index) in medicine" v-bind:key="m.id">
        <tr class="align-content-center">
          <th scope="row">{{ index }}</th>
          <td class="align-baseline">{{ m.name }}</td>
          <td class="align-baseline">{{ m.description }}</td>
          <td class="align-baseline">{{ m.form }}</td>
          <td class="align-baseline">
            <button type="button" class="btn btn-info" v-on:click="onClick(m)">Make a reservation</button>
          </td>
        </tr>
        </tbody>
      </table>

      <h2 v-if="selectedMedicine != null" class="display-4">Make a reservation</h2>

      <div class="container bg-dark p-5" v-if="selectedMedicine != null">
        <p class="text-light text-left">By submitting this reservation you are confirming that you will purchase the
          medicine at the selected pharmacy by the date chosen.<br>You can cancel the reservation up to 24 hours before
          it expires to avoid penalty points.</p>
        <form v-on:submit.prevent="onSubmit">
          <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" :readonly="true" v-model="selectedMedicine.name"
                     placeholder="Medicine">
            </div>
            <div class="col">
              <input type="date" class="form-control" v-model="expirationDate" placeholder="Reservation expires">
            </div>
          </div>
          <div class="form-group mt-1 p-1" style="width: 100%">
            <div class="dropdown">
              <button class="btn btn-info dropdown-toggle btn-block" type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{dropdownText}}
              </button>
              <div class="dropdown-menu btn-block" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" v-on:click.prevent="onSelectionChanged(p)" v-for="p in pharmacies"
                   v-bind:key="p.id">{{ p.name + ", " + p.address }}</a>
              </div>
            </div>
          </div>
          <div class="form-group mt-1" style="width: 100%">
            <button type="submit" class="btn btn-info btn-block">Submit reservation
            </button>
          </div>
        </form>
      </div>

    </b-jumbotron>
  </div>
</template>

<style scoped>
</style>

<script>
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle';

export default {
  data() {
    return {
      medicine: [],
      pharmacies: [],
      selectedMedicine: null,
      selectedPharmacy: null,
      expirationDate: "",
      dropdownText: "Select pharmacy"
    }
  },
  name: "Medicine",
  mounted() {
    axios
        .get("http://localhost:8080/medicine-reservation/medicine")
        .then(response => (this.medicine = response.data))
  },
  methods: {
    onClick(medicine) {
      this.selectedMedicine = medicine
      axios
          .get("http://localhost:8080/medicine-reservation/pharmacies/" + medicine.id.toString())
          .then(response => (this.pharmacies = response.data))
    },
    onSelectionChanged(pharmacy) {
      this.selectedPharmacy = pharmacy
      this.dropdownText = pharmacy.name + ', ' + pharmacy.address
    },
    onSubmit() {
      console.log("confirmed: " + this.selectedMedicine.name + " " + this.expirationDate)
      axios
          .post("http://localhost:8080/medicine-reservation/", {
            medicineId: this.selectedMedicine.id,
            pharmacyId: this.selectedPharmacy.id,
            expirationDate: this.expirationDate
          })
          .then(response => {
            response.data
            alert("Medicine successfully reserved!")
          })
          .catch(error => {
            console.log(error.message)
            alert("Sorry, looks like there has been a mistake with your reservation. Please try again.")
          })
    }
  }
}
</script>

<style scoped>

</style>