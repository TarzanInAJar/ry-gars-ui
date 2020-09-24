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
              v-model="selectedCigar"
              :items="itemsPlusSearch"
              :loading="isLoading"
              :search-input.sync="search"
              :placeholder="searchPlaceholder"
              single-line
              hide-details
              rounded
              dense
              solo-inverted
              return-object
              item-text="name"
              item-value="id"
              ref="searchBox"
              :filter="filterCigars"
          >
            <template v-slot:item="data">
              {{cigarLabelFromResult(data.item)}}
            </template>
            <template v-slot:selection="data">
              {{cigarLabelFromResult(data.item)}}
            </template>

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
import BackendService from "@/services/BackendService"
export default {
  name: 'App',

  data: () => ({
    drawer: false,
    isLoading: false,
    search: null,
    selectedCigar: null,
    items: []
  }),
  watch: {
    search(val) {
      if (val) {
        this.searchAPI(val)
      } else {
        this.items = []
      }
    },
    selectedCigar(val) {
      if (val) {
        if (val.id === -1) { // searchAll item
          this.$router.push({ name: 'Search', query: {text: this.search}})
        } else {
          this.$router.push({ name: 'Cigar', params: { name: val.name, brand: val.brand } })
        }
        this.selectedCigar = null
        this.search = ''
        this.items = []
        this.$refs.searchBox.lazyValue = null // bug in vuetify
      }
    }
  },
  computed: {
    searchPlaceholder() {
      if (this.$route.params.brand) {
        return this.cigarLabel(this.$route.params.brand, this.$route.params.name, this.$route.params.subBrand)
      } else {
        return "Search for a Gar!"
      }
    },
    itemsPlusSearch() {
      if (this.search) {
        let searchAll = { id: -1, name: "Search all results for " + this.search, brand: ''}
        return this.items.concat(searchAll);
      } else {
        return this.items;
      }

    }
  },
  methods: {
    cigarLabelFromResult(cigarSearchResult) {
      return this.cigarLabel(cigarSearchResult.brand, cigarSearchResult.name, cigarSearchResult.subBrand)
    },
    cigarLabel(brand, name, subBrand) {
      return brand + ' ' +
          (subBrand ? subBrand + ' ' : '')  +
          name
    },
    searchAPI(query) {
      this.isLoading = true;
      BackendService.searchCigars(query, (err, response) => {
        if (err) {
          // TODO handle
          console.log(err)
        }
        this.items = response;
        this.isLoading = false;
      });
    },
    filterCigars(item, queryText) {
      return (
          item.brand.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
          item.subBrand.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
          item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
      );
    }
  }
};
</script>
