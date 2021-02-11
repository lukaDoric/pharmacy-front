<template>
  <b-jumbotron class="bg-dark">
    <div class="row">
      <div class="col-lg-6">
        <select v-model="typeSelected" style="width: 80%;" selectedIndex="2" @change="getDropValues">
          <option v-for="t in type" v-bind:key="t">{{ t }}</option>
        </select></div>
      <div class="col-lg-6">
        <select v-model="subject" style="width: 80%;" v-bind:disabled="subject==null">
          <option v-for="s in subjects" v-bind:key="s.id" v-bind:value="s">{{ stringify(s) }}</option>
        </select>
      </div>
    </div>
    <br>
    <div class="row">
      <textarea rows="20" cols="350" v-model="complaintText" v-bind:disabled="subject==null"></textarea>
    </div>
    <br>
    <div>
      <button class="btn btn-info" v-on:click="submit" v-bind:disabled="subject==null">Submit</button>
    </div>
  </b-jumbotron>
</template>

<script>

export default {
  name: "MakeAComplaint",
  data() {
    return {
      type: ["Dermatologist", "Pharmacists", "Pharmacy"],
      typeSelected: "Dermatologist",
      subject: "",
      subjects: "",
      complaintText: "",
    }
  },
  methods: {
    getDropValues() {
      switch (this.typeSelected) {
        case "Dermatologist":
          this.$http.get(process.env.VUE_APP_BACKEND_URL + "complaints/dermatologists")
              .then(response => {
                this.subjects = response.data;
                if (this.subjects.length != 0) {
                  this.subject = response.data[0];
                } else {
                  this.subject = null;
                }
              });
          break;
        case "Pharmacists":
          this.$http.get(process.env.VUE_APP_BACKEND_URL + "complaints/pharmacists")
              .then(response => {
                this.subjects = response.data;
                if (this.subjects.length != 0) {
                  this.subject = response.data[0];
                } else {
                  this.subject = null;
                }
              });
          break;
        case "Pharmacy":
          this.$http.get(process.env.VUE_APP_BACKEND_URL + "complaints/pharmacies")
              .then(response => {
                this.subjects = response.data;
                if (this.subjects.length != 0) {
                  this.subject = response.data[0];
                } else {
                  this.subject = null;
                }
              });
      }
    },
    stringify(subject) {
      let str = subject.name;
      if ("surname" in subject) {
        str = str + " " + subject.surname;
      }
      return str;
    },
    submit() {

      let complaint;
      let subject = this.subject;
      if (this.typeSelected === "Pharmacy") {
        complaint = {"pharmacyId": subject.id, "subjectType": "PHARMACY", "complaintText": this.complaintText};
      } else {
        complaint = {
          "staffId": subject.id, "staffName": subject.nameInput,
          "staffSurname": subject.surname, "complaintText": this.complaintText
        };
        if (this.typeSelected === "Pharmacist") {
          complaint["subjectType"] = "DERMATOLOGIST";
        }
      }
      this.$http.post(process.env.VUE_APP_BACKEND_URL + "complaints/", complaint)
      .then(response=>{alert(response.data);})
          .catch(err=>alert(err.response.data))
    }
  },
  mounted() {
    if(this.$store.state.userType!=='Patient'){
      this.$router.push("/")
    }
    this.getDropValues();

  }
}
</script>

<style scoped>
b-jumbotron {
  margin: 30%;
}

textarea {
  margin: 4%;
}
</style>