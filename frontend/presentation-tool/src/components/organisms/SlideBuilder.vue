<template>
  <div>
    <div class="pa-3">
      <h2>Slide creator</h2>
      <v-divider></v-divider>
    </div>
    <div class="pl-6 pr-6" v-if="slides.length >= 1">
      <div v-if="!newSlide">
        <v-row align="center" justify="space-between" class="ma-2">
          <v-card-title class="pa-0">Slides</v-card-title>
          <v-btn dark color="blue" @click="createNewSlide()">
            New slide
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-col v-for="(slide,index) in slides" :key="index" cols="12" md="4">
            <v-card height="100%">
              <v-card-title>Slide {{index+1}}</v-card-title>
              <v-card-subtitle>Duration: {{slide.duration.minutes}}min : {{slide.duration.seconds}}s</v-card-subtitle>
              <v-card-actions>
                <v-spacer/>
                <v-btn small icon @click="previewSlide(slide,index)">
                  <v-icon color="black">mdi-eye</v-icon>
                </v-btn>
                <v-btn small icon @click="editSlide(slide,index)">
                  <v-icon color="black">mdi-pencil</v-icon>
                </v-btn>
                <v-btn small icon @click="deleteSlide(slide,index)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-card class="center-button" @click="createNewSlide()" flat v-else>
      <v-row justify="center">
        <v-card-title class="pb-0">New slide</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-img src="@/assets/addMedia.png"></v-img>
        </v-col>
      </v-row>
    </v-card>
    <div v-if="newSlide">
      <slide-creator v-model="newSlide" :currentslide="currentSlide"></slide-creator>
    </div>
    <v-dialog v-model="isNotCompleted" width="50%">
      <v-card class="pa-6">
        <v-row justify="center" class="ma-0">
          <h2 style="color:red;text-align:center;">Complete with required basic information before proceding to slide creation</h2>
        </v-row>
        <v-row justify="center" class="ma-0 pt-8">
          <v-btn color="blue" dark @click="isNotCompleted = false">Ok</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SlideCreator from "@/components/molecules/SlideCreator.vue";

export default {
  data() {
    return {
      newSlide: false,
      isNotCompleted: false,
      currentSlide: null
    };
  },
  computed: {
    slides() {
      return this.$store.state.builderStore.presentation.slides;
    }
  },
  methods: {
    createNewSlide(){
      if(this.$store.state.builderStore.presentation.title == ""){
        this.isNotCompleted = true
      }
      else{
        this.isNotCompleted = false
        this.newSlide = true
        this.currentSlide = null
      }
    },
    editSlide(slide) {
      this.currentSlide = slide
      this.newSlide = true
    },
    previewSlide(slide) {
      console.log("preview", slide);
    },
    deleteSlide(slide) {
      this.$store.dispatch('deleteSlide',slide)
    },
  },
  components: {
    SlideCreator
  }
};
</script>

<style>
.center-button {
  background-color: lightcoral;
  width: 30%;
  height: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>