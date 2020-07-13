<template>
  <div class="pa-4">
    <div class="pa-3">
      <h2>Slide preview</h2>
      <v-divider></v-divider>
    </div>
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
      <v-data-table :headers="headers" :items="slide.media"></v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["slide"]
};
</script>