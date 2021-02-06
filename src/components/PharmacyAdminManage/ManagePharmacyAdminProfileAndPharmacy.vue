<template>
  <div>
    <b-jumbotron>
      <h1>Manage pharmacy info</h1>
      <label id="pharmacyNameLabel">Name</label>
      <b-input id="pharmacyName" type="text" placeholder="Pharmacy name..." v-model="pharmacy.name"></b-input>

      <label id="countryLabelPharmacy">Address</label>
      <b-input id="countryPharmacy" type="text" placeholder="Country..." v-model="pharmacy.address.country"></b-input>

      <label id="cityLabelPharmacy">City</label>
      <b-input id="cityPharmacy" type="text" placeholder="City..." v-model="pharmacy.address.city"></b-input>

      <label id="streetLabelPharmacy">Street</label>
      <b-input id="streetPharmacy" type="text" placeholder="Street..." v-model="pharmacy.address.street"></b-input>

      <label id="aboutLabel">About</label>
      <b-textarea id="about" type="text" placeholder="About..." v-model="pharmacy.about"></b-textarea>

      <div class="d-flex flex-row">
        <div>
          <label id="lonLabel">Longitude</label>
          <b-input id="lon" v-model="pharmacy.address.longitude" type="number"></b-input>
        </div>

        <div>
          <label id="latLabel">Latitude</label>
          <b-input id="lat" v-model="pharmacy.address.latitude" type="number"></b-input>
        </div>

        <div class="ml-auto p-2">
          <button type="button" @click="updatePharmacy" class="btn btn-success mt-3 mr-2">
            Update Pharmacy Info
          </button>
        </div>
      </div>
      <p id="noteMap">*NOTE: In order to display properly pharmacy location in map please input longitude and
        latitude.</p>
    </b-jumbotron>

    <b-jumbotron>
      <h1>Manage your info</h1>
      <label id="nameLabel">Name</label>
      <b-input id="Name" type="text" placeholder="Name..." v-model="pharmacyAdmin.name"></b-input>

      <label id="surnameLabel">Surname</label>
      <b-input id="surname" type="text" placeholder="Surname..." v-model="pharmacyAdmin.surname"></b-input>

      <label id="countryLabel">Country</label>
      <b-input id="country" type="text" placeholder="Country..." v-model="pharmacyAdmin.address.country"></b-input>

      <label id="cityLabel">City</label>
      <b-input id="city" type="text" placeholder="City..." v-model="pharmacyAdmin.address.city"></b-input>

      <label id="streetLabel">Street</label>
      <b-input id="Street" type="text" placeholder="Street..." v-model="pharmacyAdmin.address.street"></b-input>

      <div id="password">
        <div class="d-flex flex-row">
          <div>
            <label id="oldPasswordLabel">Enter Old Password</label>
            <b-input id="old" v-model="oldPassword" type="password"></b-input>
          </div>

          <div>
            <label id="newPasswordLabel">Enter New Password</label>
            <b-input id="new" v-model="newPassword" type="password"></b-input>
          </div>

          <div>
            <button id="updatePassButton" @click="changePassword" name="updatePharmacyAdminInfo" type="button"
                    class="btn btn-danger mt-3 mr-2">
              Update Your Password
            </button>
          </div>
          <div class="ml-auto p-2">
            <button name="updatePharmacyAdminInfo" type="button" @click="updatePharmacyAdminInfo"
                    class="btn btn-success mt-3 mr-2">Update Your Info
            </button>
          </div>
        </div>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <h1>Add new medicine to pharmacy</h1>
      <div class="d-flex flex-row">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">{{ medicineName }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" v-for="(medicine, index) in medicines"
               :key="index" v-on:click.prevent="onMedicineSelected(medicine)">{{ medicine.name + '--' + medicine.form }}</a>
          </div>
        </div>
      </div>
      <div id="newMedicine">
        <button name="addMedicine" @click="addMedicine" type="button" class="btn btn-success mt-3 mr-2">Add new medicine
        </button>
      </div>
      <p id="note">*NOTE: Here you can only add medicine that does not exist in pharmacy. In Price List you can add
        price and validity period.</p>
    </b-jumbotron>

    <b-jumbotron>
      <h1>Add Dermatologist</h1>

      <div class="d-flex flex-row">
        <div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            </div>
          </div>
        </div>
      </div>

      <hr>
      <h1>Set up schedule</h1>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row">
          <p class="col-1">MON</p>
          <b-input class="col-3" id="monTime" type="time"></b-input>
          <b-input class="col-3" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">TUE</p>
          <b-input class="col-3" id="tueTime" type="time"></b-input>
          <b-input class="col-3" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">WED</p>
          <b-input class="col-3" id="wedTime" type="time"></b-input>
          <b-input class="col-3" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">THUR</p>
          <b-input class="col-3" id="thuTime" type="time"></b-input>
          <b-input class="col-3" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">FRI</p>
          <b-input class="col-3" id="friTime" type="time"></b-input>
          <b-input class="col-3" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">SAT</p>
          <b-input class="col-3" id="satTime" type="time"></b-input>
          <b-input class="col-3" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">SUN</p>
          <b-input class="col-3" id="sunTime" type="time"></b-input>
          <b-input class="col-3" type="time"></b-input>
        </div>
      </div>

      <div id="newDermatologist">
        <button name="addDermatologist" type="button" class="btn btn-success mt-3 mr-2">Add dermatologist
        </button>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <h1>Register user</h1>
      <div>
        <div class="form-outline mb-4">
          <label class="form-label" for="emailInput">Email address</label>
          <input type="email" id="emailInput" class="form-control"
                 placeholder="Enter user email address"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="passwordInput">Password</label>
          <input type="password" id="passwordInput" class="form-control"
                 placeholder="Enter user password"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="nameInput">Name</label>
          <input type="text" id="nameInput" class="form-control"
                 placeholder="Enter user name"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="surnameInput">Surname</label>
          <input type="text" id="surnameInput" class="form-control"
                 placeholder="Enter user surname"/>
        </div>

        <hr>
        <h1>Set up schedule</h1>
        <div id="schedule" class="d-flex flex-column">
          <div class="d-flex flex-row">
            <p class="col-1">MON</p>
            <b-input class="col-3" id="monTime" type="time"></b-input>
            <b-input class="col-3" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">TUE</p>
            <b-input class="col-3" id="tueTime" type="time"></b-input>
            <b-input class="col-3" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">WED</p>
            <b-input class="col-3" id="wedTime" type="time"></b-input>
            <b-input class="col-3" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">THUR</p>
            <b-input class="col-3" id="thuTime" type="time"></b-input>
            <b-input class="col-3" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">FRI</p>
            <b-input class="col-3" id="friTime" type="time"></b-input>
            <b-input class="col-3" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">SAT</p>
            <b-input class="col-3" id="satTime" type="time"></b-input>
            <b-input class="col-3" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">SUN</p>
            <b-input class="col-3" id="sunTime" type="time"></b-input>
            <b-input class="col-3" type="time"></b-input>
          </div>
        </div>

        <button class="btn btn-success btn-block" id="registerPharmacist">Create
          pharmacist
        </button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "ManagePharmacyAdminProfileAndPharmacy",
  data() {
    return {
      pharmacyAdmin: null,
      newPassword: '',
      oldPassword: '',
      pharmacy: null,
      medicineName: 'Select medicine',
      medicines: [],
      selectedMedicine: 0
    }
  },

  mounted() {

    this.$http
        .get('http://localhost:8080/user/')
        .then(response => {
          this.pharmacyAdmin = response.data
        });

    this.$http
        .get('http://localhost:8080/pharmacy/getPharmacyByAdmin')
        .then(response => {
          this.pharmacy = response.data
        });

    this.$http.get('http://localhost:8080/medicine/getIfDoesntExist')
        .then(response => {
          this.medicines = response.data;
        })

  },

  methods: {

    updatePharmacyAdminInfo() {

      if (this.pharmacyAdmin.name === '' || this.pharmacyAdmin.surname === '' || this.pharmacyAdmin.address.country === '' || this.pharmacyAdmin.address.city === ''
          || this.pharmacyAdmin.address.street === '') {
        alert("Please input all fields!")
        return;
      }

      this.$http.post('http://localhost:8080/user/', {
        name: this.pharmacyAdmin.name,
        surname: this.pharmacyAdmin.surname,
        address: this.pharmacyAdmin.address
      })
    },

    changePassword() {
      this.$http.post('http://localhost:8080/user/changePassword', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
    },

    updatePharmacy() {
      this.$http.post('http://localhost:8080/pharmacy/updatePharmacy', {
        name: this.pharmacy.name,
        about: this.pharmacy.about,
        address: this.pharmacy.address
      })
    },

    onMedicineSelected(medicine) {
      console.log(medicine.id);
      this.medicineName = medicine.name + '--' + medicine.form;
      this.selectedMedicine = medicine.id;
    },

    addMedicine() {
      if (this.selectedMedicine === '') {
        alert("Please select medicine");
      }

      this.$http.put('http://localhost:8080/pharmacy/addMedicine/' + this.selectedMedicine);
    }

  }
}
</script>

<style scoped>

#lat {
  margin-left: 4%;
}

#pharmacyNameLabel {
  margin-top: 4%;
  display: inline-block
}

#countryLabelPharmacy {
  margin-top: 4%;
  display: inline-block
}

#cityLabelPharmacy {
  margin-top: 4%;
  display: inline-block
}

#streetLabelPharmacy {
  margin-top: 4%;
  display: inline-block
}

#aboutLabel {
  margin-top: 4%;
  display: inline-block
}

#lonLabel {
  margin-top: 8%;
  display: inline-block
}

#latLabel {
  margin-top: 8%;
  display: inline-block
}

#password {
  margin-top: 2%;
}

#updatePassButton {
  margin-top: 2%;
  margin-left: 10%;
}

#nameLabel {
  margin-top: 3%;
  display: inline-block
}

#surnameLabel {
  margin-top: 3%;
  display: inline-block
}

#countryLabel {
  margin-top: 3%;
  display: inline-block
}

#cityLabel {
  margin-top: 3%;
  display: inline-block
}

#streetLabel {
  margin-top: 3%;
  display: inline-block
}

#newMedicine {
  margin-right: 4%;
}

#note {
  margin-top: 3%;
}

#schedule {
  margin-top: 5%;
}

#registerPharmacist {
  margin-top: 4%;
}

#noteMap {
  margin-top: 3%;
}
</style>