<template>
  <div>
    <v-card v-if="!error">
      <div class="pt-8 pl-6 pr-8">
        <h2>New Image</h2>
        <v-divider></v-divider>
      </div>
      <v-form ref="form">
        <v-row class="pa-4 ma-0" align="center">
          <v-col cols="12" md="6">
            <v-row>
              <v-file-input
                :rules="mediaRules"
                v-model="media.file"
                clearable
                accept="image/*"
                filled
                label="Image"
                hint="Give preference to images with high resolution"
                persistent-hint
              ></v-file-input>
            </v-row>
            <v-row>
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
            </v-row>
            <v-row>
              <v-select
                v-model="media.position"
                label="Position"
                :items="positions"
                :rules="positionRules"
                filled
                hint="Choose a position to place this media"
                persistent-hint
              ></v-select>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-img src="@/assets/sharing-one-screen.png"></v-img>
          </v-col>
        </v-row>

        <v-row justify="space-between" class="ma-0 pb-8 pl-8 pr-8">
          <v-btn color="red" text @click="discard()">Cancel</v-btn>
          <v-btn dark color="green" @click="addImage()">Save</v-btn>
        </v-row>
      </v-form>
    </v-card>
    <v-card class="pa-6" v-else>
      <v-row justify="center" class="ma-0">
        <h2
          style="color:red;text-align:center;"
        >There is already a media on this position. Remove it before adding a new one.</h2>
      </v-row>
      <v-row justify="center" class="ma-0 pt-8">
        <v-btn color="blue" dark @click="error= false">ok</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import utils from "@/utils/utils.js";

export default {
  props: ["value", "slideID", "currentMedia"],
  data() {
    return {
      error: false,
      media: {
        id: "",
        filename: "",
        sharing: "",
        partner: "",
        position: "",
        screen: "",
        type: "image",
        storagepath: "",
        file: null,
      },
      edit: false,
      screenRules: [(v) => !!v || "Screen is required"],
      mediaRules: [(v) => !!v || "Image is required"],
      positionRules: [(v) => !!v || "Position is required"],
      positions: [
        { text: "Top", value: "top" },
        { text: "Center", value: "center" },
        { text: "Bottom", value: "bottom" },
        { text: "Middle", value: "middle" },
        { text: "Top & Sharing", value: "topsharing" },
        { text: "Center & Sharing", value: "centersharing" },
        { text: "Bottom & Sharing", value: "bottomsharing" },
        { text: "Middle & Sharing", value: "middlesharing" },
      ],
    };
  },
  methods: {
    validatePosition() {
      // validates if position is not on top of another on the same screen
      this.$store.state.builderStore.presentation.slides.forEach((slide) => {
        if (slide.id == this.slideID) {
          slide.media.forEach((m) => {
            if (
              m.screen == this.media.screen ||
              m.partner == this.media.screen ||
              m.partner == this.media.screen
            ) {
              //check if position is the same on the main screen
              if (m.position == this.media.position) {
                this.error = true;
                return false;
              }
            }
          });
        }
      });
    },
    addImage() {
      this.media.filename = this.media.file.name;
      if (
        this.media.position == "topsharing" ||
        this.media.position == "bottomsharing" ||
        this.media.position == "centersharing" ||
        this.media.position == "middlesharing"
      ) {
        this.media.sharing = true;
        if (this.media.screen == this.maxScreens[this.maxScreens.length - 1]) {
          this.media.partner = 1;
        } else {
          this.media.partner = parseInt(this.media.screen) + 1;
        }
      } else {
        this.media.sharing = null;
        this.media.partner = null;
      }
      if (!this.edit)
        this.$store.dispatch("createNewMedia", {
          slideID: this.slideID,
          media: this.media,
        });
      else
        this.$store.dispatch("editedMedia", {
          slideID: this.slideID,
          media: this.media,
        });

      this.show = false;
    },
    discard() {
      this.show = false;
    },
  },
  computed: {
    maxScreens() {
      let max = this.$store.state.builderStore.presentation.maxscreens;
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
      },
    },
  },
  created() {
    console.log("media", this.currentMedia);
    if (this.currentMedia != null) {
      this.media = this.currentMedia;
      this.edit = true;
    } else {
      this.media.id = utils.createID();
    }
  },
};
</script>
