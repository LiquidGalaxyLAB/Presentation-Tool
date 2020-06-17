<template>
  <div>
    <v-row align="center">
      <v-col cols="12" md="3">
        <!--weird bug with value-->
        <v-file-input v-model="audio" clearable outlined show-size label="Audio" persistent-hint></v-file-input>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field label="Fly to..." append-icon="mdi-map" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-slider v-model="slider" class="align-center" :max="max">
          <template v-slot:append>
            <div class="pb-6">{{slider}}ms</div>
          </template>
        </v-slider>
      </v-col>
      <v-col class="pb-12" cols="12" md="2">
        <v-btn @click="changeTemplate()">templates</v-btn>
      </v-col>
    </v-row>
    <v-slide-group multiple show-arrows>
      <v-slide-item v-for="n in screens" :key="n">
        <component :is="component"></component>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import FullTemplate from '@/components/molecules/presentation_templates/FullTemplate'
import SharingTemplate from '@/components/molecules/presentation_templates/SharingTemplate'

export default {
  data: () => ({
    model: null,
    screens: 5,
    audio: "",
    slider: "",
    max: 120000,
    component: "FullTemplate"
  }),
  components:{
    FullTemplate,SharingTemplate
  },
  methods:{
    changeTemplate(){
      this.component = "SharingTemplate"
    }
  }
};
</script>