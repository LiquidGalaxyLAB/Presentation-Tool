<template>
  <v-card>
    <div class="pa-8">
      <h2>New Image</h2>
      <v-divider></v-divider>
    </div>
    <v-row class="pa-4 ma-0">
      <v-col cols="12" md="8">
        <v-file-input
          clearable
          accept="image/*"
          filled
          label="Image"
          hint="Give preference to images with high resolution"
          persistent-hint
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          label="Screen"
          filled
          hint="Choose a screen to put this image. NOTE: if you want to use sharing screen, choose the screen on the left"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="pa-4 ma-0" align="center">
      <v-col cols="12" md="6">
        <v-select
          label="Position"
          :items="positions"
          filled
          hint="Choose a position to place this media"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" class="pink">
        img will go here
      </v-col>
    </v-row>

    <v-row justify="space-between" class="ma-0 pb-8 pl-8 pr-8">
      <v-btn color="red" text @click="show = false">Cancel</v-btn>
      <v-btn dark color="green" @click="show = false">Save</v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      positions:[
        {text: 'Top', value:'top'},
        {text: 'Center', value:'center'},
        {text: 'Bottom', value:'bottom'},
        {text: 'Middle', value:'middle'},
        {text: 'Top & Sharing', value:'topsharing'},
        {text: 'Center & Sharing', value:'centersharing'},
        {text: 'Bottom & Sharing', value:'bottomsharing'},
        {text: 'Middle & Sharing', value:'middlesharing'},
      ]
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
