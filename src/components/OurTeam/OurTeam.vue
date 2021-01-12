<template>
  <div>
    <Dermatologists></Dermatologists>
    <Pharmacists></Pharmacists>
  </div>
</template>

<script>
import Pharmacists from "@/components/OurTeam/Pharmacists";
import Dermatologists from "@/components/OurTeam/Dermatologists";

export default {
  name: "OurTeam",
  components: {Dermatologists, Pharmacists}
}
</script>

<style scoped>

</style>