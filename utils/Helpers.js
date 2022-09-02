export const required = [(v) => !!v || 'البريد الالكتروني مطلوب']
export const undef = (obj) => {
  return typeof obj == 'undefined'
}

export const price = (p) => {
  return `${p} ر.س`
}


export const image = (path) => {
  return process.env.IMG_URL + path
}

export const breadCrumb = page => {
  const pages = [
    {
      title: 'الاعضاء',
      page: 'members',
    },
    {
      title: 'health',
      page: 'health',
    },
    {
      title: 'اتصل بنا',
      page: 'contact',
    },
    {
      title: 'اضافة مشروع',
      page: 'projects-create',
    },
    {
      title: 'اضافة مقال',
      page: 'blog-create',
    },
    {
      title: 'الفعاليات',
      page: 'events',
    },
    {
      title: 'الفعاليات',
      page: 'events-id',
    },
    {
      title: 'من نحن',
      page: 'about',
    },
    {
      title: 'حجز الفعاليات',
      page: 'join',
    },
    {
      title: 'انضم الينا',
      page: 'register',
    },
    {
      title: 'العضويات',
      page: 'memberships',
    },
    {
      title: 'الشبكة التنفيذية',
      page: 'ryadeen',
    },
    {
      title: 'المدونة',
      page: 'blog',
    },
    {
      title: 'المدونة',
      page: 'blog-id',
    },
    {
      title: 'الملف الشخصي',
      page: 'profile',
    },
    
    {
      title: 'المشروعات',
      page: 'projects',
    },
    {
      title: 'المشروعات',
      page: 'projects-id',
    },
    {
      title: 'تعديل المشروع',
      page: 'projects-edit-id',
    },
    {
      title: 'الفيديوهات',
      page: 'videos',
    },
    {
      title: 'المستشارين',
      page: 'consultunts',
    },
  ]


  for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      if(element.page === page) return element
      
  }
}
export const snackBar = {
  active: false,
  msg: '',
}


export const serializeQuery = query => {
  return Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
};
export const addParamsToLocation = (params , path) => {
  history.pushState(
      {},
      null,
      path +
      '?' +
      Object.keys(params)
          .map(key => {
          return (
              encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
          )
          })
          .join('&')
  )
  }


  export const getParamsFromLocation = (query , form) => {
    const qKeys = Object.keys(query)
    qKeys.forEach(key => {
      if(key in form && query[key] != 'null') {
          form[key] = typeof form[key] == 'string' ? query[key] : parseInt(query[key])
      }
    })
  }



  export const clearNullValues = (obj) => {
    let clone = { ...obj }
    Object.keys(clone).forEach((key) => {
      let k = key
      clone[k] === null || '' ? delete clone[k] : ''
    })
    return clone
  }


  export const logout = (store) => {
    if(process.client){
      localStorage.removeItem('token')
    }
    store.commit('user/user' , null)
    store.commit('ui/snackBar' , 'تم تسجيل الخروج بنجاح')

}