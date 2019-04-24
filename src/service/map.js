import Config from '../config'
import Request from '../utils/request'
export default {
    getInfo (location) {
        return Request.get(Config.apiMapUrl, {
            key: Config.apiMapKey,
            location: location
        }).then(response => {
            if (response.status === 0) {
                return {
                    state: true,
                    code: 'REQUEST_SUCCESS',
                    msg: '请求成功',
                    data: {
                        address: [
                            response.result.ad_info.province,
                            response.result.ad_info.city,
                            response.result.ad_info.district
                        ],
                        adcode: response.result.ad_info.adcode
                    }
                }
            } else {
                return {
                    state: false,
                    code: 'REQUEST_FAIL',
                    msg: response.message
                }
            }
        }).catch(error => {
            return error
        })
    }
}
