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
          <v-select
            v-model="screensqt"
            :items="screens"
            :rules="[v => !!v || 'Number of screens is required']"
            label="Screens *"
            filled
            required
            hint="The number of screens in your Liquid Galaxy"
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
      <v-switch v-model="audio" label="One audio for the whole presentation"></v-switch>
      <v-file-input
        v-if="audio"
        v-model="presentation.audio"
        clearable
        accept="audio/*"
        filled
        label="Audio"
        hint="NOTE: this audio will play through the whole presentation. If you don't want that, don't upload here"
        persistent-hint
      ></v-file-input>
      <v-row justify="space-between" class="pl-2 pt-10">
        <v-btn color="red" text class="mr-4" @click="$router.push('/')">Discard</v-btn>
        <v-btn color="green" class="mr-4" dark @click="validate()">Save Presentation</v-btn>
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
      description: "",
      category: "",
      audio: null
    },
    screensqt: "",
    //rules
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],
    //selection data
    categories: ["Education", "Travel", "Nature", "Real State", "History"],
    screens: ["1", "2", "3", "4", "5", "6", "7"]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        alert('open popup with config to send to lg')
        this.$store.dispatch(
          "generateStoragePathName",
          this.presentation.title
        );
        var presentationObj = this.cleanObject(this.presentation);
        this.$store.dispatch("addBasicInformation", presentationObj);
      }
    },
    cleanObject(obj) {
      // this method removes all unused attributes defined on the presentation
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === ""
        ) {
          delete obj[propName];
        }
      }

      return obj;
    }
  },
  computed: {}
};
</script>