<template>
  <v-app>
    <overlay/>
    <router-view/>
  </v-app>
</template>
<script>
import Overlay from "@/components/atoms/Overlay.vue"

export default {
components:{
    Overlay
}  
}
</script>

