<template>
  <v-card flat>
    <v-row justify="space-between" class="pl-8 pr-8">
      <v-card-title class="pa-0">Medias</v-card-title>
      <v-speed-dial v-model="fab" direction="bottom" transition="slide-y-reverse-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue" dark>
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

    <div v-if="textForm">
      <v-dialog v-model="textForm">
        <text-form></text-form>
      </v-dialog>
    </div>
    <div v-else-if="imageForm">
      <v-dialog v-model="imageForm">
        <image-form></image-form>
      </v-dialog>
    </div>
    <div v-else-if="videoForm">
      <v-dialog v-model="videoForm">
        <video-form></video-form>
      </v-dialog>
    </div>

  </v-card>
</template>

<script>
import TextForm from "@/components/molecules/TextForm.vue"
import ImageForm from "@/components/molecules/ImageForm.vue"
import VideoForm from "@/components/molecules/VideoForm.vue"

export default {
  components:{
    TextForm,
    ImageForm,
    VideoForm
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
      { text: "Screen", value: "screen", sortable: false },
      { text: "Position", value: "position", sortable: false },
      { text: "Sharing", value: "sharing", sortable: false },
      { text: "Partner", value: "partner", sortable: false },
      { text: "", value: "actions", align: "end", sortable: false }
    ],
    media: [
      {
        filename: "hahahah",
        type: "image",
        screen: "5",
        position: "top",
        sharing: "false",
        partner: "-"
      },
      {
        filename: "hahahah",
        type: "image",
        screen: "5",
        position: "top",
        sharing: "false",
        partner: "-"
      },
      {
        filename: "hahahah",
        type: "image",
        screen: "5",
        position: "top",
        sharing: "false",
        partner: "-"
      },
      {
        filename: "hahahah",
        type: "image",
        screen: "5",
        position: "top",
        sharing: "false",
        partner: "-"
      }
    ]
  })
};
</script>