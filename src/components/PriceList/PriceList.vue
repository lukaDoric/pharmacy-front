<template>
  <div>
    <b-jumbotron>
      <div class="d-flex bd-highlight mb-3">
        <div class="p-2 bd-highlight"><h3 class="display-4">Add new price and validity period</h3></div>
        <div class="ml-auto p-2 bd-highlight">
          <button name="addOrder" type="button" @click="sendPrice" class="btn btn-success mt-3 mr-2">Create
          </button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>From:</label>
          <b-form-input :min="today" v-model="from" type="date"></b-form-input>
        </div>
        <div class="form-group col-md-6">
          <label>To:</label>
          <b-form-input :min="today" v-model="to" type="date"></b-form-input>
        </div>
        <div>
          <select id="dropdown-1" text="Medicine" class="m-md-2" @change="onMedicineSelect($event)">
            <option>Choose medicine</option>
            <option :value="medicine.id" v-for="(medicine, index) in medicines" :key="index">
              {{ medicine.name + ' - ' + medicine.form }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <b-form-input v-model="price" placeholder="Price in dollars..." type="number" required></b-form-input>
        </div>
      </div>
    </b-jumbotron>
    <div class="container my-4">
      <hr>
      <div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Medicine name</th>
            <th scope="col">Price</th>
            <th scope="col">Price Validity Period</th>
          </tr>
          </thead>
          <tbody v-for="(priceListItem, index) in  priceListItems" :key="index">
          <tr>
            <td>{{ priceListItem.medicineInfo.name }}</td>
            <td v-if="priceListItem.currentPrice !== 0">{{ priceListItem.currentPrice + '$' }}</td>
            <td v-else>Price is not currently defined!</td>
            <td v-if="priceListItem.currentPrice !== 0">{{
                priceListItem.startDate + '//' + priceListItem.endDate
              }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "PriceListItems",
  data() {
    return {
      priceListItems: [],
      from: '',
      to: '',
      price: '',
      medicines: [],
      id: '',
      today: new Date().toISOString().split('T')[0]
    }
  },

  mounted() {

    this.$http
        .get('http://localhost:8080/priceList/')
        .then(response => {
          this.priceListItems = response.data;

          this.priceListItems.forEach(priceListItem => {
            this.medicines.push(priceListItem.medicineInfo)
          })
        })
  },

  methods: {
    sendPrice() {

      this.$http.post('http://localhost:8080/priceList/',
          {
            'medicineId': this.id,
            'price': this.price,
            'from': this.from,
            'to': this.to
          }).then(response => {
        alert(response.data);
        window.location.reload()
      }).catch(err => {
        alert(err.response.data)
      });
    },

    onMedicineSelect(event) {
      this.id = event.target.value;
    }
  }
}
</script>

<style scoped>

</style>