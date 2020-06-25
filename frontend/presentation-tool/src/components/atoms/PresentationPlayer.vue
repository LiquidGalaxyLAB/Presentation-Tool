<template>
  <div>
    <v-dialog v-model="show" scrollable max-width="600px">
      <v-card class="pa-2">
        <v-card-title class="headline pl-4">Now Playing</v-card-title>
        <v-divider></v-divider>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline pb-10" v-text="selectPresentation.title"></v-card-title>
            <v-card-subtitle v-text="selectPresentation.description"></v-card-subtitle>
            <div class="pl-4">
              <v-btn outlined color="red" @click="show = false;stopPresentation()">
                Stop
                <v-icon>mdi-stop</v-icon>
              </v-btn>
            </div>
          </div>

          <v-avatar class="ma-3 pt-4" size="125" tile>
            <v-img
              src="https://image.freepik.com/free-vector/flat-design-geometric-shapes-background_23-2148366514.jpg"
            ></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["value", "selectPresentation"],
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
  methods: {
    stopPresentation() {
      console.log("stop");
    }
  }
};
</script>