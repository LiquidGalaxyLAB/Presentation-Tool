<template>
  <div>
    <alert />
    <v-toolbar color="teal">
      <v-app-bar-nav-icon @click="$router.push('/')">
        <v-avatar>
          <v-img src="@/assets/presentation-logo.png"></v-img>
        </v-avatar>
      </v-app-bar-nav-icon>
      <v-toolbar-title
        class="white--text"
        style="cursor:pointer;"
        @click="$router.push('/')"
      >Liquid Galaxy Presentation Tool</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index" @click="execAction(item.action)">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-icon right>{{item.icon}}</v-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import Alert from "@/components/atoms/Alert";

export default {
  components: {
    Alert
  },
  data: () => ({
    items: [
      { title: "Clean Storage", icon: "mdi-delete", action: "clean-storage" }
    ]
  }),
  methods: {
    execAction(action) {
      if (action == "clean-storage") this.cleanStorage();
    },
    cleanStorage() {
      this.$store.dispatch("cleanLiquidGalaxyStorage");
    }
  }
};
</script>