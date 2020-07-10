<template>
  <v-container>
    <div class="pb-4">
      <h2>Basic information</h2>
      <v-divider></v-divider>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="presentation.title"
        :counter="20"
        :rules="titleRules"
        label="Title *"
        filled
        required
        hint="Choose an intuitive title with less than 20 characters"
        persistent-hint
      ></v-text-field>
      <v-textarea
        v-model="presentation.description"
        label="Description"
        filled
        required
        hint="Describe what your presentation will be about"
        persistent-hint
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
          ></v-text-field>
        </v-col>
      </v-row>
      <v-switch v-model="audio" label="One audio for the whole presentation"></v-switch>
      <v-file-input
        v-if="audio"
        v-model="presentation.file"
        clearable
        accept="audio/*"
        filled
        label="Audio"
        hint="NOTE: this audio will play through the whole presentation. If you don't want that, don't upload here"
        persistent-hint
      ></v-file-input>
      <v-row justify="center" class="pl-2 pt-5 pb-4">
        <v-btn color="blue" class="mr-4" dark @click="validate()">Save</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //models
    valid: true,
    audio: false,
    presentation: {
      title: "",
      maxscreens:"",
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
    categories: ["Education", "Travel", "Nature", "Real State", "History"]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('presentationBasicInformation',this.presentation)
      }
    },
   
  },
  computed: {}
};
</script>