<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Title" filled required></v-text-field>

      <v-textarea v-model="description" label="Description" filled required></v-textarea>

    <v-row>
        <v-col>
            <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Category is required']"
        label="Category"
        filled
        required
      ></v-select>
        </v-col>
        <v-col>
            <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Audio?" filled required></v-text-field>
        </v-col>
    </v-row>
      

      <v-row>
        <v-col>
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Category is required']"
            label="Screens"
            filled
            required
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Category is required']"
            label="Slides"
            filled
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Save</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>