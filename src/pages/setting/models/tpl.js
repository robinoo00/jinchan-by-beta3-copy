import config from '../../../utils/config'

export default {
    namespace: 'setting',
    state: {
        trade:localStorage.getItem(config.TRADE_SWITCH) === null ? true : localStorage.getItem(config.TRADE_SWITCH) === "true" ? true : false
    },
    subscriptions: {
    },

    effects: {

    },

    reducers: {
        assignTrade(state,{checked}){
            localStorage.setItem(config.TRADE_SWITCH,checked)
            return{
                ...state,
                trade:checked
            }
        }
    },

};
