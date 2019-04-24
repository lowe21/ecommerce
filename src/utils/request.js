import Config from '../config'
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
fly.config.baseURL = Config.apiBaseURL
fly.config.timeout = 5000
fly.interceptors.request.use((request) => {
    request.body.token = ''
    return request
})
fly.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        let result = {
            state: false,
            code: '',
            msg: ''
        }
        switch (error.status) {
            case 0:
                result.code = 'NETWORK_ERROR'
                result.msg = '网络错误'
                break
            case 1:
                result.code = 'REQUEST_TIMEOUT'
                result.msg = '请求超时'
                break
            case 2:
                result.code = 'IO_ERROR'
                result.msg = '文件下载成功，但保存失败'
                break
            default:
                result.code = 'UNKNOWN_ERROR'
                result.msg = '未知错误'
                break
        }
        return result
    }
)
export default {
    post (api, params = {}) {
        return fly.post(api, params)
    },
    get (api, params = {}) {
        return fly.get(api, params)
    }
}
