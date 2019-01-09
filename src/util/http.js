import axios from 'axios'
const BASE_URL = 'http://localhost:3302/'
class Http {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}${url}`,
                data, {
                    headers: {
                        'content-type': 'application/json',
                    }
                }).then(res => {
                    console.log(res)
                    resolve(res);
                }).catch(e => {
                    console.log("ERROR", e)
                })
        })
    }
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                headers: {
                    'content-type': 'application/json',
                },
                params: {
                    data,
                }
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(e => {
                console.log("ERROR", e)
            })
        })
    }
}
export { Http }