<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4" sm="6">
        <v-text-field
          v-model="searchPresentation"
          outlined
          label="Search..."
          append-icon="mdi-magnify"
          type="text"
        ></v-text-field>
      </v-col>
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

export default {
  props: ["presentations"],
  data() {
    return {
      searchPresentation: "",
      /*presentations: [
        {
          id: "001",
          name: "My presentation 01",
          description: "Lorem ipsum",
          category: {
            name: "Education",
            img:
              "https://image.freepik.com/free-vector/flat-design-geometric-shapes-background_23-2148366514.jpg"
          }
        },
        {
          id: "002",
          name: "My presentation 02",
          description: "Lorem ipsum",
          category: {
            name: "Travel",
            img:
              "https://image.freepik.com/free-vector/flat-design-geometric-shapes-background_23-2148366514.jpg"
          }
        },
        {
          id: "003",
          name: "My presentation 03",
          description: "Lorem ipsum",
          category: {
            name: "Education",
            img:
              "https://image.freepik.com/free-vector/flat-design-geometric-shapes-background_23-2148366514.jpg"
          }
        },
        {
          id: "003",
          name: "My presentation 03",
          description: "Lorem ipsum",
          category: {
            name: "Education",
            img:
              "https://image.freepik.com/free-vector/flat-design-geometric-shapes-background_23-2148366514.jpg"
          }
        },
        {
          id: "003",
          name: "My presentation 03",
          description: "Lorem ipsum",
          category: {
            name: "Education",
            img:
              "https://image.freepik.com/free-vector/flat-design-geometric-shapes-background_23-2148366514.jpg"
          }
        }
      ],*/
      sorted: false
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
