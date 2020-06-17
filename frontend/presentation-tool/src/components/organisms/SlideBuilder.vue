<template>
  <v-container>
    <div class="pb-12">
      <h1>Build the slides</h1>
      <v-divider></v-divider>
    </div>
    <v-stepper v-model="step" vertical>
      <div v-for="slideNumber in slidesQt" :key="slideNumber">
        <v-stepper-step editable :complete="step > slideNumber" :step="slideNumber">Slide {{slideNumber}}</v-stepper-step>
        <v-stepper-content :step="slideNumber">
          <screen-cards></screen-cards>
        </v-stepper-content>
        <v-divider vertical></v-divider>
      </div>
        <v-col cols=12>
          <v-row justify="space-between" class="pl-2">
        <v-btn color="red" text class="mr-4" @click="$router.push('/')">Cancel</v-btn>
        <v-btn  color="green" class="mr-4" dark @click="save()">Save and continue</v-btn>
         </v-row>
        </v-col>
     
    </v-stepper>
  </v-container>
</template>

<script>
import ScreenCards from "@/components/molecules/ScreenCards.vue";

export default {
  data() {
    return {
      step: 0
    };
  },
  components: {
    ScreenCards
  },
  computed:{
    slidesQt(){
      return this.$store.state.builderStore.slidesQt
    }
  },
  method:{
    save(){
      
    }
  }
};
</script>