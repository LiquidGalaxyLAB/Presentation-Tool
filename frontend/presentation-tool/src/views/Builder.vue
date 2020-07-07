<template>
  <div>
    <toolbar></toolbar>
    <v-container>
      <v-row justify="space-between" align="center" class="ma-0">
        <h1>Presentation Builder</h1>
        <v-row class="ma-0" justify="end">
          <v-btn dark text color="red" @click="discardDialog = true">
            Discard
            <v-icon right>mdi-close</v-icon>
          </v-btn>
          <v-btn dark color="green" @click="savePresentation()">
            Save Presentation
            <v-icon right>mdi-content-save</v-icon>
          </v-btn>
        </v-row>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" sm="6" xs="12">
          <v-card width="100%">
            <basic-info-form></basic-info-form>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" sm="6" xs="12">
          <v-card width="100%" height="100%" min-height="500">
            <slide-builder></slide-builder>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="discardDialog" width="50%">
      <v-card class="pa-6">
        <h2
          style="color:black;text-align:center;"
        >This action will discard all your work and can't be undone. Are you sure?</h2>
        <v-row justify="space-around" class="ma-0 pt-8">
          <v-btn color="blue" dark @click="discardDialog = false">cancel</v-btn>
          <v-btn color="blue darken-4" dark @click="discardPresentation()">Yes, I'm sure</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Toolbar from "@/components/atoms/Toolbar.vue";
import BasicInfoForm from "@/components/molecules/BasicInfoForm.vue";
import SlideBuilder from "@/components/organisms/SlideBuilder.vue";

export default {
  components: {
    Toolbar,
    BasicInfoForm,
    SlideBuilder
  },
  data() {
    return {
      discardDialog: false
    };
  },
  methods: {
    savePresentation() {
      this.$store.dispatch("savePresentation");
    },
    discardPresentation() {
      this.$store.commit("cleanBuilderState");
      this.$router.push("/");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.discardDialog) {
      const answer = window.confirm(
        "Do you really want to leave? This action will discard all your work and can't be undone!"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
    else{
      next()
    }
  }
};
</script>