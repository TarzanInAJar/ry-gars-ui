<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{name: 'Search', query: { text: 'Arturo Fuente'}}">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Search for Arturo Fuente</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div style="width: 100%" class="d-flex justify-center align-center">
        <div style="position: absolute; left:0px;" class="d-flex align-center">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="d-none d-sm-flex">Ry-Gars</v-toolbar-title>
        </div>
        <div>
          <v-autocomplete
              v-model="text"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              hide-no-data
              hide-selected
              placeholder="Search for a Gar!"
              single-line
              hide-details
              rounded
              dense
              solo-inverted
          >

          </v-autocomplete>
        </div>
        <div style="position: absolute; right: 10px;" class="d-flex align-center">
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>
      </div>

    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    isLoading: false,
    search: null,
    text: null,
    items: []
  }),
  watch: {
    search(val) {
      if (val && val !== this.text) {
        this.searchAPI(val)
      }
    }
  },
  methods: {
    searchAPI() {
      this.isLoading = true;
      // TODO replace with real api
      setTimeout(() => {
        this.items = ['change', 'me']
        this.isLoading = false
      }, 500)
    }
  }
};
</script>
