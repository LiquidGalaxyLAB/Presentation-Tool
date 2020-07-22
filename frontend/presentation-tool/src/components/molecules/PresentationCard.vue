<template>
  <v-hover v-slot:default="{hover}" open-delay="100">
    <v-card :elevation="hover ? 16 : 2" @click.stop="viewPresentation(presentation._id)" height="100%">
      <player :selectPresentation="presentation" v-model="openDialog"></player>
      <v-img height="150" :src="category.img">
        <v-expand-transition>
          <div class="fade-transition v-card--reveal" style="height: 100%;">
            <v-container fluid fill-height>
              <v-row justify="center" align="center">
                <v-btn x-large fab color="black">
                  <v-icon x-large color="white">mdi-play</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </div>
        </v-expand-transition>
      </v-img>
      <v-row align="start" class="pl-0 pr-3">
        <v-col>
          <v-card-title class="pt-0 pb-0 pl-3">{{presentation.title}}</v-card-title>
        </v-col>
        <v-col cols="2" >
          <v-row justify="center">
          <v-menu offset-x>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-cog</v-icon>
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
      <div class="text ellipsis">
     <!-- <v-card-text class="pl-7 pr-6 pt-0 desc-text">{{presentation.description}}</v-card-text>-->
      </div>
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
import categories from '@/utils/categories.js'

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
  computed:{
    category(){
      return categories.getCategory(this.presentation.category)
    }
  },
  methods: {
    async viewPresentation(id) {
      var valid = await this.$store.dispatch('executePresentation',id)
      if(valid)
        this.openDialog=true      
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
      console.log('export',this.presentation)
      this.$store.commit('setOverlay',{value: true, text: 'Exporting presentation from Liquid Galaxy'})
      this.$store.dispatch('exportPresentation',{id:this.presentation._id, title:this.presentation.title})
    },
    editPresentation(){
      this.$router.push(`/presentation/${this.presentation._id}`)
      this.$store.dispatch('editPresentation',this.presentation)
    },
    deletePresentation(){
      confirm("Are you sure you want to delete? This action can not be undone.") && this.$store.dispatch('deleteById',this.presentation._id)
    }
  }
};
</script>
