import request from '../../../utils/request'
import config from '../../../utils/config'

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function _getParams(values){
    const keys = Object.keys(values);
    let querystring = '';
    keys.map(key => {
        querystring += key + '=' + values[key] + '&'
    })
    querystring = querystring.substring(0, querystring.length - 1);
    return querystring;
}

export function getKDataByNum(values){
    let url = 'http://800.597tz.com/index/f';
    url = url + '?' + _getParams(values)
    return fetch(url)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({data}))
        .catch(err => {
            console.log(err);

        });
}

export function getKData(values){
    let url = 'http://800.597tz.com/index/ff';
    url = url + '?' + _getParams(values)
    return fetch(url)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => ({data}))
        .catch(err => {
            console.log(err);

        });
}
