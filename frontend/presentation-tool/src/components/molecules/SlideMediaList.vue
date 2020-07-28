<template>
  <v-card flat>
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
        <v-btn dark color="blue darken-2" @click="imageForm = true; currentMedia = null">
          Image
          <v-icon right>mdi-image</v-icon>
        </v-btn>
        <v-btn dark color="teal lighten-1" @click="videoForm = true;currentMedia = null">
          Video
          <v-icon right>mdi-video</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-row>
    <div class="pa-4">
    <v-data-table :headers="headers" :items="slide.media" :items-per-page="itemPerPage">
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
    <div v-if="imageForm">
      <v-dialog v-model="imageForm" width="80%">
        <image-form v-model="imageForm" :slideID="slide.id" :currentMedia="currentMedia"></image-form>
      </v-dialog>
    </div>
    <div v-else-if="videoForm">
      <v-dialog v-model="videoForm" width="80%">
        <video-form v-model="videoForm" :slideID="slide.id" :currentMedia="currentMedia"></video-form>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import ImageForm from "@/components/molecules/ImageForm.vue";
import VideoForm from "@/components/molecules/VideoForm.vue";

export default {
  props: ["slide"],
  components: {
    ImageForm,
    VideoForm
  },
  computed: {
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
    editMedia(item){
      this.currentMedia = item
      if(this.currentMedia.type == 'image')
        this.imageForm = true
      else
        this.videoForm = true
    },
    deleteMedia(item){
      this.$store.dispatch('deleteMedia',{slideID:this.slide.id, media: item})
    }
  },
  data: () => ({
    itemPerPage: 5,
    textForm: false,
    imageForm: false,
    videoForm: false,
    currentMedia: null,
    fab: false,
    headers: [
      { text: "Filename", value: "filename", sortable: false },
      { text: "Type", value: "type", sortable: false },
      { text: "Screen", value: "screen", sortable: false },
      { text: "Position", value: "position", sortable: false },
      { text: "Sharing", value: "sharing", sortable: false },
      { text: "Partner", value: "partner", sortable: false },
      { text: "Actions", value: "actions", align: "end", sortable: false }
    ]
  })
};
</script>