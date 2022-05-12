export const state = () => ({
    user:null,
    users:[],
    ryadeen:[],
    consultunts:[],
    team:[],
    projects:[],
    articles:[],
    serviceId : null,
    loading:true,
    loggedIn:false
});

export const mutations = {
    user(state, payload) {
        state.loggedIn = payload != null
        state.user = payload;
    },
    team(state, payload) {
        state.team = payload 
    },
    serviceId(state, payload) {
        state.serviceId = payload 
    },
    consultunts(state,payload){
        state.consultunts = payload
    },
    team(state,payload){
        state.team = payload
    },
     projects(state,payload){
        state.projects = payload
    },
    articles(state,payload){
        state.articles = payload
    },
    ryadeen(state,payload){
        state.ryadeen = payload
    },
    users(state,payload){
        state.users = payload
    },
    loading(state,payload){
        state.loading = payload
    }
   
};

export const getters = {
    user: state => {
        return state.user
    },
    team: state => {
        return state.team
    },
  
    serviceId: state => {
        return state.serviceId
    },
    dummyUserMobadr: state => {
        return state.dummyUserMobadr
    },
    dummyUserTamooh: state => {
        return state.dummyUserTamooh
    },
    dummyUserRyady: state => {
        return state.dummyUserRyady
    },
        
    projects: state => {
        return state.projects
    },
    articles: state => {
        return state.articles
    },
    loading: state => {
        return state.loading
    },
   
    consultunts: state => {
        return  state.consultunts
    },
    ryadeen: state => {
        return state.ryadeen
    },
    users: state => {
        return state.users
    },
    loggedIn: state => {
        return state.loggedIn
    },   
}
