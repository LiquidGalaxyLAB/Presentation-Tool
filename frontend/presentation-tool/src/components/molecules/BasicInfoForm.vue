<template>
  <v-container>
    <div class="pb-4">
      <h2>Basic information</h2>
      <v-divider></v-divider>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-overlay :value="edit" :absolute="true">
        <v-btn dark @click="edit = false">
          edit
          <v-icon right>mdi-pencil</v-icon>
        </v-btn>
      </v-overlay>
      <v-text-field
        v-model="presentation.title"
        :counter="20"
        :rules="titleRules"
        label="Title *"
        filled
        required
        hint="Choose an intuitive title with less than 20 characters"
        persistent-hint
        :readonly="edit"
      ></v-text-field>
      <v-textarea
        v-model="presentation.description"
        label="Description"
        filled
        required
        hint="Describe what your presentation will be about"
        persistent-hint
        :disabled="edit"
      ></v-textarea>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="presentation.category"
            :items="categories"
            :rules="[v => !!v || 'Category is required']"
            label="Category *"
            filled
            required
            hint="The category which your presentation best fits in"
            persistent-hint
            :readonly="edit"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="presentation.maxscreens"
            :rules="screenRules"
            type="number"
            label="Screens *"
            filled
            required
            hint="The number of screens in your Liquid Galaxy"
            persistent-hint
            :readonly="edit"
          ></v-text-field>
        </v-col>
      </v-row>
      <div v-if="!editingAudio">
        <v-switch v-model="audio" label="One audio for the whole presentation" :readonly="edit"></v-switch>
        <v-file-input
          v-if="audio"
          v-model="presentation.file"
          clearable
          accept="audio/*"
          filled
          label="Audio"
          hint="NOTE: this audio will play through the whole presentation. If you don't want that, don't upload here"
          persistent-hint
          :readonly="edit"
        ></v-file-input>
      </div>
      <v-card class="mx-auto pa-2" v-else>
        <p class="pl-3 pr-2 pt-4">{{presentation.audiopath}}</p>
        <v-btn text color="teal" @click="editingAudio = false; presentation.file = null">
          change
          <v-icon right>mdi-file-music</v-icon>
        </v-btn>
      </v-card>
      <v-row justify="center" class="pl-2 pt-5 pb-4" v-if="!edit">
        <v-btn color="blue" class="mr-4" dark @click="validate()">Save</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {CategoriesNames} from "@/utils/categories.js"

export default {
  data: () => ({
    //models
    valid: true,
    audio: false,
    edit: false,
    editingAudio: false,
    presentation: {
      title: "",
      maxscreens: "",
      description: "",
      category: "",
      audiopath: "",
      file: null
    },
    //rules
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],
    screenRules: [
      v => !!v || "Screen is required",
      v => v >= 1 || "Screens minor to 1 doesn't exist"
    ],
    //selection data
    categories: CategoriesNames
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("presentationBasicInformation", this.presentation);
        this.edit = true;
      }
    }
  },
  computed: {},
  created() {
    if (this.$route.params.id != "new") {
      if (this.$store.state.builderStore.presentation.title == "") {
        this.$router.push("/")
      } else {
        this.presentation = this.$store.state.builderStore.presentation;
        if (this.presentation.audiopath != undefined) {
          this.audio = true;
          this.editingAudio = true;
        }
      }
    }
  }
};
</script>