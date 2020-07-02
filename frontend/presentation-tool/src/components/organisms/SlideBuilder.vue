<template>
  <div>
    <div class="pa-3">
      <h2>Slide creator</h2>
      <v-divider></v-divider>
    </div>
    <div class="pl-6 pr-6" v-if="slidesLength >= 1">
      <div v-if="!newSlide">
     <v-row align="center" justify="space-between">
         <v-card-title>Slides</v-card-title>
         <v-btn dark color="blue" @click="newSlide = true">
          New slide
          <v-icon right>mdi-plus</v-icon>
        </v-btn>
     </v-row>
        
      <v-data-table :headers="headers" :items="slides" :items-per-page="itemPerPage">
        <template v-slot:item.actions="{ item }">
          <v-row justify="end">
            <v-btn small icon @click="previewSlide(item)">
              <v-icon color="black">mdi-eye</v-icon>
            </v-btn>
            <v-btn small icon @click="editSlide(item)">
              <v-icon color="black">mdi-pencil</v-icon>
            </v-btn>
            <v-btn small icon @click="deleteSlide(item)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      </div>
      <div v-if="newSlide">
        <slide-creator v-model="newSlide"></slide-creator>
      </div>
    </div>
    <v-card class="center-button" @click="newSlide = true" flat v-else>
      <v-row justify="center">
        <v-card-title class="pb-0">New slide</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-img src="@/assets/addMedia.png"></v-img>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import SlideCreator from "@/components/molecules/SlideCreator.vue"

export default {
  data() {
    return {
      newSlide: false,
      itemPerPage: 10,
      headers: [
        { text: "Slide order", value: "order", sortable: false },
        { text: "Duration", value: "duration", sortable: false },
        { text: "Actions", value: "actions", align: "end", sortable: false }
      ],
      slides: [
        { order: "1", duration: "20 s" },
        { order: "1", duration: "20 s" },
        { order: "1", duration: "20 s" },
        { order: "1", duration: "20 s" },
        { order: "1", duration: "20 s" }
      ]
    };
  },
  computed: {
    slidesLength() {
      //return this.$store.getters.slidesLength
      return 2;
    },
  },
  methods:{
      editSlide(slide){
          console.log('edit',slide)
      },
      previewSlide(slide){
          console.log('preview',slide)
      },
      deleteSlide(slide){
          console.log('delete',slide)
      }
  },
  components:{
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