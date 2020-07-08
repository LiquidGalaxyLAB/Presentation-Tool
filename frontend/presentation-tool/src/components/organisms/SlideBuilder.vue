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
      <slide-creator v-model="newSlide"></slide-creator>
    </div>
  </div>
</template>

<script>
import SlideCreator from "@/components/molecules/SlideCreator.vue";

export default {
  data() {
    return {
      newSlide: false,
      itemPerPage: 10,
      headers: [
        { text: "Duration", value: "duration", sortable: false },
        { text: "Actions", value: "actions", align: "end", sortable: false }
      ]
    };
  },
  computed: {
    slides() {
      return this.$store.getters.slides;
    }
  },
  methods: {
    createNewSlide(){
      this.newSlide = true
      this.$store.commit('setCurrentSlideID',this.createID())
    },
    editSlide(slide) {
      console.log("edit", slide);
    },
    previewSlide(slide) {
      console.log("preview", slide);
    },
    deleteSlide(slide,index) {
      this.$store.dispatch('deleteSlide',{slide: slide, index:index})
    },
    createID() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      )
      return uuid;
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