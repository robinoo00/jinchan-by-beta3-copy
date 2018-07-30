import request from '../../../utils/request'
import config from '../../../utils/config'

export function getList(values){
    return request(config.server + 'appapi/risklist',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function delRedit(values){
    return request(config.server + 'appapi/delrisk',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
