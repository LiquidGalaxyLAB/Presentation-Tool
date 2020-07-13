<template>
  <v-overlay :value="overlay.value">
    <v-row justify="center">
      <v-card-title>{{overlay.text}}</v-card-title>
    </v-row>
    <v-row justify="center">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-row>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    overlay() {
      return this.$store.state.logsStore.overlay;
    }
  }
};
</script>