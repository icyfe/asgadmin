import axios from 'axios'
import { message } from 'ant-design-vue'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL:'http://localhost:3302/', // api 的 base_url
    // baseURL:'http://39.108.215.49/', 
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        // if (store.getters.token) {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //   config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error) // for debug
        message.error('请求出错',   4)
        return Promise.reject(error)
    }
)

export default service
