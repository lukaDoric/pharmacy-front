<template>
  <div class="row">
    <div class="col-lg-5">
      <b-jumbotron>
        <table class="table table-hover table-dark">
          <thead>
          <tr>
            <th>Patient</th>
            <th>Complained subject</th>
            <th></th>
          </tr>
          </thead>
          <tbody v-for="c in complaints" v-bind:key="c.id">
          <tr>
            <td>{{ c.patientName }} {{ c.patientSurname }}</td>
            <td>{{ subjectString(c) }}</td>
            <td>
              <button class="btn btn-info" v-on:click="complaint=c">Select</button>
            </td>
          </tr>
          </tbody>
        </table>
      </b-jumbotron>
    </div>

    <div class="col-lg-6">
      <b-jumbotron v-if="complaint!=null">
        <h3>Complaint by {{ complaint.patientName }} {{ complaint.patientSurname }} about
          {{ subjectString(complaint) }}</h3>
        <br>
        <div class="card">
          <p style="float:left;">{{ complaint.complaintText }}</p>
        </div>
        <br>
        <div v-if="loading" class="spinner"></div>
        <div>
          <h3>Write your answer</h3>
          <br>
          <textarea rows="20" style="width: 90%" v-model="answerText"></textarea>
        </div>
        <br>
        <div>
          <button class="btn btn-info" v-on:click="resolveComplaint">Submit</button>
        </div>
      </b-jumbotron>
    </div>

  </div>
</template>

<script>
export default {
  name: "ResolveAComplaint",
  data() {
    return {
      complaints: [],
      complaint: null,
      answerText: "",
      loading: false,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.$store.state.userType !== 'SystemAdmin') {
        this.$router.push("/")
      }
      this.complaints = [];
      this.complaint = null;
      this.answerText = "";
      this.$http.get(process.env.VUE_APP_BACKEND_URL + 'complaints/')
          .then(response => {
            this.complaints = response.data
          })
    },
    subjectString(complaint) {
      let str = complaint.subjectType.toLocaleLowerCase() + ": ";
      if (complaint.subjectType === 'PHARMACY') {
        str += complaint.pharmacyName + " ";
      } else {
        str += complaint.staffName + " " + complaint.staffSurname;
      }
      return str;
    },
    resolveComplaint() {
      this.loading = true;
      let answer = {"id": this.complaint.id, "answerText": this.answerText};
      this.$http.post(process.env.VUE_APP_BACKEND_URL + "complaints/answer", answer)
          .then(response => {
            alert(response.data);
            this.init();
            this.loading = false;
          })
          .catch(err => {
            alert(err.response.data);
            this.init();
            this.loading = false
          });
    }
  }
}
</script>

<style scoped>
@import '../css/Loader.css';
</style>