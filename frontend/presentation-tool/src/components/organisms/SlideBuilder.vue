<template>
  <v-container>
    <div class="pb-12">
      <h1>Build the slides</h1>
      <v-divider></v-divider>
    </div>
    <v-stepper v-model="e6" vertical>
      <div v-for="n in 5" :key="n">
        <v-stepper-step editable :complete="e6 > n" :step="n">Slide {{n}}</v-stepper-step>

        <v-stepper-content :step="n">
          <screen-cards></screen-cards>
        </v-stepper-content>
        <v-divider vertical></v-divider>
      </div>
        <v-col cols=12>
          <v-row justify="space-between" class="pl-2">
        <v-btn color="red" text class="mr-4" @click="$router.push('/')">Cancel</v-btn>
        <v-btn  color="blue" class="mr-4" dark @click="save()">Save and continue</v-btn>
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
      e6: 1
    };
  },
  components: {
    ScreenCards
  },
  method:{
    save(){
      
    }
  }
};
</script>