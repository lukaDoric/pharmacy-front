<template>
  <div>
    <b-jumbotron>
      <h2>Dermatologist details</h2>
      <form>
        <div class="form-group row">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="name"
                   :value="shiftIntervals.dermatologist.name">
          </div>
        </div>
        <div class="form-group row">
          <label for="surname" class="col-sm-2 col-form-label">Surname</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="surname"
                   :value="shiftIntervals.dermatologist.surname">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="email"
                   :value="shiftIntervals.dermatologist.email">
          </div>
        </div>

        <h2>Schedule</h2>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Monday</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="monday"
                   :value="shiftIntervals.hourIntervals[0]">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Tuesday</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="tuesday"
                   :value="shiftIntervals.hourIntervals[1]">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Wednesday</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="wednesday"
                   :value="shiftIntervals.hourIntervals[2]">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Thursday</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="thursday"
                   :value="shiftIntervals.hourIntervals[3]">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Friday</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="friday"
                   :value="shiftIntervals.hourIntervals[4]">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Saturday</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="saturday"
                   :value="shiftIntervals.hourIntervals[5]">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-2 col-form-label">Sunday</label>
          <div class="col-sm-10">
            <input type="text" readonly class="form-control-plaintext" id="sunday"
                   :value="shiftIntervals.hourIntervals[6]">
          </div>
        </div>
      </form>
      <div>
        <h3>Create new appointment</h3>
        <div id="appointment" class="d-flex justify-content-center">
          <input :min="today" v-model="startDate" type="date"/>
          <input v-model="startTime" type="time"/>
          <input v-model="durationTime" type="number" placeholder="Duration..."/>
          <input v-model="price" type="number" placeholder="Price in dollars..."/>
          <button type="button" class="btn btn-success" @click="createExam">Create new appointment</button>
        </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "DermatologistDetails",

  watch: {
    '$route'(to) {
      this.dermatologistId = to.params.id;
    }
  },

  data() {
    return {
      dermatologistId: '',
      shiftIntervals: {dermatologist: '', hourIntervals: []},
      startDate: '',
      startTime: '',
      durationTime: '',
      price: '',
      today: new Date().toISOString().split('T')[0]
    }
  },

  mounted() {
    this.dermatologistId = this.$route.params.id;
    this.$http.get(process.env.VUE_APP_BACKEND_URL + 'dermatologist/shiftIntervals/' + this.dermatologistId)
        .then(response => {
          this.shiftIntervals = response.data;
        })
  },

  methods: {
    createExam() {

      if (this.startDate === '') {
        alert("Please input all fields!")
        return;
      }

      if (this.startTime === '') {
        alert("Please input all fields!")
        return;
      }

      if (this.durationTime === '') {
        alert("Please input all fields!")
        return;
      }

      if (this.price === '') {
        alert("Please input all fields!")
        return;
      }

      let startDate = new Date(this.startDate + 'T' + this.startTime)
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'exam/', {
        dermatologistId: this.dermatologistId,
        examStart: startDate,
        duration: this.durationTime,
        price: this.price
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

<style scoped>
#appointment {
  margin-top: 5%;
}
</style>