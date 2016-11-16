import axios from 'axios'
import qs from 'qs'
import store from '../store'
import config from './config'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
    store.dispatch('gProgress', 50)
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    store.dispatch('gProgress', 100)
    return response
}, error => {
    store.dispatch('gProgress', 100)
    return Promise.reject(error)
})

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    return {
        data: {
            code: -400,
            message: response.statusText
        }
    }
}

export default {
    getFromConfig(data) {
        return axios({
            method: 'post',
            url: config.api,
            data: qs.stringify(data),
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFToken',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus)
    },
    getData(data) {
        return axios.post('/', data).then(checkStatus)
    }
}
