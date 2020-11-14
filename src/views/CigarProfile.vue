<template>
  <v-card>
    <v-card-title>{{cigarInfo.brand}} - {{cigarInfo.name}}</v-card-title>
    <v-card-subtitle><i>{{wrapperSetLabel}}</i></v-card-subtitle>
    <v-card-text>
      <v-list nav>
        <v-list-item v-for="size in this.cigarInfo.sizes" :key="size.name" link @click="sizeSelected = size">
          <v-list-item-content>
            <v-list-item-title><b>{{size.sizeName}}</b> ({{size.ringGauge}} x {{size.length}}")</v-list-item-title>
            <v-list-item-subtitle>{{getWrapperShadesForSize(size).join(', ')}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-dialog v-if="sizeSelected" v-model="sizeSelected" max-width="50%">
      <v-card>
        <v-card-title>{{sizeSelected.sizeName}}</v-card-title>
        <v-card-text>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Binder</v-list-item-title>
            <v-list-item-subtitle>
              <span v-if="sizeBinder.region">{{ sizeBinder.region }}</span>
              <span v-if="sizeBinder.shade">{{ sizeBinder.shade }}</span>
              <span v-if="sizeBinder.year">({{ sizeBinder.year }})</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Filler</v-list-item-title>
            <v-list-item-subtitle v-for="(filler, index) in sizeFillers" :key="index">
              -
              <span v-if="filler.region">{{ filler.region }}</span>
              <span v-if="filler.shade">{{ filler.shade }}</span>
              <span v-if="filler.year">({{ filler.year }})</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        </v-card-text>
        <v-card-title>Add to Humidor?</v-card-title>
        <v-card-text>
        <v-card-actions>
          <v-btn @click="sizeShadeSelected = 'Maduro'">Maduro</v-btn>
        </v-card-actions>
        </v-card-text>
      </v-card>
      <v-dialog v-model="sizeShadeSelected" max-width="25%">
        <v-card>
          <v-card-title>Quantity?</v-card-title>
          <v-card-text>
            <v-card-actions>
              <v-btn>+1</v-btn>
              <v-btn>+5</v-btn>
              <v-btn>+10</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-dialog>
  </v-card>
</template>

<script>
import BackendService from "@/services/BackendService"

export default {
  name: 'CigarProfile',
  data: () => ({
    cigarInfo: null,
    sizeSelected: null,
    sizeShadeSelected: null
  }),
  mounted() {
    if (this.$route.params.brand && this.$route.params.name) {
      this.fetchCigarFromParams()
    }
  },
  watch: {
    $route() {
      this.fetchCigarFromParams();
    }
  },
  computed: {
    wrapperSet() {
      let defaultWrappers = this.cigarInfo.wrappers ? this.cigarInfo.wrappers.map(wrapper => wrapper.shade) : []
      let sizeWrappers = this.cigarInfo.sizes.flatMap(size => size.wrappers).filter(Boolean).map(wrapper => wrapper.shade).filter(wrappers => wrappers);
      return [ ...new Set(defaultWrappers.concat(sizeWrappers))]
    },
    wrapperSetLabel() {
      if (this.wrapperSet && this.wrapperSet.length == 1) {
        return "Comes only in a " + this.wrapperSet[0] + " wrapper"
      } else if (this.wrapperSet) {
        let label = "Comes in ";
        for (let i = 0; i < this.wrapperSet.length - 1; i++) {
          label += this.wrapperSet[i] + ', '
        }
        label += "and " + this.wrapperSet[this.wrapperSet.length - 1]
        label += " wrapper shades";
        return label;
      }
      return null;
    },
    sizeWrappers() {
      return this.sizeSelected.wrappers ? this.sizeSelected.wrappers : this.cigarInfo.wrappers
    },
    sizeBinder() {
      return this.sizeSelected.binder ? this.sizeSelected.binders : this.cigarInfo.binder
    },
    sizeFillers() {
      return this.sizeSelected.filler ? this.sizeSelected.filler : this.cigarInfo.filler
    }
  },
  methods: {
    fetchCigarFromParams() {
      let brand = this.$route.params.brand;
      let name = this.$route.params.name;
      if (brand && name) {
        BackendService.cigarInfo(brand, name, (err, response) => {
          if (err) {
            // handle
          }
          this.cigarInfo = response;
        })
      }
    },
    getWrapperShadesForSize(size) {
      if (size.wrappers) {
        return size.wrappers.map(wrapper => wrapper.shade)
      } else {
        return this.cigarInfo.wrappers.map(wrapper => wrapper.shade);
      }
    }
  }
}
</script>
