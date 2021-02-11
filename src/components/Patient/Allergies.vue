<template>
  <div>
    <b-jumbotron>
      <h2>Allergies</h2>
      <ul class="list-group">
        <li class="list-group-item" v-for="a in allergies" v-bind:key="a.id">
          <div class="row">
            <div class="col text-left">
              <h5>{{ a.name }}, {{ a.form }}</h5>
            </div>
            <div class="col text-right">
              <button class="btn btn-outline-dark" v-on:click="onRemove(a)">Remove from allergies</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="d-flex flex-row-reverse mt-3">
        <button class="btn btn-info" v-on:click="onSubmit">Save allergies</button>
        <button class="btn btn-info" v-on:click="onAdd">Add to allergy list</button>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ selectMedicineText }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a v-for="m in otherMedicine" v-bind:key="m.id" class="dropdown-item" href="#"
               v-on:click="onMedicineSelected(m)">{{ m.name }}, {{ m.form }}</a>
          </div>
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Allergies",
  data() {
    return {
      allergies: [],
      medicine: [],
      selectedMedicine: null,
      selectMedicineText: 'SelectMedicine'
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/allergies")
        .then(response => {
          this.allergies = response.data
        })

    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "patient/medicine")
        .then(response => {
          this.medicine = response.data
        })
  },
  methods: {
    onSubmit() {
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + "patient/allergies", this.allergies)
          .then(response => {
            response.data
            alert("Allergies successfully updated!")
          })
          .catch(err => {
            err.message
            alert("Something went wrong. Please try again.")
          })
    },
    onMedicineSelected(medicine) {
      this.selectedMedicine = medicine
      this.selectMedicineText = medicine.name + ', ' + medicine.form
    },
    onAdd() {
      if (this.selectedMedicine != null) {
        let medicine = Object.assign(this.selectedMedicine)
        if (!this.allergiesContains(medicine)) {
          this.allergies.push(medicine)
        }
        this.selectedMedicine = null
        this.selectMedicineText = "Select medicine"
      }
    },
    onRemove(medicine) {
      let index = this.allergies.indexOf(medicine);
      if (index > -1) {
        this.allergies.splice(index, 1);
      }
    },
    allergiesContains(medicine) {
      for (let a of this.allergies) {
        if (a.id === medicine.id) return true;
      }
      return false;
    }
  },
  computed: {
    otherMedicine() {
      return this.medicine.filter(medicine => !this.allergiesContains(medicine));
    }
  }
}
</script>

<style scoped>

</style>