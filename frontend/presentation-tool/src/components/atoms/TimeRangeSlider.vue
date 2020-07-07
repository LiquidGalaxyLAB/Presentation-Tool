<template>
  <v-card flat>
    <v-card-title class="pt-0 mt-0 pb-0">Duration *</v-card-title>
    <v-card-text>
      <v-row class="mb-4" justify="space-between">
        <v-col class="text-left">
          <span class="display-3 font-weight-light" v-text="`${newDuration.minutes}`"></span>
          <span class="subheading font-weight-light mr-1">min</span>
          <span class="display-3 font-weight-light" v-text="`:${newDuration.seconds}`"></span>
          <span class="subheading font-weight-light mr-1">sec</span>
        </v-col>
      </v-row>
      <span class="subheading font-weight-light mr-1">Minutes</span>
      <v-slider
        v-model="newDuration.minutes"
        color="green"
        track-color="grey"
        always-dirty
        min="0"
        max="59"
      >
        <template v-slot:prepend>
          <v-icon color="green" @click="decrement('minutes')">mdi-minus</v-icon>
        </template>

        <template v-slot:append>
          <v-icon color="green" @click="increment('minutes')">mdi-plus</v-icon>
        </template>
      </v-slider>
      <span class="subheading font-weight-light mr-1">Seconds</span>
      <v-slider
        v-model="newDuration.seconds"
        color="pink"
        track-color="grey"
        always-dirty
        min="0"
        max="59"
      >
        <template v-slot:prepend>
          <v-icon color="pink" @click="decrement('seconds')">mdi-minus</v-icon>
        </template>

        <template v-slot:append>
          <v-icon color="pink" @click="increment('seconds')">mdi-plus</v-icon>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    newDuration: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  methods: {
    decrement(value) {
      if (value == "minutes") {
        if (this.newDuration.minutes >= 0) this.newDuration.minutes--;
      } else {
        if (this.newDuration.seconds >= 0) this.newDuration.seconds--;
      }
    },
    increment(value) {
      if (value == "minutes") this.newDuration.minutes++;
      else this.newDuration.seconds++;
    }
  }
};
</script>
