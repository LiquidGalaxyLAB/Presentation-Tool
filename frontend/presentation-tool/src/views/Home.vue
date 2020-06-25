<template>
  <div>
    <toolbar></toolbar>
    <v-container>
      <group-cards :presentations="presentations"></group-cards>
    </v-container>
    <new-pres-button></new-pres-button>
  </div>
</template>

<script>
import Toolbar from "@/components/atoms/Toolbar.vue";
import GroupCards from "@/components/organisms/GroupCards.vue";
import NewPresButton from "@/components/atoms/NewPresentationFloatButton.vue"

export default {
  components: {
    Toolbar,
    GroupCards,
    NewPresButton
  },
  computed:{
    presentations(){
      return this.$store.state.presentationStore.presentations
    }
  },
  created(){
    this.$store.dispatch('getAllPresentations')
  }

};
</script>