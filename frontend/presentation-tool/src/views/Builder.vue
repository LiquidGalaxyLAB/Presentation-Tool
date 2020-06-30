<template>
  <div>
    <toolbar></toolbar>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" sm="6" xs="12">
          <v-card>
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
  }
};
</script>