<template>
  <div>
    <PharmacyMap></PharmacyMap>
    <ContactInfo></ContactInfo>
  </div>
</template>

<script>
import ContactInfo from "@/components/Contact/ContactInfo";
import PharmacyMap from "@/components/Contact/PharmacyMap";

export default {
  name: "Contact",
  components: {PharmacyMap, ContactInfo}
}
</script>