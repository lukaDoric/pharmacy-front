<template>
  <div class="row">
    <b-jumbotron>

      <div style="height: 300px" class="card bg-secondary">
        <div style=" background: #2c3e50;color: white" class="card-header">
          <h2>UPLOAD QR-CODE</h2>
        </div>
        <img v-bind:class="{hidden:imageSrc=='' }" class="rounded"
             style="width: 150px; height: 150px; float: top;background: #2c3e50" v-bind:src="imageSrc" alt="...">
        <input id="fileInput" value="" style="background: #2c3e50;color: white; float:bottom;" type="file"
               @input="scanCode">
      </div>

    </b-jumbotron>
    <div v-if="loading" class="spinner"></div>
    <div class="col-lg-7 panel" v-bind:class="{hidden:imageSrc=='' }">

      <h3>Pharmacies</h3>
      <table class="table table-dark table-hover">
        <thead>
        <tr>
          <th>Name
            <button style="background: 0, 0, 0, 0 " v-on:click="sortByName">▼</button>
          </th>
          <th>Address

            <button style="background: 0, 0, 0, 0 " v-on:click="sortByAddress">▼</button>
          </th>
          <th>Rating
            <button style="background: 0, 0, 0, 0 " v-on:click="sortByRating">▼</button>
          </th>
          <th>Summed up price
            <button style="background: 0, 0, 0, 0 " v-on:click="sortByPrice">▼</button>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="p in pharmacies" v-bind:key="p.pharmacyId">
          <td>{{ p.pharmacyName }}</td>
          <td>{{ p.address }}</td>
          <td>{{ p.pharmacyRating }}</td>
          <td>{{ p.bill }}€</td>
          <td>
            <button class="btn btn-info" v-on:click="buy(p)">Buy</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import QrcodeDecoder from 'qrcode-decoder';

export default {
  name: "QR",
  data() {
    return {
      qrQuery: null,
      medicineList: null,
      imageSrc: "",
      pharmacies: [],
      pharmaciesOriginal: [],
      loading: false
    }
  },
  mounted() {
    if (this.$store.state.userType !== 'Patient') {
      this.$router.push("/")
    }
  },
  methods: {
    async scanCode(e) {

      this.imageSrc = '';
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.resetData();
        return;
      }
      let image = new Image();
      image.src = URL.createObjectURL(files[0])
      this.imageSrc = image.src
      let qr = new QrcodeDecoder();

      const code = await qr.decodeFromImage(
          image.src,
      );
      if (code === false) {
        this.resetData();
        alert("Sorry, we couldn't read provided QR code.")
        return;
      }
      this.generateJson(code.data)
    },
    generateJson(text) {
      try {
        let json = JSON.parse(text);
        this.getPharmacies(json);
      } catch (e) {
        this.resetData();
        alert("Sorry we couldn't parse your prescription.")
      }
    },
    getPharmacies(prescription) {
      this.$http.post(process.env.VUE_APP_BACKEND_URL + "qr/pharmacies", prescription)
          .then(response => {
            this.pharmacies = response.data;
            this.pharmaciesOriginal = response.data;
          })
          .catch(err => {
            if (err.response.status == 400) {
              alert("You sent qr code with bad information!")
            } else if (err.response.status == 404) {
              alert("Sorry, medicine you need is out of stock!")
            } else {
              alert("Sorry, something went wrong!")
            }
            this.resetData();
          });
    },
    resetData() {
      this.pharmacies = [];
      this.pharmaciesOriginal = [];
      this.imageSrc = '';
      document.getElementById("fileInput").value = '';
    },
    buy(pharmacy) {
      this.loading = true;
      this.$http.post(process.env.VUE_APP_BACKEND_URL + "qr/buy", pharmacy)
          .then(response => {
            alert(response.data);
            this.resetData();
            this.loading = false;
          })
          .catch(err => {
            alert(err.response.data)
            this.loading = false;
            this.resetData();
          })


    },
    sortByName() {
      this.pharmacies.sort((a, b) => (a.pharmacyName > b.pharmacyName) ? 1 : -1);
    },
    sortByAddress() {
      this.pharmacies.sort((a, b) => (a.address > b.address) ? 1 : -1);
    },
    sortByPrice() {
      this.pharmacies.sort((a, b) => (a.bill > b.bill) ? 1 : -1);
    },
    sortByRating() {
      this.pharmacies.sort((a, b) => (a.pharmacyRating > b.pharmacyRating) ? 1 : -1);
    },
  }
}
</script>

<style scoped>
@import '../css/Loader.css';

.panel {
  margin: 2%;
}

.hidden {
  visibility: hidden;
}
</style>