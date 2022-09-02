import {required } from '@/utils/Helpers'
import {EditCreateProject} from '@/repositoreis/global'
import { ListCatsByType } from '@/repositoreis/cat'
import {ListCities} from '@/repositoreis/global'
import {snackBar} from '@/utils/Helpers'
import {mapGetters} from 'vuex'
import {createProjectValidation} from '@/utils/validations'
import {Project} from '@/repositoreis/global'
import { interfaceDeclaration } from '@babel/types'
export default {
    data: () => ({
      error:null,
      loading:false,
      valid:true,
      createProjectValidation,
      snackBar,
      statuses:[
          "تحت التاسيس",
         "قائم",
         "متعثر",
         "اخري",
      ],
      errors:{},
      form:{
         CatId : 9,
         CityId : 1,
         Title : "null",
         Img : "null",
         Imgs : "null",
         Logo : "null",
         Status:"null",
         Fund : 10,
         Breif : "null",
         Location : "null",
         Phone : "null",
         File : "null",
         Email : "null",
         Website:"null",
         Instagram:"null",
         Twitter:"null",
      },
       required,
    }),
    computed:{
        ...mapGetters({
            catLoading: 'cats/loading',
            cats: 'cats/articles',
            cities: 'city/cities',
            citiesLoading: 'city/loading',
            user: 'user/user',
            // editId: 'projects/editId'
        }),
        editId(){
            return typeof this.$route.params.id == 'undefined' ? null : parseInt(this.$route.params.id)
        }
    },
    methods:{
        getCats(){
            ListCatsByType('project').then((res) => {
                this.$store.commit('cats/articles', res)
                this.$store.commit('cats/loading', false)
            })
        },
        getProject(id){
            Project(id).then((res) => {
                this.form.CatId = res.CatId
                this.form.CityId = res.CityId
                this.form.Title = res.Title
                this.form.Status = res.Status
                this.form.Fund = res.Fund
                this.form.Breif = res.Breif
                this.form.Location = res.Location
                this.form.Phone = res.Phone
                this.form.Email = res.Email
                this.form.Website = res.Website
                this.form.Instagram = res.Instagram
                this.form.Twitter = res.Twitter
            })
        },

        getCities(){
            ListCities().then((res) => {
                this.$store.commit('city/cities', res)
                this.$store.commit('city/loading', false)
            })
        },
        submit() {
          const formObj = this.$refs.projectForm
          formObj.validate()

          if(this.valid){
            // this.loading = true
            const form = {...this.form}
            this.form.UserId = this.user.Id
            // let formData = new FormData();
            // formData.append("UserId", this.user.Id);
            // formData.append("Img", form.Img);
            // formData.append("Imgs", form.Imgs);
            // formData.append("Logo", form.Logo);
            // formData.append('CatId' , form.CatId)
            // formData.append('CityId' , form.CityId)
            // formData.append('Title' , form.Title)
            // formData.append('Status' , form.Status)
            // formData.append('Fund' , form.Fund)
            // formData.append('Breif' , form.Breif)
            // formData.append('Location' , form.Location)
            // formData.append('Phone' , form.Phone)
            // formData.append('File' , form.File)
            // formData.append('Email' , form.Email)
            // formData.append('Website' , form.Website)
            // formData.append('Instagram' , form.Instagram)
            // formData.append('Twitter' , form.Twitter)


            const method = this.editId == null ? 'post' : 'put'
            console.log(this.form ,method, this.editId , this.$route.params)
            this.form.Fund = parseFloat(this.form.Fund)
            // this.form.Fund = parseFloat(this.form.Fund)
            EditCreateProject(this.form ,method, this.editId).then(d => {
              this.error = null
              this.loading = false
              this.$store.commit('ui/snackBar' , 'تم اضافة المشروع بنجاح')
              this.modal = false
              this.$store.commit('projects/editId' , null)
              this.$router.push('/profile?tab=3')
              this.$emit('created')
            })
            .catch(e => {
              this.loading = false
             
            })
          }
        },
        
    },
    watch:{
        editId:{
            handler: function(val)  {
              if(val != null) this.getProject(val)
            },
        }
    },
    created(){
        this.getCities()
        this.getCats()
    }
  }