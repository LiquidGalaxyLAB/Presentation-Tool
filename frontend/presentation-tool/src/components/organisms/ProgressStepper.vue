<template>
  <v-container>
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
          <basic-info-form v-model="e1"></basic-info-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <slide-builder></slide-builder>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div>finish</div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import BasicInfoForm from "@/components/molecules/BasicInfoForm.vue";
import SlideBuilder from "@/components/organisms/SlideBuilder.vue";

export default {
  components: {
    BasicInfoForm,
    SlideBuilder
  },
  data() {
    return {
      e1: "1"
    };
  }

};
</script>