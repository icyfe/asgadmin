import axios from 'axios'

class Http {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, {
                data,
            }, {
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