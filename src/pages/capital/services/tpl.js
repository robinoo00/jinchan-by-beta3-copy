import request from '../../../utils/request'
import config from '../../../utils/config'

export function getInfo(values){
    return request(config.server + 'appapi/zhijing',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}

export function credit(values){
    return request(config.server + 'appapi/addrisk',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
