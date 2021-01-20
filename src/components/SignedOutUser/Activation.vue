<template>
<div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Activation",
  mounted() {
    axios.put('http://localhost:8080/activate/' + this.$route.query.code + '/' + this.$route.query.email)
  },
}

</script>

<style scoped>

</style>