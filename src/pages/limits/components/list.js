import {List, Flex, Modal} from 'antd-mobile'
import {removeScrollListener, scrollLoadMore, reBuildDate, reBuildTime} from "../../../utils/common";
import React from 'react'
import {connect} from 'dva'
// import NoMore from '../../../components/loading-nomore/bottom-tip'
import CSSModules from 'react-css-modules'
import styles from '../styles/list.less'

const Item = List.Item;

let id = 0;

class FundList extends React.Component {
    componentDidMount() {
        let {loadMore, getList} = this.props;
        getList();
        id = setInterval(() => {
            getList();
        },1000)
        // scrollLoadMore(() => {
        //     loadMore()
        // })
    }

    componentWillUnmount() {
        removeScrollListener()
        clearInterval(id)
    }

    render() {
        const {...rest} = this.props;
        return (
            <div className="limits-list">
                {rest.list.map((item, index) => (
                    <div styleName="item" key={"tradeList_" + index}>
                        <div styleName="line1">
                            <div styleName="info">
                                <div styleName="info-item">
                                    <span styleName="name">{item.品种}</span>
                                    <span
                                        styleName={item.方向 === 0 ? "down" : "up"}>{item.方向 === 0 ? "买" : "卖"}</span>
                                </div>
                                <div styleName="info-item">
                                    <span styleName="time">{item.类型 === 1 ? '当天有效' : '永久有效'}</span>
                                </div>
                            </div>
                            <div styleName="action">
                                <span onClick={rest.cancel(item)} styleName="ping-btn">删除</span>
                                <span onClick={rest.modify(item)} styleName="ping-btn">修改</span>
                            </div>
                        </div>
                        <Flex styleName="price">
                            {/*<Flex.Item styleName="price-item">*/}
                                {/*<p>{item.均价}</p>*/}
                                {/*<p>均价</p>*/}
                            {/*</Flex.Item>*/}
                            <Flex.Item styleName="price-item">
                                <p>{item.止损价格}</p>
                                <p>止损价格</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p>{item.止赢价格}</p>
                                <p>止盈价格</p>
                            </Flex.Item>
                            <Flex.Item styleName="price-item">
                                <p>{item.类型 === 1 ? '当天有效' : '永久有效'}</p>
                                <p>类型</p>
                            </Flex.Item>
                        </Flex>
                    </div>
                ))}
                {/*<NoMore nomore={rest.nomore}/>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.limits.list,
    nomore: state.limits.nomore,
})

const mapDispatchToProps = (dispatch, props) => ({
    getList: () => {
        dispatch({
            type: 'limits/getList'
        })
    },
    loadMore: () => {
        dispatch({
            type: 'limits/loadMore'
        })
    },
    cancel: item => () => {
        Modal.alert('撤回', `确认撤回${item.品种}吗？`, [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    dispatch({
                        type: 'limits/del',
                        params: {
                            instrument:item.品种,
                            direction:item.方向
                        }
                    })
                }
            }
        ])
    },
    modify: item => () => {
        dispatch({
            type:'limits/assignLimitEarnData',
            data:item
        })
        dispatch({
            type:'limits/showLimitEarn',
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(FundList, styles))
