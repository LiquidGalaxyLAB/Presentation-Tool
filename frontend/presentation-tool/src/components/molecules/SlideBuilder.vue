<template>
  <v-stepper v-model="e6" vertical>
      <div v-for="n in 5" :key="n">
    <v-stepper-step editable :complete="e6 > n" :step="n">
      Slide {{n}}
    </v-stepper-step>

    <v-stepper-content :step="n">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = n+1">Continue</v-btn>
      <v-btn text>Cancel</v-btn>
    </v-stepper-content>
    <v-divider vertical></v-divider>
      </div>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        e6: 1,
      }
    },
  }
</script>