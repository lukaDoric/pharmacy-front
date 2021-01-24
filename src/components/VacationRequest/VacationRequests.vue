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
              <form v-if="pharmacistVacations[index].status === 'Waiting for response'">
                <input v-model="pharmacistApproved[index]" type="radio" name="status" value=true>
                <label>Accept</label><br>
                <input v-model="pharmacistApproved[index]" type="radio" name="status" value=false>
                <label>Decline</label><br>
              </form>
              <p v-if="pharmacistVacations[index].approved">APPROVED</p>
              <p v-else-if="!pharmacistVacations[index].approved && pharmacistVacations[index].status === 'Responded'">
                REJECTED</p>
              <b-button v-if="pharmacistVacations[index].status === 'Waiting for response'" class="btn-success"
                        @click="sendVacationResponsePharmacist(index)">Send
              </b-button>
            </td>
          </tr>
          <b-form-textarea v-model="pharmacistReason[index]" placeholder="Reason..."
                           v-if="pharmacistApproved[index] === 'false'">
          </b-form-textarea>
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
            <th scope="col">Accept/Decline</th>
          </tr>
          </thead>
          <tbody v-for="(vacation, index) in dermatologistVacations" :key="index">
          <tr>
            <td>{{ vacation.name }}</td>
            <td>{{ vacation.surname }}</td>
            <td>{{ vacation.vacationInterval }}</td>
            <td>
              <form>
                <input v-model="dermatologistApproved[index]" type="radio" name="status" value=true>
                <label>Accept</label><br>
                <input v-model="dermatologistApproved[index]" type="radio" name="status" value=false>
                <label>Decline</label><br>
              </form>
              <b-button class="btn-success" @click="sendVacationResponseDermatologist(index)">Send
              </b-button>
            </td>
          </tr>
          <b-form-textarea rowspan="4" v-model="dermatologistReason[index]" placeholder="Reason..."
                           v-if="dermatologistApproved[index] === 'false'">
          </b-form-textarea>
          </tbody>
        </table>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";

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
    axios
        .get('http://localhost:8080/vacation/getAllPharmacistsVacation')
        .then(response => {
          this.pharmacistVacations = response.data;
          this.pharmacistVacations.forEach(vacation => {
            this.pharmacistVacationStatus.add(vacation.status)
          });
        })

    axios
        .get('http://localhost:8080/vacation/getAllDermatologistsVacation')
        .then(response => {
          this.dermatologistVacations = response.data;
        })
  },

  methods: {
    // sendVacationResponseDermatologist(index) {
    //   axios
    //       .post('http://localhost:8080/vacation/sendVacationResponseDermatologist',
    //           {id: this.pharmacistVacations[index].id,
    //           name: this.pharmacistVacations[index].name,
    //           surname: this.pharmacistVacations[index].surname,
    //           vacationInterval: this.pharmacistVacations[index].vacationInterval,
    //           role: this.pharmacistVacations[index].role,
    //           isApproved: this.dermatologistApproved[index],
    //           reason: this.dermatologistReason[index]})
    // },

    sendVacationResponsePharmacist(index) {

      let approved = 'true';

      if (this.pharmacistApproved[index] === 'false') {
        approved = 'false';
      }

      axios
          .post('http://localhost:8080/vacation/sendVacationResponsePharmacist/',
              {
                id: this.pharmacistVacations[index].id,
                name: this.pharmacistVacations[index].name,
                surname: this.pharmacistVacations[index].surname,
                vacationInterval: this.pharmacistVacations[index].vacationInterval,
                role: this.pharmacistVacations[index].role,
                approved: approved,
                reason: this.pharmacistReason[index]
              }).then(window.location.reload());
    }
  }
}
</script>