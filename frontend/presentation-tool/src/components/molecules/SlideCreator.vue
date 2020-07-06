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
            hint="OPTIONAL. Choose a place to fly on google earth during this slide"
            persistent-hint
            v-model="slide.flyto"
          ></v-text-field>
        </v-row>
        <v-row class="pl-8">
          <v-switch v-model="audio" label="Audio for this slide"></v-switch>
          <v-file-input
            v-model="slide.audio"
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
        <media-list></media-list>
      </v-col>
    </v-row>
    <v-row justify="space-between" class="mr-8 ml-6 pb-8">
      <v-btn color="red" text @click="discardChanges()">Cancel</v-btn>
      <v-btn color="green" dark @click="createSlide()">Save slide</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import TimeRangeSlider from "@/components/atoms/TimeRangeSlider.vue";
import MediaList from "@/components/molecules/SlideMediaList.vue";

export default {
  props: ["value"],
  data() {
    return {
      audio: false,
      slide: {
        audio: null,
        duration: {
          minutes: 0,
          seconds: 0
        },
        flyto: "",
      }
    };
  },
  methods: {
    createSlide() {
      this.slide = this.cleanObject(this.slide)
      this.$store.dispatch("newSlide", this.slide);
      this.show = false
    },
    discardChanges() {
      this.show = false;
      console.log("discard");
      //implement to discard all changes on the slide
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
  }
};
</script>