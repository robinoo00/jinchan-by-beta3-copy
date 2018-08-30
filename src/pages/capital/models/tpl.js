import * as CapitalServices from '../services/tpl'
import config from "../../../utils/config";
import {Toast} from 'antd-mobile'

export default {
    namespace: 'capital',
    state: {
        data:[
            {title:'可用资金',value:0,key:10},
            {title:'授信资金',value:0,key:'优先'},
            {title:'自有资金',value:0,key:'劣后'},
            {title:'静态权益',value:0,key:11},
            {title:'动态权益',value:0,key:12},
            {title:'入金金额',value:0,key:3},
            {title:'出金金额',value:0,key:4},
            {title:'手续费',value:0,key:7},
            {title:'平仓盈亏',value:0,key:8},
            {title:'持仓盈亏',value:0,key:9},
            {title:'风险率',value:0,key:'风险率'},
        ]
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/capital' && localStorage.getItem(config.KEY)){
                    dispatch({
                        type:'getInfo'
                    })
                }
            })
        },
    },

    effects: {
        *getInfo({},{call,put}){
            const {data} = yield call(CapitalServices.getInfo,{});
            if(data){
                yield put({
                    type:'assignData',
                    info:data
                })
            }
        },
        *credit(state,{call,select}){
            // const personal_info = yield select(state => state.personal.data);
            // console.log(personal_info);
            const {data} = yield call(CapitalServices.credit,{})
            if(data){
                if(data.信息){
                    Toast.info(data.信息)
                }
            }
        }
    },

    reducers: {
        assignData(state,{info}){
            for(let item of state.data){
                if(typeof info[item.key] != 'undefined'){
                    item['value'] = info[item.key];
                }
                if(item.key === '风险率'){
                    if(info['劣后'] === 0 || info['优先'] === 0){
                        item.value = 0
                    }else{
                        item.value = info['劣后'] / info['优先'] * 100 + '%';
                    }
                }
            }
            return {
                ...state,
                data:[...state.data]
            }
        }
    },

};
