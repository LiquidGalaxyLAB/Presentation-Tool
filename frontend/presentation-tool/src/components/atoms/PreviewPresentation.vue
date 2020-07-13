<template>
  <div class="pa-4">
    <div class="pa-3">
      <h1>Review your work</h1>
      <v-divider></v-divider>
    </div>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="6">
        <v-subheader class="pl-0">TITLE</v-subheader>
        <h3>{{presentation.title}}</h3>
      </v-col>
      <v-col cols="12" md="6">
        <v-subheader class="pl-0">CATEGORY</v-subheader>
        <h3>{{presentation.category}}</h3>
      </v-col>
    </v-row>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="6">
        <v-subheader class="pl-0">DESCRIPTION</v-subheader>
        <h3>{{presentation.description}}</h3>
      </v-col>
      <v-col cols="12" md="6">
        <v-subheader class="pl-0">AUDIO</v-subheader>
        <h3>{{presentation.audiopath}}</h3>
      </v-col>
    </v-row>
    <div class="pa-3">
      <v-subheader class="pl-0">SLIDES</v-subheader>
    </div>
    <v-card outlined v-for="(slide,i) in presentation.slides" :key="i" class="mb-4">
      <v-card-title class="pl-3 pb-0">Slide {{i}}</v-card-title>
      <v-row class="ma-0" justify="center">
        <v-col cols="12" md="6">
          <v-subheader class="pl-0">DURATION</v-subheader>
          <h3>{{slide.duration.minutes}}min : {{slide.duration.seconds}}s</h3>
        </v-col>
        <v-col cols="12" md="6">
          <v-subheader class="pl-0">FLY TO</v-subheader>
          <h3>{{slide.flyto}}</h3>
        </v-col>
      </v-row>
      <v-row class="ma-0" justify="start">
        <v-col cols="12" md="6">
          <v-subheader class="pl-0">AUDIO</v-subheader>
          <h3>{{slide.audiopath}}</h3>
        </v-col>
      </v-row>
      <div class="pa-3">
        <v-subheader class="pl-0">MEDIA TO BE DISPLAYED</v-subheader>
      </div>
      <div class="pl-4 pr-4">
      <v-data-table :headers="headers" :items="slide.media">
      </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Filename", value: "filename", sortable: false },
        { text: "Type", value: "type", sortable: false },
        { text: "Screen", value: "screen", sortable: false },
        { text: "Position", value: "position", sortable: false },
        { text: "Sharing", value: "sharing", sortable: false },
        { text: "Partner", value: "partner", sortable: false },
      ]
    };
  },
  computed:{
    presentation(){
        return this.$store.state.builderStore.presentation
    }
  }
};
</script>