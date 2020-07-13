<template>
  <v-card width="100%" flat>
    <div class="pa-6">
      <h2>New slide</h2>
    </div>
    <v-row justify="center" class="mr-0">
      <v-col cols="12" md="6">
        <v-row class="pl-8 pr-8">
          <v-text-field
            label="Fly To"
            filled
            hint="Choose a place to fly on google earth during this slide"
            persistent-hint
            v-model="slide.flyto"
          ></v-text-field>
        </v-row>
        <v-row class="pl-8 pr-8">
          <v-switch v-model="audio" label="Audio for this slide"></v-switch>
          <v-file-input
            v-model="slide.file"
            v-if="audio"
            clearable
            accept="audio/*"
            filled
            label="Audio"
            hint="NOTE: this audio will play during this slide. When slide is over, music will be cut down"
            persistent-hint
          ></v-file-input>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <time-range-slider v-model="slide.duration"></time-range-slider>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <media-list :slide="slide"></media-list>
      </v-col>
    </v-row>
    <v-row justify="space-between" class="mr-8 ml-6 pb-8">
      <v-btn color="red" text @click="discardChanges()">Cancel</v-btn>
      <v-btn color="blue" dark @click="validate()">Save slide</v-btn>
    </v-row>
    <v-dialog v-model="errorDialog" width="50%">
      <v-card class="pa-6">
        <v-row justify="center" class="ma-0">
          <h2 style="color:red;text-align:center;">Required: {{error}}</h2>
        </v-row>
        <v-row justify="center" class="ma-0 pt-8">
          <v-btn color="blue" dark @click="errorDialog = false;error=''">close</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import TimeRangeSlider from "@/components/atoms/TimeRangeSlider.vue";
import MediaList from "@/components/molecules/SlideMediaList.vue";
import utils from "@/utils/utils";

export default {
  props: ["value", "currentslide"],
  data() {
    return {
      audio: false,
      errorDialog: false,
      error: "",
      edit: false,
      slide: {
        id: "",
        audiopath: "",
        file: null,
        flyto: "",
        duration: {
          minutes: 0,
          seconds: 0
        },
        media:[]
      }
    };
  },
  methods: {
    validate() {
      if (
        this.slide.duration.minutes == 0 &&
        this.slide.duration.seconds == 0
      ) {
        this.errorDialog = true;
        this.error = "Please assign a duration to this slide";
      } else {
        this.createSlide();
      }
    },
    createSlide() {
      if (!this.edit) {
        this.$store.dispatch("createSlideToPresentation", this.slide);
      } else {
        console.log('editing')
      }
      this.show = false;
    },

    discardChanges() {
      this.show = false;
      this.$store.dispatch('deleteSlide',this.slide)
    }
  },
  components: {
    TimeRangeSlider,
    MediaList
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
  },
  created() {
    if (this.currentslide != null) {
      this.slide = this.currentslide;
      this.edit = true;
      if (this.slide.file != null) {
        this.audio = true;
      }
    }
    else{
      this.slide.id = utils.createID()
      this.$store.commit('newSlideIdOnly',this.slide)
    }
  }
};
</script>