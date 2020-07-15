<template>
  <div>
    <v-dialog v-model="show" scrollable max-width="600px">
      <v-card class="pa-2" height="100%">
        <v-card-title class="headline pl-4">Now Playing</v-card-title>
        <v-divider></v-divider>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline pb-10" v-text="selectPresentation.title"></v-card-title>
            <v-card-subtitle v-text="selectPresentation.description"></v-card-subtitle>
            <div class="pl-4 pb-5">
              <v-btn outlined color="red" @click="stopPresentation()">
                Stop
                <v-icon>mdi-stop</v-icon>
              </v-btn>
            </div>
          </div>

          <v-avatar class="ma-3 pt-4" size="125" tile>
            <v-img
              :src="category.img"
            ></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import categories from '@/utils/categories.js'

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
    },
    category(){
      return categories.getCategory(this.selectPresentation.category)
    }
  },
  methods: {
    async stopPresentation() {
      var valid = await this.$store.dispatch('stopPresentation')
      if(valid)
        this.show = false
    }
  }
};
</script>