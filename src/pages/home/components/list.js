import CSSModules from 'react-css-modules'
import styles from '../styles/home.css'
import router from 'umi/router'
import React from 'react'
import Loading from '../../../components/loading-nomore/bottom-tip'
import {connect} from 'dva'
import {Flex} from 'antd-mobile'

let id = 0;

class HomeList extends React.Component {
    render() {
        const {list} = this.props;
        return (
            <div styleName="mod-index-list">
                <div styleName="wrap">
                    <div styleName="title">
                        <span>实盘交易</span>
                    </div>
                    {list.length === 0 ? <Loading/> :
                        <div styleName="mod-menu">
                            {list.map((item, index) => (
                                <Flex onClick={() => {
                                    router.push({pathname: '/trade2', query: {code: item.合约}})
                                }} key={'home_list_item' + index} styleName="list-item">
                                    <Flex.Item styleName="tit">
                                        <p styleName="txt-s16">
                                            <span styleName="hot-wrap">{item.合约别名}<i styleName="hot"></i></span>
                                        </p>
                                        <p styleName="desc">交易所:{item.交易所}</p>
                                    </Flex.Item>
                                    <Flex.Item styleName="fr"
                                          style={item.涨跌幅 < 0 ? {color: '#01B28E'} : {}}>{item.最新价}<br/>{item.涨跌幅}%</Flex.Item>
                                    <Flex.Item styleName="mod-arrow-r"></Flex.Item>
                                </Flex>
                            ))}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.home.list
})

const mapDispatchToProps = (dispatch, props) => ({
    assignList: (data) => {
        dispatch({
            type: 'home/assignList',
            data: data
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(HomeList, styles))

