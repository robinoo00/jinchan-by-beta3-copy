import * as TestServices from '../services/test'
import config from '../../../utils/config'

export default {
    namespace:'test',
    state:{
        // type_list:['分时','1分钟','5分钟','15分钟','30分钟','60分钟'],
        type_list:[
            {text:'分时',value:1,key:0},
            {text:'1分钟',value:1,key:1},
            {text:'5分钟',value:5,key:2},
            {text:'15分钟',value:15,key:3},
            {text:'30分钟',value:30,key:4},
            {text:'60分钟',value:60,key:5},
        ],
        type_choose:'分时',
        data_0:[],
        data_1:[],
        data_2:[],
        data_3:[],
        data_4:[],
        data_5:[],
        draw_data:[]
    },
    effects:{
        *getKDataByNum({},{call,put,select}){
            const list = yield select(state => state.test.type_list);
            const type_choose = yield select(state => state.test.type_choose);
            const item = list.filter(item => item.text == type_choose)[0];
            // console.log(type_choose);
            // console.log(list);
            // console.log(item);
            const post_data = {
                num:100,
                period:item['value'],
                symbol:sessionStorage.getItem(config.TRADE_CODE)
            }
            const {data} = yield call(TestServices.getKDataByNum,post_data);
            yield put({
                type:'assignData',
                data:data
            })
        },
        *getKData({},{call,select,put}) {
            const draw_data = yield select(state => state.test.draw_data);
            if(draw_data.length != 0){
                const list = yield select(state => state.test.type_list);
                const type_choose = yield select(state => state.test.type_choose);
                const item = list.filter(item => item.text === type_choose)[0];
                let time = '';
                time = draw_data[draw_data.length - 1]['Time'];
                // if(draw_data.length != 1){
                //     time = draw_data[draw_data.length - 2]['Time'];
                // }else{
                //     console.log(123);
                //     time = draw_data[0]['Time'];
                // }
                const post_data = {
                    t:time,
                    period:item['value'],
                    symbol:sessionStorage.getItem(config.TRADE_CODE)
                }
                const {data} = yield call(TestServices.getKData,post_data);
                yield put({
                    type:'assignData',
                    data:data
                })
            }
        }
    },
    reducers:{
        init(state,{}){
            state = {
                type_list:[
                    {text:'分时',value:1,key:0},
                    {text:'1分钟',value:1,key:1},
                    {text:'5分钟',value:5,key:2},
                    {text:'15分钟',value:15,key:3},
                    {text:'30分钟',value:30,key:4},
                    {text:'60分钟',value:60,key:5},
                ],
                type_choose:'分时',
                data_0:[],
                data_1:[],
                data_2:[],
                data_3:[],
                data_4:[],
                data_5:[],
                draw_data:[]
            };
            return {
                ...state
            }
        },
        assignTypeChoose(state,{value}){
          return {
              ...state,
              type_choose:value,
              draw_data:[]
          }
        },
        assignData(state,{data}){
            const list = state.type_list;
            const type = state.type_choose;
            // const index = list.indexOf(type);
            const index = list.filter(item => item.text === type)[0]['key']
            let new_data;
            if(state['data_'+index].length === 0){
                new_data = data;
            }else{
                new_data = data.length > 1 ? [...state['data_'+index],...data] : state['data_'+index];
            }
            return {
                ...state,
                ['data_'+index]:new_data,
                draw_data:data
            }
        }
    }
}
