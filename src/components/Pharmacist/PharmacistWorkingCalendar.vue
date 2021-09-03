<template>
  <div>
    <b-jumbotron>
      <h4 class="text-dark">Working Calendar</h4>
      <br/>
      <b-calendar v-model="value" :date-info-fn="dateClass" @context="onContext"></b-calendar>
      <br/>
      <div>
        <button class="btn btn-info btn-sm" type="button" v-on:click="onSelect()">Select date</button>
      </div>
      <br/>
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <th >Pharmacy</th>
        <th >Patient</th>
        <th >Start</th>
        <th >End</th>
        <th >Price</th>
        </thead>
        <tbody v-for="(e, index) in examsSelected" v-bind:key="index">
        <tr>
          <td>{{ e.date | dateFormat()}}</td>
          <td>{{ e.start }}</td>
          <td>{{ e.end }}</td>
          <td>{{ e.price | toMoney()}}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </b-jumbotron>
  </div>

</template>

<script>
import moment from "moment";

export default {
  name: "PharmacistWorkingCalendar",
  data() {
    return {
      exams: [],
      value: null,
      monts1: [],
      context: null,
      examsSelected: [],
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + "pharmacistExam/all/")
        .then(response => {
          this.exams = response.data;
        })
  },
  methods: {
    dateDisabled(ymd, date) {
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6 || day === 13
    },
    dateClass(ymd, date) {
      const day = date.getDate()
      const month = date.getMonth()
      //console.log(this.value.date)
      for(var i of this.monts1){
        if(month === i.getMonth()) {
          if (day === i.getDate()) {
            return 'table-info'
          }
        }
      }
    },
    onSelect(){

    },
    onContext(ctx) {
      if(this.examsSelected.length!=0){
        this.examsSelected = []
      }
      this.context = ctx
      let dateSelected = new Date(ctx.selectedDate)
      for(var i of this.exams){
        let nowDate = new Date(i.date)
        if(dateSelected.getMonth() === nowDate.getMonth()){
          if(dateSelected.getDate() === nowDate.getDate()){
            this.examsSelected.push(i)
          }
        }
      }


    },
    onDeselect(date){
      let parsed = moment(date)

      return parsed.format('DD.MM.YYYY');
    },

  },
  filters: {
    dateFormat: function (value) {
      let parsed = moment(value);
      return parsed.format('DD.MM.YYYY');
    },
    toMoney: function (value) {
      return (Math.round(value * 100) / 100).toFixed(2) + '$';
    }
  }
}
</script>

<style scoped>
#search-name-button {
  margin: 5px;
}

.jumbotron {
  margin: 2%;
}

.display-4 {
  margin-bottom: 0.5em;
}

tr.hide-table-padding td {
  padding: 0;
}

.expand-button {
  position: relative;
}

.accordion-toggle .expand-button:after {
  position: absolute;
  left: .75rem;
  top: 50%;
  transform: translate(0, -50%);
  content: '-';
}

.accordion-toggle.collapsed .expand-button:after {
  content: '+';
}
</style>