<template>
  <div class="blog">
    <v-container>
      <v-row>
        <v-col cols="12" class="sm-hidden">
          <layouts-side-bar-cats
            @clear="clearCat"
            :cats="cats"
            v-if="!catLoading"
            @filter="selectCat"
          />
          <v-skeleton-loader v-else type="list"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" class="py-12">
          <v-col cols="12" class="md-hidden">
            <div class="d-flex items-center justify-space-between">
              <h2 class="app-title">الفديوهات</h2>
              <v-icon @click.prevent="showFilters">mdi-filter</v-icon>
            </div>
          </v-col>
          <v-col cols="12">
            <v-chip
              v-if="form.category != 0 && form.category != null"
              @click.prevent="form.category = 0"
              class="ml-4"
            >
              <span>قسم : </span>
              <span>{{ categoryFilter }}</span>
              <span><v-icon>mid-close</v-icon></span>
            </v-chip>
          </v-col>
          <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
          <div v-else-if="items.length > 0">
            <v-row>
              <v-col cols="12" md="4" v-for="video in items.slice(startIndexSlice ,endIndexSlice)" :key="video.Id">
                <partials-video :video="video" />
              </v-col>
              <v-col cols="12">
                   <v-pagination
                    v-model="page"
                    :length="paginationLength"
                    total-visible="6"
                    ></v-pagination>
               </v-col>
            </v-row>
          </div>
          <div v-else>
            <h2>لا يوجد فيديوهات</h2>
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
import { Videos } from '@/repositoreis/global'
import { mapGetters } from 'vuex'
import filterMixin from '~/mixins/filter'
export default {
  mixins: [filterMixin],
  computed: {
       startIndexSlice(){
            return (this.page -1) * this.pageCount
        },
        endIndexSlice(){
            return this.startIndexSlice + this.pageCount
        },
        paginationLength(){
            return Math.ceil(this.items.length / this.pageCount)
        },
    ...mapGetters({
      items: 'videos/videos',
      loading: 'videos/loading',
    }),
  },
  data() {
    return {
      catsType: 'video',
      page : 1,
      pageCount : 6,
    }
  },
  methods: {
    getData() {
        
      this.$store.commit('videos/loading', true)
      Videos(this.form.category).then((d) => {
        this.$store.commit('videos/videos', d)
        this.$store.commit('videos/loading', false)
        console.log(Math.ceil(this.items.length / this.pageCount))
        console.log(this.items.length)
        console.log(this.pageCount)
        console.log(this.items.length / this.pageCount)
        console.log(Math.ceil(1.5))
        console.log('Math.ceil(2.3)')
      })
    },
  },
}
</script>