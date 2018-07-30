import * as ReditsServices from '../services/redits'
import {Toast} from 'antd-mobile'

let loading = false;

export default {
    namespace: 'redits',
    state: {
        list: [
            {id:7,状态:'123',时间:'123',审核时间:'123'},
            {id:8,状态:'1234',时间:'1234',审核时间:'123'},
        ],
        page:0,
        nomore:false
    },
    setup: {},
    reducers: {
        delItem(state, {id}) {
            const list = state.list;
            for (let index in state.list) {
                if (list[index].id === id) {
                    list.splice(index, 1);
                }
            }
            return {
                ...state,
                list:[...list]
            }
        },
        assignList(state, {data, page}) {
            console.log('data',data);
            console.log('page',page);
            let nomore = false;
            if (data.length === 0 || data.length < 30) {
                nomore = true;
            }
            if (page === 1) {
                return {
                    ...state,
                    list: data,
                    page: 1,
                    nomore: nomore
                }
            } else {
                return {
                    ...state,
                    list: [...state.list, ...data],
                    page: page,
                    nomore: nomore
                }
            }
        },
    },
    effects: {
        * getList({page = 1}, {call, put, select}) {
            const {data} = yield call(ReditsServices.getList, {page: page});
            loading = false;
            if (data) {
                yield put({
                    type: 'assignList',
                    data: data.Rows,
                    page: page
                })
            }
        },
        * delRedit({id}, {call, put}) {

            const {data} = yield call(ReditsServices.delRedit, {id: id});
            if (data) {
                if (data.信息) {
                    Toast.info(data.信息);
                }
                if (data.状态) {
                    yield put({
                        type: 'delItem',
                        id:id
                    })
                }
            }
        },
        * loadMore({}, {put, select}) {
            if (!loading) {
                const page = yield select(state => state.redits.page);
                const nomore = yield select(state => state.redits.nomore);
                if (!nomore) {
                    yield put({
                        type: 'getList',
                        page: page + 1
                    })
                }
                loading = true;
            }
        }
    }
}
