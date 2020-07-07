<template>
  <v-card>
    <div class="pa-8">
      <h2>New Image</h2>
      <v-divider></v-divider>
    </div>
    <v-form ref="form">
      <v-row class="pa-4 ma-0">
        <v-col cols="12" md="8">
          <v-file-input
            v-model="file"
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
            :rules="screenRules"
            type="number"
            v-model="media.screen"
            :items="maxScreens"
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
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      media: {
        filename: "",
        sharing: "",
        partner: "",
        position: "",
        screen: "",
        type: "image"
      },
      screenRules: [v => !!v || "Screen is required"],
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
      this.media.filename = this.file.name;
      if (
        this.media.position == "topsharing" ||
        this.media.position == "bottomsharing" ||
        this.media.position == "centersharing" ||
        this.media.position == "middlesharing"
      ) {
        this.media.sharing = true;
        if (this.media.screen == this.maxScreens) {
          this.media.partner = 1;
        }
      }
      this.media = this.cleanObject(this.media);
      this.$store.dispatch("newMedia", {
        mediaInfo: this.media,
        file: this.file
      });
      this.show = false;
    },
    discard() {
      this.show = false;
    },
    cleanObject(obj) {
      // this method removes all unused attributes defined on the presentation
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === ""
        ) {
          delete obj[propName];
        }
      }

      return obj;
    }
  },
  computed: {
    maxScreens() {
      let max = this.$store.state.builderStore.maxScreens;
      let arrayOfStrings = [];
      for (var i = 1; i <= max; i++) {
        arrayOfStrings.push(`${i}`);
      }
      return arrayOfStrings;
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
