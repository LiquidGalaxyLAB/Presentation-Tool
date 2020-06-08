<template>
  <div>
    <v-dialog v-model="show" scrollable max-width="600px">
      <v-card class="pa-2">
        <v-card-title class="headline">Now Playing</v-card-title>
        <v-divider></v-divider>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="selectPresentation.name"></v-card-title>
            <v-card-subtitle v-text="selectPresentation.description"></v-card-subtitle>
            <v-btn text color="red" @click="show = false;stopPresentation()">
                Stop
              <v-icon>mdi-stop</v-icon>
            </v-btn>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img :src="selectPresentation.category.img"></v-img>
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
  methods:{
      stopPresentation(){
          console.log('stop')
      }
  }
};
</script>