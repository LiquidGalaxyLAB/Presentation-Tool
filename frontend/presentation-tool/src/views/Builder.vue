<template>
  <div>
    <toolbar></toolbar>
    <v-container>
      <v-row justify="space-between" align="center" class="ma-0">
        <h1>Presentation Builder</h1>
        <v-row class="ma-0" justify="end">
          <v-btn dark text color="red" @click="discardPresentation()">
            Discard
            <v-icon right>mdi-close</v-icon>
          </v-btn>
          <v-btn dark color="green" @click="savePresentation()">
            Save Presentation
            <v-icon right>mdi-content-save</v-icon>
          </v-btn>
        </v-row>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" sm="6" xs="12">
          <v-card width="100%">
            <basic-info-form></basic-info-form>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" sm="6" xs="12">
          <v-card width="100%" height="100%" min-height="500">
            <slide-builder></slide-builder>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Toolbar from "@/components/atoms/Toolbar.vue";
import BasicInfoForm from "@/components/molecules/BasicInfoForm.vue";
import SlideBuilder from "@/components/organisms/SlideBuilder.vue";

export default {
  components: {
    Toolbar,
    BasicInfoForm,
    SlideBuilder
  },
  methods:{
    savePresentation(){
      this.$store.dispatch('savePresentation')
    },
    discardPresentation(){
      console.log('discard and clean the state of the store')
    }
  }
};
</script>