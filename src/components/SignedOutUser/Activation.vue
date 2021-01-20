<template>
  <div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Activation",
  mounted() {
    let email = this.$route.query.email.replace(/ /g, "+");
    let code = this.$route.query.code;
    axios.post('http://localhost:8080/register/activate',
        {
          'code': code,
          'email': email
        })
        .then(response => {
          this.redirectURL = response.data;
          window.location.href = this.redirectURL;
        })
        .catch(err => window.location.href = err.response.data);
  },
}

</script>

<style scoped>

</style>