<template>
  <div>
    <b-jumbotron>
      <h3>Define new promotion.</h3>
      <b-form-textarea v-model="message" placeholder="Notify patients about promotion..."></b-form-textarea>
      <div class="form-group col-md-6">
        <label>From:</label>
        <b-form-input :min="today" v-model="from" type="date"></b-form-input>
      </div>
      <div class="form-group col-md-6">
        <label>To:</label>
        <b-form-input :min="today" v-model="to" type="date"></b-form-input>
      </div>
      <div class="form-group col-md-6">
        <label>Enter discount in percentage for medicines:</label>
        <b-form-input v-model="discount" type="number"></b-form-input>
      </div>
      <button type="button" @click="createPromotion" class="btn btn-success">Send notification about new promotion.
      </button>
    </b-jumbotron>
  </div>
</template>

<script>

export default {
  name: "Promotion",
  data() {
    return {
      from: '',
      to: '',
      message: '',
      discount: '',
      today: new Date().toISOString().split('T')[0]
    }
  },

  mounted() {
    if (this.$store.state.userType !== 'PharmacyAdmin') {
      this.$router.push("/")
    }
  },

  methods: {
    createPromotion() {
      if (this.discount === '' || this.message === '' || this.to === '' || this.from === '') {
        alert("Please input all fields!")
        return;
      }

      if (this.discount > 100 || this.discount <= 0) {
        alert("Discount cannot be lower than 0 or greater than 100!")
        return;
      }

      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'promotion/', {
            from: this.from,
            to: this.to,
            notificationMessage: this.message,
            discount: this.discount
          }).then(response => {
        alert(response.data);
      }).catch(err => {
        alert(err.response.data)
      });
    },
  }
}
</script>

<style scoped>
</style>