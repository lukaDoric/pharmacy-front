<template>
 <div>
   <b-jumbotron class="jumbotron">
     <h2>Select start date and end day of vacation</h2>
     <div id="appointment">
       <input :min="today" v-model="startDate" type="date"/>
       <input :min="today" v-model="endDate" type="date"/>
       <button  type="button" class="btn btn-info btn-sm" v-on:click="createRequest">Create request</button>
     </div>
   </b-jumbotron>
 </div>
</template>

<script>
export default {
  name: "RequestVacation",
  data() {
    return {
      startDate: null,
      endDate: null,
      today: '01-01-1970'
    }
  },
  mounted() {
    this.setToday()
  },
  methods: {
    createRequest(){
      let vacationDTO = {
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$http.post(process.env.VUE_APP_BACKEND_URL + 'vacation/pharmacistVacationRequest/', vacationDTO)
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