<template>
    <v-card height="300" width="200" class="ma-2">
          <v-row class="ma-2">
            <v-col v-for="n in 3" :key="n" cols="12" md="12">
              <v-card height="70">
                Add media
                <v-icon>mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
</template>