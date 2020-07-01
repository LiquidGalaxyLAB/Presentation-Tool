<template>
  <v-card width="100%">
    <div class="pa-6">
      <h2>Slide creator</h2>
      <v-divider></v-divider>
    </div>
    <v-row justify="center" class="mr-0">
      <v-col cols="12" md="6">
        <v-row class="pl-8 pr-8">
          <v-text-field
            label="Fly To"
            filled
            hint="OPTIONAL. Choose a place to fly on google earth during this slide"
            persistent-hint
          ></v-text-field>
        </v-row>
        <v-row class="pl-8">
          <v-switch v-model="audio" label="Audio for this slide"></v-switch>
          <v-file-input
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
        <time-range-slider></time-range-slider>
      </v-col>
    </v-row>
    <v-row justify="space-between" class="mr-8 ml-6 pb-8">
      <v-btn color="red" text @click="show = false">Cancel</v-btn>
      <v-btn color="green" dark>Save</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import TimeRangeSlider from "@/components/atoms/TimeRangeSlider.vue";

export default {
  props: ["value"],
  data() {
    return {
      audio: false
    };
  },
  components: {
    TimeRangeSlider
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