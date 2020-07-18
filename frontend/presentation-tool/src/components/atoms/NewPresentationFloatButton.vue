<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    fixed
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn v-model="fab" v-on="on" color="teal" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span v-if="fab">Close</span>
        <span v-else>New Presentation</span>
      </v-tooltip>
    </template>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn fab dark small color="blue darken-2" v-on="on" @click="importPresentation()">
          <v-icon>mdi-file-upload</v-icon>
        </v-btn>
      </template>
      <span>Import</span>
    </v-tooltip>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn fab dark small color="green" v-on="on" @click="newPresentation()">
          <v-icon>mdi-pencil-plus</v-icon>
        </v-btn>
      </template>
      <span>New</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
export default {
  props: ["value"],
  data: () => ({
    fab: false
  }),
  computed:{
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
  },
  methods:{
      newPresentation(){
          this.$router.push("/presentation/new")
      },
      importPresentation(){
         this.show = true
      }
  }
}
</script>