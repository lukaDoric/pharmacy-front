<template>
  <div class="card">
    <div class="card-header bg-dark">
      <h1>Loyalty program</h1>
    </div>
    <div class="card-body bg-dark">
      <table class="table" style="color: white">
        <thead class="bg-dark">
        <tr>
          <td style="width: 25%">
          </td>
          <td style="width: 50%">
            <h3 v-if="!firstProgram">Change values</h3>
            <h3 v-if="firstProgram">Add new loyalty program</h3>
          </td>
          <td style="width: 25%">
            <h3>Old values</h3>
          </td>
        </tr>
        </thead>
        <tbody class="bg-dark">
        <tr>
          <td>
            <label class="form-label" for="examPoints">Points given for exams and consultations</label>
          </td>
          <td>
            <input v-model="examPoints" type="number" min="0" id="examPoints" class="form-control"
                   placeholder="Enter points"/>
          </td>
          <td>
            {{ oldExamPoints }}%
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label" for="form1Example2">Minimum points for silver user status</label>
          </td>
          <td>
            <input v-model="silverMinimumPoints" type="number" min="1" id="form1Example2" class="form-control"
                   placeholder="Enter points"/>
          </td>
          <td>
            {{ oldSilverMinimumPoints }}%
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label" for="form1Example3">Minimum points for gold user status</label>
          </td>
          <td>
            <input v-model="goldMinimumPoints" type="number" min="2" id="form1Example3" class="form-control"
                   placeholder="Enter points"/>
          </td>
          <td>
            {{ oldGoldMinimumPoints }}%
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label" for="form1Example4">Silver status discount</label>
          </td>
          <td>
            <input type="range" id="form1Example4" style="direction: rtl" step="0.05"
                   class="form-control form-control-range" min="0.5" max="1"
                   v-model="silverDiscount"/>
            {{ toReversePercentage(silverDiscount) }}%
          </td>
          <td>
            {{ toReversePercentage(oldSilverDiscount) }}%
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-label" for="form1Example5">Gold status discount</label>
          </td>
          <td>
            <input type="range" id="form1Example5" style="direction: rtl" step="0.05" class="form-control" min="0.5"
                   max="1" v-model="goldDiscount"/>
            {{ toReversePercentage(goldDiscount) }}%
          </td>
          <td>
            {{ toReversePercentage(oldGoldDiscount) }}%
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer bg-dark">
      <button class="btn btn-success" v-on:click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoyaltyProgram",
  data() {
    return {
      examPoints: 0,
      silverMinimumPoints: 1,
      silverDiscount: 1,
      goldMinimumPoints: 2,
      goldDiscount: 1,
      firstProgram: false,
      oldExamPoints: 0,
      oldSilverMinimumPoints: 0,
      oldSilverDiscount: 0,
      oldGoldMinimumPoints: 0,
      oldGoldDiscount: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if(this.$store.state.userType!=='SystemAdmin'){
        this.$router.push("/")
      }
      this.$http.get("http://localhost:8080/loyalty/")
          .then(response => {
            this.assignOldData(response.data)
          })
          .catch(err => {
            console.log(err.response.data);
            alert("Sorry, an error occurred.")
          });
    },
    submit() {
      let program = {
        'silverMinimumPoints': this.silverMinimumPoints,
        'silverDiscount': this.silverDiscount,
        'goldMinimumPoints': this.goldMinimumPoints,
        'goldDiscount': this.goldDiscount,
        'examPoints': this.examPoints,
      };
      this.$http.post("http://localhost:8080/loyalty/", program)
          .then(response => {
            alert(response.data);
            this.init()
          })
          .catch(err => {
            alert(err.response.data)
          });
    },
    assignOldData(data) {
      if (data === '') {
        this.firstProgram = true
      } else {
        this.firstProgram = false;
        this.oldGoldDiscount = data.goldDiscount;
        this.oldGoldMinimumPoints = data.goldMinimumPoints;
        this.oldSilverDiscount = data.silverDiscount;
        this.oldSilverMinimumPoints = data.silverMinimumPoints;
        this.oldExamPoints = data.examPoints;
      }
    },
    toReversePercentage(num) {
      return Math.round(100 - (num * 100))
    }
  },
  computed: {}
}
</script>

<style scoped>
.card {
  color: white;
  background-color: dimgray;
  margin: 1% 25%;
}

.card-body {
  margin: 3%;
}

.card-footer {
  margin: 3%;
}
</style>