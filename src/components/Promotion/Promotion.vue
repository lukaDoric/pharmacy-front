<template>
  <div>
    <b-jumbotron>
      <h3>Define new promotion.</h3>
      <b-form-textarea v-model="message" placeholder="Notify patients about promotion..."></b-form-textarea>
      <div class="form-group col-md-6">
        <label>From:</label>
        <b-form-input v-model="from" type="date"></b-form-input>
      </div>
      <div class="form-group col-md-6">
        <label>To:</label>
        <b-form-input v-model="to" type="date"></b-form-input>
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
      message: ''
    }
  },

  methods: {
    createPromotion() {

      this.$http
          .post('http://localhost:8080/promotion/', {
            from: this.from,
            to: this.to,
            notificationMessage: this.message
          })
    }
  }
}
</script>

<style scoped>
</style>