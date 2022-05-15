import Http from '@/utils/Http'


export const ListCatsByType = (type) => {
    return new Promise((resolve, reject) => {
        Http.get(`categories?type=${type}`)
        .then((d) => {
            resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}