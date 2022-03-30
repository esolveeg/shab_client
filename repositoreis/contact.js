import Http from '@/utils/Http'


export const SendContactMsg = (payload) => {
    return new Promise((resolve, reject) => {
        Http.post(`contact/` , payload)
        .then((d) => {
            resolve(d.data)
        }).catch(e => {
            reject(e)
        })
    })
}