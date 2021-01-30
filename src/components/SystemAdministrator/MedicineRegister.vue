<template>
  <div class="row">
    <div class="col-lg-9 block">
      <table class="table table-dark table-hover table-bordered">
        <thead>
        <tr>
          <th>Name</th>
          <th>Uuid</th>
          <th>Description</th>
          <th>Composition</th>
          <th>Alternatives</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="p in medicines" v-bind:key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.uuid }}</td>
          <td>{{ p.description }}</td>
          <td>{{ p.composition }}</td>
          <td>{{ formatAlternatives(p.alternatives) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-lg-3 block">
      <div class="card">
        <div class="card-header bg-dark">
          <h1>Add new medicine</h1>
        </div>
        <div class="card-body bg-dark">
          <div class="form-outline mb-4">
            <input v-model="uuid" type="text" id="idInput" class="form-control"
                   placeholder="Enter medicine ID"/>
            <label class="form-label" for="idInput">ID</label>
          </div>
          <div class="form-outline mb-4">
            <input v-model="name" type="text" id="nameInput" class="form-control"
                   placeholder="Enter medicine name"/>
            <label class="form-label" for="nameInput">Name</label>
          </div>
          <div class="form-outline mb-4">
            <select v-model="type" id="typeInput">
              <option v-for="t in enumTypeDict" v-bind:key="t" class="dropdown-item">{{ t }}</option>
            </select>
            <label class="form-label" for="typeInput">Type</label>
          </div>
          <div class="form-outline mb-4">
            <select v-model="alternatives" id="alternativesInput">
              <option value="None" selected>None</option>
              <option v-for="alt in alternativeGroups" v-bind:value="alt" v-bind:key="alt[0].uuid"
                      class="dropdown-item">{{ formatAlternatives(alt) }}
              </option>
            </select>
            <label class="form-label" for="alternativesInput">Alternatives</label>
          </div>
          <div class="form-outline mb-4">
            <textarea v-model="sideEffects" type="text" id="sideEffectsInput" class="form-control"
                      placeholder="Enter side effects."/>
            <label class="form-label" for="sideEffectsInput">Side effects</label>
          </div>
          <div class="form-outline mb-4">
            <textarea v-model="composition" id="compositionInput" class="form-control" placeholder="Enter composition"/>
            <label class="form-label" for="compositionInput">Composition</label>
          </div>
          <div class="form-outline mb-4">
            <textarea v-model="description" id="descriptionInput" class="form-control" placeholder="Enter description"/>
            <label class="form-label" for="descriptionInput">Description</label>
          </div>
          <div class="form-outline mb-4">
            <input type="text" v-model="recommendedDose" id="doseInput" class="form-control"
                   placeholder="Enter daily dose"/>
            <label class="form-label" for="doseInput">Daily dose</label>
          </div>
          <hr style="background-color: white">
          <div class="form-outline mb-4">
            <div class="row">
              <div class="col-lg-6">
                <label class="form-label" style="float: top" for="prescribedInput">Prescribed</label>
              </div>
              <div class="col-lg-6">
                <input type="checkbox" v-model="prescribed" id="prescribedInput" class="form-check-input-lg"/>
              </div>
            </div>
          </div>
          <hr style="background-color: white">
          <div class="form-outline mb-4">
            <label for="customRange1" class="form-label"><h4>Points: {{points}}</h4></label><br>
            <input v-model="points" type="range" min="0" max="5" class="form-range slider" id="customRange1">
          </div>
          <button class="btn btn-primary btn-block" @click="registerMedicine">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MedicineRegister",
  data() {
    return {
      medicines: null,
      name: "",
      uuid: "",
      points:0,
      alternatives: "None",
      type: "Human medicament",
      enumTypeDict: {
        'HUMAN': "Human medicament",
        'HERBAL': "Herbal medicine",
        'BIOPHARMACEUTICAL': "Biopharmaceutical",
        'RADIOPHARMACEUTICAL': "Radiopharmaceutical",
        'HOMEOPATHIC': "Homeopathic remedy"
      },
      alternativeGroups: "",
      sideEffects: "",
      composition: "",
      recommendedDose: "",
      description: "",
      prescribed: false,
    }
  },
  mounted() {
    this.getAllMedicine();
  },
  methods: {
    registerMedicine() {
      if(this.uuid=="" || this.name==""){
        alert("Id and name must be filled.")
        return ;
      }
      const reverseMapping = o => Object.keys(o).reduce((r, k) =>
          Object.assign(r, {[o[k]]: (r[o[k]] || []).concat(k)}), {})
      let medicine = {
        'name': this.name,
        'uuid': this.uuid,
        'type': reverseMapping(this.enumTypeDict)[this.type][0],

        'sideEffects': this.sideEffects,
        'composition': this.composition,
        'recommendedDose': this.recommendedDose,
        'description': this.description,
        'prescribed': this.prescribed,
        'points':this.points
      }
      if (this.alternatives !== "None") {
        medicine['alternatives'] = this.alternatives;
      }

      this.$http.post('http://localhost:8080/medicine/save', medicine)
          .then(response => {
            alert(response.data);
            this.getAllMedicine()
          })
          .catch(err => alert(err.response.data));
    },
    getAllMedicine() {
      this.$http.get('http://localhost:8080/medicine/get/all').then(response => {
        this.medicines = response.data
      }).catch(e => alert("Oops, sorry there has been an error: " + e.toString()));
      this.$http.get('http://localhost:8080/medicine/get/alternativeGroups').then(response => {
        this.alternativeGroups = response.data;
        this.alternatives = "None"
      }).catch(e => alert("Oops, sorry there has been an error: " + e.toString()));
    },
    formatAlternatives(alternatives) {
      let alternativesString = "";
      alternatives.forEach(alternative =>
          alternativesString = alternativesString + alternative.name + " " + alternative.uuid + ", \n"
      );

      return alternativesString.slice(0, -3);
    },

  },

}
</script>

<style scoped>
.card {
  color: white;
  background-color: dimgray;
}

.block {
  padding: 0 1%;
}

.slider{
  width: 90%;
}

.card-body {
  margin: 3%;
}

select {
  width: 100%
}
</style>