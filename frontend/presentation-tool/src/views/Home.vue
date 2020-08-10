<template>
  <div>
    <toolbar v-model="about"></toolbar>
    <v-container>
      <group-cards :presentations="presentations"></group-cards>
    </v-container>
    <new-pres-button v-model="importDialog"></new-pres-button>
    <v-dialog v-model="importDialog" width="80%">
      <v-card class="pa-6">
        <import-card v-model="importDialog"></import-card>
      </v-card>
    </v-dialog>
    <v-dialog v-model="about" scrollable>
      <v-card height="100%">
        <v-row justify="center" class="ma-0 pr-0 pb-6">
          <v-col cols="12" md="6" sm="6">
            <v-img src="@/assets/combined-logos-1200.png"></v-img>
          </v-col>
          <v-col cols="12" md="6" sm="5" class="teal">
            <v-row class="ma-0">
              <h1 class="pl-3 pt-12 white--text text-center">Welcome to the Presentation Tool project!</h1>
            </v-row>
            <v-row class="ma-0">
              <h3 class="pl-3 pt-12 white--text">{{desc}}</h3>
            </v-row>
            <v-row class="ma-0">
              <h3 class="pl-3 pt-12 white--text">{{thanks}}</h3>
            </v-row>
            <v-row class="mt-12 ml-0 mr-0 pt-6 pb-12" justify="space-around" align="center">
              <v-btn dark @click="about = false">
                Explore
                <v-icon right>mdi-open-in-new</v-icon>
              </v-btn>
              <v-btn color="grey lighten-2" @click="launchDemo()">
                Launch a demo
                <v-icon right>mdi-play-circle-outline</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-footer absolute color="black">
          <v-spacer />
          <h4
            class="white--text pl-3"
          >&copy; {{new Date().getFullYear()}} - Karine Aparecida Pistili Rodrigues</h4>
        </v-footer>
      </v-card>
    </v-dialog>
    <overlay />
  </div>
</template>

<script>
import Toolbar from "@/components/atoms/Toolbar.vue";
import GroupCards from "@/components/organisms/GroupCards.vue";
import NewPresButton from "@/components/atoms/NewPresentationFloatButton.vue";
import ImportCard from "@/components/atoms/ImportCard.vue";
import Overlay from "@/components/atoms/Overlay.vue";

export default {
  components: {
    Toolbar,
    GroupCards,
    NewPresButton,
    ImportCard,
    Overlay,
  },
  data() {
    return {
      importDialog: false,
      about: true,
      desc: `A tool to empower the Liquid Galaxy capability by proposing programatical display of different types of media alongside Google Earth`,
      thanks: `This is a Google Summer of Code 2020 project for the Liquid Galaxy organization. Special thanks to Google Summer of Code, Liquid Galaxy LAB and to all involved partners.`,
    };
  },
  methods: {
    launchDemo() {
      console.log("puto");
    },
  },
  computed: {
    presentations() {
      return this.$store.state.presentationStore.presentations;
    },
  },
  created() {
    this.$store.dispatch("getAllPresentations");
  },
};
</script>