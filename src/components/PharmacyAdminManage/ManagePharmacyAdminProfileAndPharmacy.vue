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
               :key="index" v-on:click.prevent="onMedicineSelected(medicine)">{{
                medicine.name + '--' + medicine.form
              }}</a>
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
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">{{ dermatologistName }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" v-for="(dermatologist, index) in otherDermatologists"
               :key="index" v-on:click.prevent="onDermatologistSelected(dermatologist)">{{
                dermatologist.name + '--' + dermatologist.surname
              }}</a>
          </div>
        </div>
      </div>

      <hr>
      <h1>Set up schedule</h1>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row">
          <p class="col-1">MON</p>
          <b-input class="col-3" v-model="monTimeStartDermatologist" id="monTime" type="time"></b-input>
          <b-input class="col-3" v-model="monTimeEndDermatologist" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">TUE</p>
          <b-input class="col-3" v-model="tueTimeStartDermatologist" id="tueTime" type="time"></b-input>
          <b-input class="col-3" v-model="tueTimeEndDermatologist" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">WED</p>
          <b-input class="col-3" v-model="wedTimeStartDermatologist" id="wedTime" type="time"></b-input>
          <b-input class="col-3" v-model="wedTimeEndDermatologist" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">THUR</p>
          <b-input class="col-3" v-model="thuTimeStartDermatologist" id="thuTime" type="time"></b-input>
          <b-input class="col-3" v-model="thuTimeEndDermatologist" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">FRI</p>
          <b-input class="col-3" v-model="friTimeStartDermatologist" id="friTime" type="time"></b-input>
          <b-input class="col-3" v-model="friTimeEndDermatologist" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">SAT</p>
          <b-input class="col-3" v-model="satTimeStartDermatologist" id="satTime" type="time"></b-input>
          <b-input class="col-3" v-model="satTimeEndDermatologist" type="time"></b-input>
        </div>
        <div class="d-flex flex-row">
          <p class="col-1">SUN</p>
          <b-input class="col-3" v-model="sunTimeStartDermatologist" id="sunTime" type="time"></b-input>
          <b-input class="col-3" v-model="sunTimeEndDermatologist" type="time"></b-input>
        </div>
      </div>

      <div id="newDermatologist">
        <button name="addDermatologist" @click="addDermatologist" type="button" class="btn btn-success mt-3 mr-2">Add
          dermatologist
        </button>
      </div>
    </b-jumbotron>

    <b-jumbotron>
      <h1>Register pharmacist</h1>
      <div>
        <div class="form-outline mb-4">
          <label class="form-label" for="emailInput">Email address</label>
          <input type="email" v-model="pharmacistEmail" id="emailInput" class="form-control"
                 placeholder="Enter user email address"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="passwordInput">Password</label>
          <input type="password" v-model="pharmacistPassword" id="passwordInput" class="form-control"
                 placeholder="Enter user password"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="nameInput">Name</label>
          <input type="text" v-model="pharmacistName" id="nameInput" class="form-control"
                 placeholder="Enter user name"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="surnameInput">Surname</label>
          <input type="text" v-model="pharmacistSurname" id="surnameInput" class="form-control"
                 placeholder="Enter user surname"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="cityInput">City</label>
          <input type="text" v-model="pharmacistCity" id="cityInput" class="form-control"
                 placeholder="Enter user city"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="countryInput">Country</label>
          <input type="text" v-model="pharmacistCountry" id="countryInput" class="form-control"
                 placeholder="Enter user country"/>
        </div>
        <div class="form-outline mb-4">
          <label class="form-label" for="streetInput">Street</label>
          <input type="text" v-model="pharmacistStreet" id="streetInput" class="form-control"
                 placeholder="Enter user street"/>
        </div>

        <hr>
        <h1>Set up schedule</h1>
        <div id="schedule" class="d-flex flex-column">
          <div class="d-flex flex-row">
            <p class="col-1">MON</p>
            <b-input class="col-3" v-model="monTimeStartPharmacist" id="monTime" type="time"></b-input>
            <b-input class="col-3" v-model="monTimeEndPharmacist" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">TUE</p>
            <b-input class="col-3" v-model="tueTimeStartPharmacist" id="tueTime" type="time"></b-input>
            <b-input class="col-3" v-model="tueTimeEndPharmacist" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">WED</p>
            <b-input class="col-3" v-model="wedTimeStartPharmacist" id="wedTime" type="time"></b-input>
            <b-input class="col-3" v-model="wedTimeEndPharmacist" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">THUR</p>
            <b-input class="col-3" v-model="thuTimeStartPharmacist" id="thuTime" type="time"></b-input>
            <b-input class="col-3" v-model="thuTimeEndPharmacist" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">FRI</p>
            <b-input class="col-3" v-model="friTimeStartPharmacist" id="friTime" type="time"></b-input>
            <b-input class="col-3" v-model="friTimeEndPharmacist" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">SAT</p>
            <b-input class="col-3" v-model="satTimeStartPharmacist" id="satTime" type="time"></b-input>
            <b-input class="col-3" v-model="satTimeEndPharmacist" type="time"></b-input>
          </div>
          <div class="d-flex flex-row">
            <p class="col-1">SUN</p>
            <b-input class="col-3" v-model="sunTimeStartPharmacist" id="sunTime" type="time"></b-input>
            <b-input class="col-3" v-model="sunTimeEndPharmacist" type="time"></b-input>
          </div>
        </div>

        <button class="btn btn-success btn-block" @click="registerPharmacist" id="registerPharmacist">Create
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
      pharmacyAdmin: {address: ''},
      newPassword: '',
      oldPassword: '',
      pharmacy: {address: ''},
      medicineName: 'Select medicine',
      medicines: [],
      selectedMedicine: 0,
      pharmacistShifts: [],
      otherDermatologists: [],
      dermatologistName: 'Select dermatologist',
      selectedDermatologist: 0,

      monTimeStartPharmacist: '',
      monTimeEndPharmacist: '',
      tueTimeStartPharmacist: '',
      tueTimeEndPharmacist: '',
      wedTimeStartPharmacist: '',
      wedTimeEndPharmacist: '',
      thuTimeStartPharmacist: '',
      thuTimeEndPharmacist: '',
      friTimeStartPharmacist: '',
      friTimeEndPharmacist: '',
      satTimeStartPharmacist: '',
      satTimeEndPharmacist: '',
      sunTimeStartPharmacist: '',
      sunTimeEndPharmacist: '',

      monTimeStartDermatologist: '',
      monTimeEndDermatologist: '',
      tueTimeStartDermatologist: '',
      tueTimeEndDermatologist: '',
      wedTimeStartDermatologist: '',
      wedTimeEndDermatologist: '',
      thuTimeStartDermatologist: '',
      thuTimeEndDermatologist: '',
      friTimeStartDermatologist: '',
      friTimeEndDermatologist: '',
      satTimeStartDermatologist: '',
      satTimeEndDermatologist: '',
      sunTimeStartDermatologist: '',
      sunTimeEndDermatologist: '',

      pharmacistEmail: '',
      pharmacistPassword: '',
      pharmacistName: '',
      pharmacistSurname: '',
      pharmacistCity: '',
      pharmacistCountry: '',
      pharmacistStreet: ''
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

    this.$http.get('http://localhost:8080/dermatologist/getOtherDermatologists')
        .then(response => {
          this.otherDermatologists = response.data;
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
      }).then(response => alert(response.data)).catch(err => alert(err.response.data));
    },

    changePassword() {

      if (this.oldPassword === '' || this.newPassword === '') {
        alert("Please input all fields!")
        return;
      }

      this.$http.post('http://localhost:8080/user/changePassword', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).then(response => alert(response.data)).catch(err => alert(err.response.data));
    },

    updatePharmacy() {

      if (this.pharmacy.name === '' || this.pharmacy.about === '' || this.pharmacy.address.street === ''
          || this.pharmacy.address.city === '' || this.pharmacy.address.country === '') {
        alert("Please fill all info!")
        return;
      }

      this.$http.post('http://localhost:8080/pharmacy/updatePharmacy', {
        name: this.pharmacy.name,
        about: this.pharmacy.about,
        address: this.pharmacy.address
      }).then(response => alert(response.data)).catch(err => alert(err.response.data));
    },

    onMedicineSelected(medicine) {
      console.log(medicine.id);
      this.medicineName = medicine.name + '--' + medicine.form;
      this.selectedMedicine = medicine.id;
    },

    onDermatologistSelected(dermatologist) {
      this.dermatologistName = dermatologist.name + '--' + dermatologist.surname;
      this.selectedDermatologist = dermatologist.id;
    },

    addMedicine() {
      if (this.selectedMedicine === '') {
        alert("Please select medicine");
        return;
      }

      this.$http.put('http://localhost:8080/pharmacy/addMedicine/' + this.selectedMedicine)
          .then(response => alert(response.data)).catch(err => alert(err.response.data));
    },

    registerPharmacist() {

      if (this.pharmacistEmail === '' || this.pharmacistPassword === '' || this.pharmacistName === ''
          || this.pharmacistSurname === '' || this.pharmacistCity === '' || this.pharmacistCountry === '' || this.pharmacistStreet === '') {
        alert("Please fill all info!")
        return;
      }

      let isMonDefined = this.monTimeStartPharmacist !== '' && this.monTimeEndPharmacist !== ''
      let isTueDefined = this.tueTimeStartPharmacist !== '' && this.tueTimeEndPharmacist !== ''
      let isWedDefined = this.wedTimeStartPharmacist !== '' && this.wedTimeEndPharmacist !== ''
      let isThuDefined = this.thuTimeStartPharmacist !== '' && this.thuTimeEndPharmacist !== ''
      let isFriDefined = this.friTimeStartPharmacist !== '' && this.friTimeEndPharmacist !== ''
      let isSatDefined = this.satTimeStartPharmacist !== '' && this.satTimeEndPharmacist !== ''
      let isSunDefined = this.sunTimeStartPharmacist !== '' && this.sunTimeEndPharmacist !== ''

      let shift = [{
        'start': new Date('1970-01-01 ' + this.monTimeStartPharmacist),
        'end': new Date('1970-01-01 ' + this.monTimeEndPharmacist),
        'shiftDefined': isMonDefined
      }
        , {
          'start': new Date('1970-01-01 ' + this.tueTimeStartPharmacist),
          'end': new Date('1970-01-01 ' + this.tueTimeEndPharmacist),
          'shiftDefined': isTueDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.wedTimeStartPharmacist),
          'end': new Date('1970-01-01 ' + this.wedTimeEndPharmacist),
          'shiftDefined': isWedDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.thuTimeStartPharmacist),
          'end': new Date('1970-01-01 ' + this.thuTimeEndPharmacist),
          'shiftDefined': isThuDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.friTimeStartPharmacist),
          'end': new Date('1970-01-01 ' + this.friTimeEndPharmacist),
          'shiftDefined': isFriDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.satTimeStartPharmacist),
          'end': new Date('1970-01-01 ' + this.satTimeEndPharmacist),
          'shiftDefined': isSatDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.sunTimeStartPharmacist),
          'end': new Date('1970-01-01 ' + this.sunTimeEndPharmacist),
          'shiftDefined': isSunDefined
        }];

      this.$http.post('http://localhost:8080/register/pharmacist', {
        email: this.pharmacistEmail,
        password: this.pharmacistPassword,
        name: this.pharmacistName,
        surname: this.pharmacistSurname,
        country: this.pharmacistCountry,
        street: this.pharmacistStreet,
        city: this.pharmacistCity,
        shifts: shift
      })
          .then(response => alert(response.data))
          .catch(err => alert(err.response.data));
    },

    addDermatologist() {

      let isMonDefined = this.monTimeStartDermatologist !== '' && this.monTimeEndDermatologist !== ''
      let isTueDefined = this.tueTimeStartDermatologist !== '' && this.tueTimeEndDermatologist !== ''
      let isWedDefined = this.wedTimeStartDermatologist !== '' && this.wedTimeEndDermatologist !== ''
      let isThuDefined = this.thuTimeStartDermatologist !== '' && this.thuTimeEndDermatologist !== ''
      let isFriDefined = this.friTimeStartDermatologist !== '' && this.friTimeEndDermatologist !== ''
      let isSatDefined = this.satTimeStartDermatologist !== '' && this.satTimeEndDermatologist !== ''
      let isSunDefined = this.sunTimeStartDermatologist !== '' && this.sunTimeEndDermatologist !== ''

      let shift = [{
        'start': new Date('1970-01-01 ' + this.monTimeStartDermatologist),
        'end': new Date('1970-01-01 ' + this.monTimeEndDermatologist),
        'shiftDefined': isMonDefined
      }
        , {
          'start': new Date('1970-01-01 ' + this.tueTimeStartDermatologist),
          'end': new Date('1970-01-01 ' + this.tueTimeEndDermatologist),
          'shiftDefined': isTueDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.wedTimeStartDermatologist),
          'end': new Date('1970-01-01 ' + this.wedTimeEndDermatologist),
          'shiftDefined': isWedDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.thuTimeStartDermatologist),
          'end': new Date('1970-01-01 ' + this.thuTimeEndDermatologist),
          'shiftDefined': isThuDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.friTimeStartDermatologist),
          'end': new Date('1970-01-01 ' + this.friTimeEndDermatologist),
          'shiftDefined': isFriDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.satTimeStartDermatologist),
          'end': new Date('1970-01-01 ' + this.satTimeEndDermatologist),
          'shiftDefined': isSatDefined
        },
        {
          'start': new Date('1970-01-01 ' + this.sunTimeStartDermatologist),
          'end': new Date('1970-01-01 ' + this.sunTimeEndDermatologist),
          'shiftDefined': isSunDefined
        }];

      this.$http.post('http://localhost:8080/pharmacy/addDermatologist/', {
        dermatologistId: this.selectedDermatologist,
        shifts: shift
      })
          .then(response => alert(response.data))
          .catch(err => alert(err.response.data));
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