<template>
  <v-card>
    <div class="pa-8">
      <h2>New Image</h2>
      <v-divider></v-divider>
    </div>
    <v-row class="pa-4 ma-0">
      <v-col cols="12" md="8">
        <v-file-input
          v-model="media.file"
          clearable
          accept="image/*"
          filled
          label="Image"
          hint="Give preference to images with high resolution"
          persistent-hint
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="media.screen"
          label="Screen"
          filled
          hint="Choose a screen to put this image. NOTE: if you want to use sharing screen, choose the screen on the left"
          persistent-hint
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="pa-4 ma-0" align="center">
      <v-col cols="12" md="6">
        <v-select
          v-model="media.position"
          label="Position"
          :items="positions"
          filled
          hint="Choose a position to place this media"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" class="pink">img will go here</v-col>
    </v-row>

    <v-row justify="space-between" class="ma-0 pb-8 pl-8 pr-8">
      <v-btn color="red" text @click="discard()">Cancel</v-btn>
      <v-btn dark color="green" @click="addImage()">Save</v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      media: {
        file: null,
        filename: "",
        sharing: "",
        partner: "",
        position: "",
        screen: "",
        type: "image"
      },
      positions: [
        { text: "Top", value: "top" },
        { text: "Center", value: "center" },
        { text: "Bottom", value: "bottom" },
        { text: "Middle", value: "middle" },
        { text: "Top & Sharing", value: "topsharing" },
        { text: "Center & Sharing", value: "centersharing" },
        { text: "Bottom & Sharing", value: "bottomsharing" },
        { text: "Middle & Sharing", value: "middlesharing" }
      ]
    };
  },
  methods: {
    addImage() {
      this.media.filename = this.media.file.name;
      if (
        this.media.position == "topsharing" ||
        this.media.position == "bottomsharing" ||
        this.media.position == "centersharing" ||
        this.media.position == "middlesharing"
      ) {
        this.media.sharing = true
        if(this.media.screen == this.maxScreens){
          this.media.partner = 1
        }
      }
      this.$store.dispatch("newMedia", {mediaInfo: this.media, file: this.media.file});
      this.show = false;
    },
    discard() {
      this.show = false;
    }
  },
  computed: {
    maxScreens() {
      return this.$store.state.builderStore.maxScreens;
    },
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
