<template>
  <div>
    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Pharmacist vacation requests</h1>
      <div class="table-responsive">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Vacation Time</th>
            <th scope="col">Accept/Reject</th>
          </tr>
          </thead>
          <tbody v-for="(vacation, index) in pharmacistVacations" :key="index">
          <tr>
            <td>{{ vacation.name }}</td>
            <td>{{ vacation.surname }}</td>
            <td>{{ vacation.vacationInterval }}</td>
            <td>
              <form v-if="pharmacistVacations[index].status === 'Waiting'">
                <input v-model="pharmacistApproved[index]" type="radio" name="status" value=true>
                <label>Accept</label><br>
                <input v-model="pharmacistApproved[index]" type="radio" name="status" value=false>
                <label>Decline</label><br>
              </form>
              <p v-if="pharmacistVacations[index].status === 'Approved'">APPROVED</p>
              <p v-else-if="pharmacistVacations[index].status === 'Rejected'">
                REJECTED</p>
              <b-button v-if="pharmacistVacations[index].status === 'Waiting'" class="btn-success"
                        @click="sendVacationResponsePharmacist(index)">Send
              </b-button>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <b-form-textarea v-model="pharmacistReason[index]" placeholder="Reason..."
                               v-if="pharmacistApproved[index] === 'false'">
              </b-form-textarea>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </b-jumbotron>

    <b-jumbotron class="jumbotron">
      <h1 class="display-4">Dermatologist vacation requests</h1>
      <div class="table-responsive">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Vacation Time</th>
            <th scope="col">Accept/Reject</th>
          </tr>
          </thead>
          <tbody v-for="(vacation, index) in dermatologistVacations" :key="index">
          <tr>
            <td>{{ vacation.name }}</td>
            <td>{{ vacation.surname }}</td>
            <td>{{ vacation.vacationInterval }}</td>
            <td>
              <form v-if="dermatologistVacations[index].status === 'Waiting'">
                <input v-model="dermatologistApproved[index]" checked type="radio" name="status" value=true>
                <label>Accept</label><br>
                <input v-model="dermatologistApproved[index]" type="radio" name="status" value=false>
                <label>Decline</label><br>
              </form>
              <p v-if="dermatologistVacations[index].status === 'Approved'">APPROVED</p>
              <p v-else-if="dermatologistVacations[index].status === 'Rejected'">
                REJECTED</p>
              <b-button v-if="dermatologistVacations[index].status === 'Waiting'" class="btn-success"
                        @click="sendVacationResponseDermatologist(index)">Send
              </b-button>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <b-form-textarea v-model="dermatologistReason[index]" placeholder="Reason..."
                               v-if="dermatologistApproved[index] === 'false'">
              </b-form-textarea>
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
  data() {
    return {
      pharmacistReason: [],
      dermatologistReason: [],
      pharmacistApproved: [],
      dermatologistApproved: [],
      pharmacistVacations: [],
      dermatologistVacations: [],
      pharmacistVacationStatus: [],
      dermatologistVacationStatus: []
    }
  },

  mounted() {

    if (this.$store.state.userType !== 'PharmacyAdmin') {
      this.$router.push("/")
    }

    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'vacation/pharmacistVacation')
        .then(response => {
          this.pharmacistVacations = response.data;
        })

    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'vacation/dermatologistVacation')
        .then(response => {
          this.dermatologistVacations = response.data;
        })
  },

  methods: {
    sendVacationResponseDermatologist(index) {

      let approved = '';

      if (this.dermatologistApproved[index] === 'false') {
        approved = 'REJECTED';
      }

      if (this.dermatologistApproved[index] === 'true') {
        approved = 'APPROVED';
      }

      if (approved === '') {
        alert("Please choose one of two options!")
        return;
      }

      if (approved === 'REJECTED' && (this.dermatologistReason[index] === undefined || this.dermatologistReason[index] === '')) {
        alert("Reason for rejection is required!")
        return;
      }

      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'vacation/dermatologistVacation/',
              {
                id: this.dermatologistVacations[index].id,
                name: this.dermatologistVacations[index].name,
                surname: this.dermatologistVacations[index].surname,
                vacationInterval: this.dermatologistVacations[index].vacationInterval,
                role: this.dermatologistVacations[index].role,
                status: approved,
                reason: this.dermatologistReason[index]
              }).then(response => {
        alert(response.data);
        window.location.reload()
      }).catch(err => {
        alert(err.response.data)
      });
    },

    sendVacationResponsePharmacist(index) {

      let approved = '';

      if (this.pharmacistApproved[index] === 'false') {
        approved = 'REJECTED';
      }

      if (this.pharmacistApproved[index] === 'true') {
        approved = 'APPROVED';
      }

      if (approved === '') {
        alert("Please choose one of two options!")
        return;
      }

      if (approved === 'REJECTED' && (this.pharmacistReason[index] === undefined || this.pharmacistReason[index] === '')) {
        alert("Reason for rejection is required!")
        return;
      }

      console.log("123")
      console.log(approved)
      console.log(this.pharmacistReason[index])

      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'vacation/pharmacistVacation/',
              {
                id: this.pharmacistVacations[index].id,
                name: this.pharmacistVacations[index].name,
                surname: this.pharmacistVacations[index].surname,
                vacationInterval: this.pharmacistVacations[index].vacationInterval,
                role: this.pharmacistVacations[index].role,
                status: approved,
                reason: this.pharmacistReason[index]
              }).then(response => {
        alert(response.data);
        window.location.reload()
      }).catch(err => {
        alert(err.response.data)
      });
    }
  }
}
</script>