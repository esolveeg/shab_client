<template>
  <div class="blog">
    <v-container>
      <v-row>
        <v-col cols="12" class="sm-hidden">
          <v-text-field
            v-model="form.search"
            clearable
            label="بحث"
          ></v-text-field>
          <!-- <layouts-side-bar-cats @clear="clearCat" :cats="cats" v-if="!catLoading" @filter="selectCat" /> -->
          <div class="filters" v-if="!filtersLoading">
            <v-row>
              <v-col cols="12" md="4">
                <v-btn class="filter-btn" @click.prevent="clearAllFilters()">
                  الكل
                </v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  label="التصنيف"
                  ref="cat"
                  :items="cats"
                  item-text="Name"
                  clearable
                  v-model="cat"
                  @change="selectCat"
                  return-object
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  label="المدن"
                  ref="city"
                  :items="cities"
                  item-text="Name"
                  v-model="city"
                  clearable
                  @change="selectCity"
                  return-object
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </div>
          <v-skeleton-loader v-else type="list"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" class="py-12">
          <v-col cols="12" class="md-hidden">
            <div class="d-flex align-center justify-space-between">
              <h2 class="app-title">مشاريع الشاب الريادي</h2>
              <v-icon @click.prevent="showFilters">mdi-filter</v-icon>
            </div>
          </v-col>
          <v-col cols="12">
            <v-chip
              v-if="form.search != '' && form.search != null"
              @click.prevent="form.search = ''"
              class="ml-4"
            >
              <span>بحث عن : </span>
              <span>{{ form.search }}</span>
            </v-chip>
            <v-chip
              v-if="form.category != 0 && form.category != null"
              @click.prevent="clearCat()"
              class="ml-4"
            >
              <span>قسم : </span>
              <span>{{ categoryFilter }}</span>
              <span><v-icon>mid-close</v-icon></span>
            </v-chip>
            <v-chip
              v-if="form.city != 0 && form.city != null"
              @click.prevent="clearCity()"
              class="ml-4"
            >
              <span>مدينة : </span>
              <span>{{ cityFilter }}</span>
              <span><v-icon>mid-close</v-icon></span>
            </v-chip>
          </v-col>
          <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
          <div v-else-if="items.length > 0">
            <v-row>
              <v-col
                cols="12"
                md="3"
                v-for="project in items"
                :key="project.Id"
              >
                <partials-project :project="project" />
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <h2>لا يوجد مشاريع</h2>
          </div>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-card-title class="bg-primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="filter">حفظ</v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              class="ml-8 md-hidden"
              v-model="form.search"
              label="بحث"
            ></v-text-field>
            <layouts-side-bar-cats
              :cats="cats"
              v-if="!catLoading"
              @filter="selectCat"
            />
            <v-skeleton-loader v-else type="list"></v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>


<script>
import { ListCities, Projects } from '@/repositoreis/global'
import { mapGetters } from 'vuex'
import filterMixin from '~/mixins/filter'
export default {
  mixins: [filterMixin],
  computed: {
    ...mapGetters({
      loading: 'projects/loading',
      items: 'projects/projects',
    }),
  },
  data() {
    return {
      catsType: 'project',
      filtersLoading: false,
      all :[{Id : 0 , Name : "الكل"}],
      city:null,
      cities: [],
    }
  },
  methods: {
    getData() {
      Projects(this.form).then((d) => {
        this.$store.commit('projects/projects', d)
        this.$store.commit('projects/loading', false)
      })
    },
    getCities() {
      this.filtersLoading = true
      ListCities().then((res) => {
        this.cities = this.all.concat(res)
        this.filtersLoading = false
      })
    },
    clearCity(){
        this.form.city = 0
        this.city = null
    },
    clearAllFilters(){
      this.clearCity()
      this.clearCat()
      this.clearSearch()
    },
    selectCity(city) {
      if (city == null) {
        this.clearCity()  
        return
      }
      this.form.city = city.Id
      this.cityFilter = city.Name
    },
  },
  created() {
    this.getCities()
  },
}
</script>