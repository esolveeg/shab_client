import Http from '@/utils/Http'
import { clearNullValues, serializeQuery } from '~/utils/Helpers'


export const Home = () => {
    return new Promise((resolve, reject) => {
        Http.get('home')
        .then((d) => {
            resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}



export const Blog = (payload) => {
    return new Promise((resolve, reject) => {
        Http.get(`articles?${serializeQuery(payload)}`)
        .then((d) => {
            d.data == null ? resolve([]) : resolve(d.data)
        }).catch(e => {
            typeof e.response == 'undefined' ? resolve([]) : reject(e)
        })
    })
}

export const Events = (payload) => {
    return new Promise((resolve, reject) => {
        Http.get('events' , payload)
        .then((d) => {
            d.data == null ? resolve([]) : resolve(d.data)
        }).catch(e => {
            typeof e.response == 'undefined' ? resolve([]) : reject(e)
        })
    })
}


export const Event = (id) => {
    return new Promise((resolve, reject) => {
        Http.get(`events/${id}`)
        .then((d) => {
            d.data == null ? resolve([]) : resolve(d.data)
        }).catch(e => {
            typeof e.response == 'undefined' ? resolve([]) : reject(e)
        })
    })
}

export const Post = (id) => {
    return new Promise((resolve, reject) => {
        Http.get(`articles/${id}`)
        .then((d) => {
             resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}



export const Projects = (payload) => {
    return new Promise((resolve, reject) => {
        // const p = {Category : payload.category , Search:payload.search}
        Http.get(`projects?${serializeQuery(clearNullValues(payload))}`)
        .then((d) => {
            d.data == null ? resolve([]) : resolve(d.data)
        }).catch(e => {
            typeof e.response == 'undefined' ? resolve([]) : reject(e)
        })
    })
}

export const Project = (id) => {
    return new Promise((resolve, reject) => {
        Http.get(`projects/${id}`)
        .then((d) => {
             resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}


export const EditCreateProject = (form , method , id = null) => {
    const url = id == null ? 'projects/editadd/' : `projects/editadd/${id}`
    return new Promise((resolve, reject) => {
        Http[method](url , form)
        .then((d) => {
             resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}


export const Services = () => {
    return new Promise((resolve, reject) => {
        Http.get('services')
        .then((d) => {
             resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}


export const CreateArticle = (form) => {
    return new Promise((resolve, reject) => {
        Http.post(`articles/create` , form)
        .then((d) => {
             resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}


export const Videos = (category) => {
    return new Promise((resolve, reject) => {
        Http.get(`videos?category=${category}`)
        .then((d) => {
            d.data == null ? resolve([]) : resolve(d.data)
        }).catch(e => {
            typeof e.response == 'undefined' ? resolve([]) : reject(e)
        })
    })
}



export const ListCities = (type) => {
    return new Promise((resolve, reject) => {
        Http.get(`cities`)
        .then((d) => {
            resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}