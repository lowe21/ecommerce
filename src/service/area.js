import Request from '../utils/request'
export default {
    getListData () {
        return Request.post('buyer/area/list').then(response => {
            return response
        }).catch(error => {
            return error
        })
    }
}
