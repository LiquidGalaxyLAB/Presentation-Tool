<template>
  <v-container class="mb-12">
    <v-row justify="center" align="start">
      <v-col cols="12" md="4" sm="6" xs="12">
        <h1 class="mt-4">My Presentations</h1>
      </v-col>
      <v-col cols="12" md="8" sm="6" xs="12">
        <v-row>
          <v-col cols="12" md="8" sm="6" xs="12">
            <v-text-field
              v-model="searchPresentation"
              outlined
              label="Search by name or category..."
              append-icon="mdi-magnify"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6" xs="12">
            <v-select v-model="searchPresentation" :items="categories" label="Categories" outlined></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="pb-8">
      <v-divider></v-divider>
    </div>
    <v-row v-if="filterPresentations.length == 0" justify="center">
      <h2>Oops! We couldn't find what you are searching for</h2>
      <p class="pt-4">
        Change your search or try creating a new presentation using the "
        <v-icon class="pb-1">mdi-plus-circle</v-icon> New Presentation " button
      </p>
    </v-row>
    <v-row>
      <v-col v-for="(presentation,i) in filterPresentations" :key="i" cols="12" md="3" sm="6">
        <presentation-card :presentation="presentation"></presentation-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PresentationCard from "@/components/molecules/PresentationCard";
import { CategoriesNames } from "@/utils/categories.js";

export default {
  props: ["presentations"],
  data() {
    return {
      searchPresentation: "",
      sorted: false,
      categories: CategoriesNames
    };
  },
  computed: {
    filterPresentations() {
      return this.presentations.filter(p => {
        return (
          p.title
            .toLowerCase()
            .includes(this.searchPresentation.toLowerCase()) ||
          p.category
            .toLowerCase()
            .includes(this.searchPresentation.toLowerCase())
        );
      });
    }
  },
  components: {
    PresentationCard
  }
};
</script>
