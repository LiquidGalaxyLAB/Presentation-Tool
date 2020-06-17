<template>
  <v-hover v-slot:default="{hover}" open-delay="100">
    <v-card :elevation="hover ? 16 : 2" @click.stop="openDialog=true">
      <player :selectPresentation="presentation" v-model="openDialog"></player>
      <v-img height="150" :src="presentation.category.img">
        <v-expand-transition>
          <div class="fade-transition green darken-2 v-card--reveal" style="height: 100%;">
            <v-container fluid fill-height>
              <v-row justify="center" align="center">
                <v-btn fab color="white">
                  <v-icon color="green">mdi-play</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </div>
        </v-expand-transition>
      </v-img>
      <v-row align="start" class="pl-3 pr-3">
        <v-col>
          <v-card-title class="pt-0 pb-0">{{presentation.name}}</v-card-title>
        </v-col>
        <v-col cols="2" >
          <v-row justify="center">
          <v-menu offset-x>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(act, index) in actions"
                  :key="index"
                  @click="executeAction(act.action)"
                >
                  <v-list-item-title>{{ act.name }}</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon :color="act.color">{{act.icon}}</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-col>
      </v-row>
      <v-card-text class="pl-8 pr-6 pt-0">{{presentation.description}}</v-card-text>
    </v-card>
  </v-hover>
</template>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>

<script>
import player from '@/components/atoms/PresentationPlayer.vue'

export default {
  components:{
    player
  },
  props: ["presentation"],
  data() {
    return {
      openDialog: false,
      actions: [
        { name: "Export", action: "exportPresentation" , icon:"mdi-file-download", color:"blue"},
        { name: "Edit", action: "editPresentation" , icon:"mdi-pencil", color:"black"},
        { name: "Delete", action: "deletePresentation" , icon:"mdi-delete", color:"red"}
      ]
    };
  },
  methods: {
    viewPresentation(id) {
      this.$router.push(`/presentation/play/${id}`);
    },
    executeAction(action){
      if(action == 'editPresentation'){
        this.editPresentation()
      }
      else if(action == 'deletePresentation'){
        this.deletePresentation()
      }
      else if(action == 'exportPresentation'){
        this.exportPresentation()
      }
    },
    exportPresentation(){
      console.log('export')
    },
    editPresentation(){
      console.log('edit')
    },
    deletePresentation(){
      console.log('delete')
    }
  }
};
</script>
