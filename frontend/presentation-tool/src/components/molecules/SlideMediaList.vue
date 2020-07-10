<template>
  <v-card flat>
    <v-row justify="center" class="ma-0 pb-4">
      <h2>Liquid Galaxy Screens</h2>
    </v-row>
    <v-row justify="center" class="ma-0 pb-4">
      <v-card-text>Choose a screen to add media</v-card-text>
    </v-row>
    <v-tabs center-active background-color="teal darken-1" dark class="pl-4 pr-4" show-arrows>
      <v-row justify="center">
        <v-tab v-for="(screen) in maxScreens" :key="screen" @click="changeCurrentScreen(screen)">{{screen}}</v-tab>
      </v-row>
    </v-tabs>
    <v-row justify="space-between" class="pl-8 pr-8 pt-8">
      <v-card-title class="pa-0">Medias</v-card-title>
      <v-speed-dial v-model="fab" direction="bottom" transition="slide-y-reverse-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="purple" dark>
            <div v-if="fab">
              <v-icon>mdi-close</v-icon>
            </div>
            <div v-else>
              <v-row align="center" class="pl-2 pr-2">
                Add
                <v-icon>mdi-plus</v-icon>
              </v-row>
            </div>
          </v-btn>
        </template>
        <v-btn dark color="blue darken-2" @click="imageForm = true">
          Image
          <v-icon right>mdi-image</v-icon>
        </v-btn>
        <v-btn dark color="teal lighten-1" @click="videoForm = true">
          Video
          <v-icon right>mdi-video</v-icon>
        </v-btn>
        <v-btn dark color="deep-purple lighten-3" @click="textForm = true">
          Text
          <v-icon right>mdi-format-text</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-row>
    <div class="pa-4">
      <v-data-table :headers="headers" :items="media" :items-per-page="itemPerPage">
        <template v-slot:item.actions="{ item }">
          <v-row justify="start">
            <v-btn small icon @click="editMedia(item)">
              <v-icon color="black">mdi-pencil</v-icon>
            </v-btn>
            <v-btn small icon @click="deleteMedia(item)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </div>
{{$store.getters.currentScreenMedia.media}}
    <div v-if="textForm">
      <v-dialog v-model="textForm">
        <text-form v-model="textForm"></text-form>
      </v-dialog>
    </div>
    <div v-else-if="imageForm">
      <v-dialog v-model="imageForm" width="80%">
        <image-form v-model="imageForm"></image-form>
      </v-dialog>
    </div>
    <div v-else-if="videoForm">
      <v-dialog v-model="videoForm">
        <video-form v-model="videoForm"></video-form>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import TextForm from "@/components/molecules/TextForm.vue";
import ImageForm from "@/components/molecules/ImageForm.vue";
import VideoForm from "@/components/molecules/VideoForm.vue";

export default {
  props: ["value"],
  components: {
    TextForm,
    ImageForm,
    VideoForm
  },
  computed: {
     media() {
      return this.$store.getters.currentScreenMedia.media;
    },
    maxScreens() {
      let max = this.$store.state.builderStore.presentation.maxscreens;
      let arrayOfStrings = [];
      for (var i = 1; i <= max; i++) {
        arrayOfStrings.push(`${i}`);
      }
      return arrayOfStrings;
    }
  },
  methods:{
    changeCurrentScreen(screen){
      this.$store.commit('setScreenNumber',screen)
    }
  },
  data: () => ({
    itemPerPage: 5,
    textForm: false,
    imageForm: false,
    videoForm: false,
    fab: false,
    headers: [
      { text: "Filename", value: "filename", sortable: false },
      { text: "Type", value: "type", sortable: false },
      { text: "Position", value: "position", sortable: false },
      { text: "Sharing", value: "sharing", sortable: false },
      { text: "Partner", value: "partner", sortable: false },
      { text: "", value: "actions", align: "end", sortable: false }
    ]
  })
};
</script>