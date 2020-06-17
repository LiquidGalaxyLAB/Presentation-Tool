<template>
  <v-container>
    <div class="pb-12">
      <h1>Fill up the basic information</h1>
      <v-divider></v-divider>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="presentation.title"
        :counter="20"
        :rules="titleRules"
        label="Title *"
        outlined
        required
        hint="Choose an intuitive title with less than 20 characters"
        persistent-hint
      ></v-text-field>
      <v-textarea
        v-model="presentation.description"
        label="Description"
        outlined
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
            outlined
            required
            hint="The category which your presentation best fits in"
            persistent-hint
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <!--weird bug with value-->
          <v-file-input
            v-model="presentation.audio"
            clearable
            outlined
            show-size
            label="Audio"
            hint="NOTE: this audio will play through the whole presentation. If you don't want that, don't upload here"
            persistent-hint
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="presentation.screensqt"
            :items="screens"
            :rules="[v => !!v || 'Number of screens is required']"
            label="Screens *"
            outlined
            required
            hint="The number of screens in your Liquid Galaxy"
            persistent-hint
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="presentation.slidesqt"
            :items="slides"
            :rules="[v => !!v || 'Number of slides is required']"
            label="Slides *"
            outlined
            required
            hint="The quatity of slides you are going to need"
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
      <v-row justify="space-between" class="pl-2">
        <v-btn color="red" text class="mr-4" @click="$router.push('/')">Cancel</v-btn>
        <v-btn  color="blue" class="mr-4" dark @click="validate">Save and continue</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
   props: {
    value: String
  },

  data: () => ({
    //models
    valid: true, 
    presentation: {
      title: "",
      description:"",
      category: "",
      audio:null,
      screensqt:"",
      slidesqt:""
    },
    //rules
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],
    //selection data
    categories: ["Education", "Travel", "Nature", "Real State", "History"],
    screens: ["1", "2", "3", "4", "5", "6","7"],
    slides: ["1", "2", "3", "4", "5"],
  }),

  methods: {
    validate() {
      if(this.$refs.form.validate()){
        this.step='2'
        this.$store.dispatch('addBasicInformation',this.presentation)
      }
      
    }
  },
computed: {
    step: {
     get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
  },
};
</script>