<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-file-input v-model="audio" clearable outlined label="Audio" persistent-hint></v-file-input>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field label="Fly to..." append-icon="mdi-map" outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="6" class="pl-12">
        <v-slider v-model="slider" thumb-label="always" :max="max"></v-slider>
      </v-col>
      <v-col cols="12" md="6">
        <v-row justify="center">
          <v-btn dark color="blue" @click="changeTemplate()">
            change template
            <v-icon right>mdi-auto-fix</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-slide-group multiple show-arrows>
      <v-slide-item v-for="n in screensQt" :key="n">
        <component :is="component"></component>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import FullTemplate from "@/components/molecules/presentation_templates/FullTemplate";
import SharingTemplate from "@/components/molecules/presentation_templates/SharingTemplate";

export default {
  data: () => ({
    model: null,
    audio: null,
    slider: "",
    max: 300,
    component: "FullTemplate"
  }),
  components: {
    FullTemplate,
    SharingTemplate
  },
  computed: {
    screensQt() {
      return this.$store.state.builderStore.screensQt;
    }
  },
  methods: {
    changeTemplate() {
      this.component = "SharingTemplate";
    }
  }
};
</script>