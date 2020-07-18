<template>
  <div>
    <toolbar></toolbar>
    <v-container>
      <group-cards :presentations="presentations"></group-cards>
    </v-container>
    <new-pres-button v-model="importDialog"></new-pres-button>
    <v-dialog v-model="importDialog" width="80%">
      <v-card class="pa-6">
        <import-card v-model="importDialog"></import-card>
      </v-card>
    </v-dialog>
    <overlay/>
  </div>
</template>

<script>
import Toolbar from "@/components/atoms/Toolbar.vue";
import GroupCards from "@/components/organisms/GroupCards.vue";
import NewPresButton from "@/components/atoms/NewPresentationFloatButton.vue";
import ImportCard from "@/components/atoms/ImportCard.vue";
import Overlay from "@/components/atoms/Overlay.vue"

export default {
  components: {
    Toolbar,
    GroupCards,
    NewPresButton,
    ImportCard,
    Overlay
  },
  data() {
    return {
      importDialog: false
    };
  },
  computed: {
    presentations() {
      return this.$store.state.presentationStore.presentations;
    }
  },
  created() {
    this.$store.dispatch("getAllPresentations");
  }
};
</script>