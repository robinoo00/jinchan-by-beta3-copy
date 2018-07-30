import {List} from 'antd-mobile'
import {removeScrollListener, scrollLoadMore, reBuildDate, reBuildTime} from "../../../utils/common";
import React from 'react'
import {connect} from 'dva'
import NoMore from '../../../components/loading-nomore/bottom-tip'
import {Button,Modal} from 'antd-mobile'
import styles from '../styles/redits.less'

const Item = List.Item;
const Brief = Item.Brief;


class ReditList extends React.Component {
    componentDidMount() {
        let {loadMore, getList} = this.props;
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
    }

    componentWillUnmount() {
        removeScrollListener()
    }

    render() {
        const {...rest} = this.props;
        return (
            <div>
                {rest.list.map((item, index) => (
                    <Item
                        key={"fund_list_" + index}
                        extra={<div><p style={{fontSize: '.16rem',color:'#E34C4D'}}>{item.状态}</p>
                            {item.状态 === '已审核' ? <p style={{color:'#E34C4D'}}>{item.审核时间}</p> : <div className={styles.btn} onClick={() => {rest.del(item.id)}}>撤回</div>}
                        </div>}
                    ><p style={{fontSize: '.16rem', color: '#999'}}>账号:{item.账号}</p>
                        <Brief style={{fontSize: '.12rem'}}>{item.时间}</Brief></Item>
                ))}
                <NoMore nomore={rest.nomore}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.redits.list,
    nomore: state.redits.nomore,
})

const mapDispatchToProps = (dispatch, props) => ({
    del:(id) => {
        Modal.alert('撤回','确定撤回吗?',[
            {text:'取消',onPress:() => {}},
            {text:'确定',onPress:() => {
                    dispatch({
                        type:'redits/delRedit',
                        id:id
                    })
                }}
        ])
    },
    getList: () => {
        dispatch({
            type: 'redits/getList'
        })
    },
    loadMore:() => {
        dispatch({
            type:'redits/loadMore'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReditList)
