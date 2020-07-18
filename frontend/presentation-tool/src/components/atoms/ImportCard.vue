<template>
  <div>
    <div class="pb-4">
      <h2>Import</h2>
      <v-divider></v-divider>
    </div>
    <v-card outlined shaped class="mt-6 mb-6">
      <v-card-text
        class="text-center"
      >Import your .zip presentation by using the file input below and then clicking "IMPORT". Remember this .zip was populated in the correct format to be upload to this tool, if any changes were made outside the Presentation Tool, we can't guarantee the functionality.</v-card-text>
      <v-row justify="center" class="ma-0">
        <v-col cols="12" md="8" sm="10" xs="12">
          <v-file-input
            v-model="file"
            label="Select the presentation .zip"
            filled
            hide-input
            prepend-icon
            prepend-inner-icon="mdi-folder-zip"
            accept="application/zip"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card>
    <v-row justify="space-between" class="ma-0">
      <v-btn @click="show = false;file = null" color="red" text>cancel</v-btn>
      <v-btn @click="importPresentation()" color="green" dark>import</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data(){
      return {
          file: null
      }
  },
  methods:{
      importPresentation(){
          this.$store.commit('setOverlay',{value: true, text:'Trying to import to Liquid Galaxy'})
          this.$store.dispatch('importPresentation',this.file)
          this.show = false
          this.file = null
      }
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