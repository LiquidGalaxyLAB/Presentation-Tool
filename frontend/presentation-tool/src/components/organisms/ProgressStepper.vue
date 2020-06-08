<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step editable :complete="e1 > 1" step="1" color="pink">Basic Information</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step editable :complete="e1 > 2" step="2" color="pink">Build Slides</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step editable :complete="e1 > 3" step="3" color="pink">Finish</v-stepper-step>

    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <basic-info-form></basic-info-form>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
       <slide-builder></slide-builder>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

       <v-stepper-content step="3">
       <div>finish</div>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BasicInfoForm from '@/components/molecules/BasicInfoForm.vue'
import SlideBuilder from "@/components/molecules/SlideBuilder.vue"

  export default {
    components:{
        BasicInfoForm,
        SlideBuilder
    },
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>