<template>
  <v-snackbar v-model="snackbar" :color="color" right top>
      {{alert}}
    <v-btn dark text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    message: "default"
  }),
  computed: {
    alert() {
      return this.$store.state.logsStore.log;
    },
    color(){
        return this.$store.state.logsStore.color;
    }
  },
  watch: {
    alert() {
      if (this.alert !== null) {
        this.snackbar = true;
        
      }
    },
    snackbar() {
      if (this.snackbar == false) {
        this.$store.commit("setLog",null);
        this.$store.commit("setColor", "blue");
      }
    }
  }
};
</script>

