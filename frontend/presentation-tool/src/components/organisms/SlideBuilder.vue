<template>
  <div>
    <div class="pa-3">
      <h2>Slides</h2>
      <v-divider></v-divider>
    </div>
    <v-card class="center-button"  @click="dialog = true" flat>
      <v-row justify="center">
        <v-card-title class="pb-0">New slide</v-card-title>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-img src="@/assets/addMedia.png"></v-img>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="dialog" max-width="50%">
        <v-card>
            <v-card-title>Slide creator</v-card-title>
            <v-btn @click="dialog = false">close</v-btn>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dialog:false
        }
    }
}
</script>

<style>
.center-button {
  background-color: lightcoral;
  width: 30%;
  height: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>