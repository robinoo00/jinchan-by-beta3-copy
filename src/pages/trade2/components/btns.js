import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import {Modal} from 'antd-mobile'
import config from '../../../utils/config'
import React from 'react'
import {Toast,Flex} from 'antd-mobile'
import Warn from '../../../components/alert/warn'

const prompt = Modal.prompt;

let id;

class Btns extends React.Component {
    state = {
        btnIndex:0,
        showAlert:false,
        alertText:'',
        alertPirce:0,
        alertCallBack:null
    }
    btn = (index,price) => {
        const {buy,ping_buy,sell,ping_sell,num} = this.props;
        let callback = null;
        let text = '';
        switch (index){
            case 1:
                text = `买入开仓${num}手`
                callback = () => {
                    buy();
                    this.setState({
                        showAlert:false
                    })
                }
                break;
            case 2:
                text = '平仓买入'
                callback = () => {
                    ping_buy();
                    this.setState({
                        showAlert:false
                    })
                }
                break;
            case 3:
                text = `卖出开仓${num}手`
                callback = () => {
                    sell();
                    this.setState({
                        showAlert:false
                    })
                }
                break;
            case 4:
                text = '平仓卖出'
                callback = () => {
                    ping_sell();
                    this.setState({
                        showAlert:false
                    })
                }
                break;
        }
        if (localStorage.getItem(config.TRADE_SWITCH) === null || localStorage.getItem(config.TRADE_SWITCH) === "true") {
            this.setState({
                btnIndex:index,
                showAlert:true,
                alertText:text,
                alertPirce:price,
                alertCallBack:callback
            })
        } else {
            callback && callback();
        }
    }
    componentWillReceiveProps() {
        const {getPingNum, no_trade} = this.props;
        if (no_trade) {
            clearInterval(id);
        }
    }

    componentDidMount() {
        const {getPingNum} = this.props;
        id = setInterval(getPingNum, 1000)
    }

    componentWillUnmount() {
        clearInterval(id);
    }

    render() {
        const {...rest} = this.props;
        return (
            <div>
                <Warn
                    title={'委托确认'}
                    content={
                        <div>
                            <p>确定下单吗？</p>
                            <p>{rest.data.合约别名}，{this.state.alertPirce}元，{this.state.alertText}</p>
                        </div>
                    }
                    visible={this.state.showAlert}
                    callBack={this.state.alertCallBack}
                    hide={() => {this.setState({showAlert:false})}}
                />
                <Flex>
                    <Flex.Item>
                        <div styleName="trade-btn"
                             onClick={rest.price_type === 1 ? () => {this.btn(1,rest.data.最新价)} : rest.limitOrder('买入' + rest.num + '手', rest.buy)}>
                            <div styleName="btn-num">{rest.data.买价 ? rest.data.买价 : '...'}</div>
                            <div styleName="btn-title">买</div>
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <div styleName="trade-btn"
                             style={{backgroundColor:'#a703a2'}}
                             onClick={() => {this.btn(2,rest.data.最新价)}}>
                            <div styleName="btn-num">持{rest.buy_num}手</div>
                            <div styleName="btn-title">平买</div>
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <div styleName="trade-btn"
                             style={{backgroundColor:'#1eb71e'}}
                             onClick={rest.price_type === 1 ? () => {this.btn(3,rest.data.最新价)} : rest.limitOrder('卖出' + rest.num + '手', rest.sell)}>
                            <div styleName="btn-num">{rest.data.卖价 ? rest.data.卖价 : '...'}</div>
                            <div styleName="btn-title">卖</div>
                        </div>
                    </Flex.Item>
                    <Flex.Item>
                        <div styleName="trade-btn"
                             style={{backgroundColor:'#0074b1'}}
                             onClick={() => {this.btn(4,rest.data.最新价)}}>
                            <div styleName="btn-num">持{rest.sell_num}手</div>
                            <div styleName="btn-title">平卖</div>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    buy_num: state.trade2.buy_num,
    sell_num: state.trade2.sell_num,
    no_trade: state.trade2.no_trade,
    num: state.trade2.num,
    price_type: state.trade2.price_type
})

const mapDispatchToProps = (dispatch, props) => ({
    getPingNum: () => {
        dispatch({
            type: 'trade2/getPingNum'
        })
    },
    limitOrder: (title, callback) => () => {
        prompt(
            title,
            title.includes('买') ? '买入需低于最新价' : '卖出需高于最新价',
            [
                {text: '取消'},
                {
                    text: '提交', onPress: value => {
                        if(isNaN(value)){
                            window.toast('价格有误')
                            return;
                        }
                        if(value === ""){
                            window.toast('价格不能为空')
                            return;
                        }
                        dispatch({
                            type:'trade2/assignLimitPirce',
                            price:value
                        })
                        callback && callback()
                    }
                },
            ],
        )
    },
    // ifSwitch: (title, callback) => () => {
    //     if (localStorage.getItem(config.TRADE_SWITCH) === null || localStorage.getItem(config.TRADE_SWITCH) === "true") {
    //         Modal.alert(title, '', [
    //             {
    //                 text: '取消', onPress: () => {
    //                 }
    //             },
    //             {
    //                 text: '确定', onPress: () => {
    //                     callback && callback();
    //                 }
    //             }
    //         ])
    //     } else {
    //         callback && callback();
    //     }
    // },
    buy: () => {
        window.loading('交易中...', 0);
        dispatch({
            type: 'trade2/order',
            direction: 0,
            offset: 0
        })
    },
    sell: () => {
        window.loading('交易中...', 0);
        dispatch({
            type: 'trade2/order',
            direction: 1,
            offset: 0
        })
    },
    ping_buy: () => {
        window.loading('交易中...', 0);
        dispatch({
            type: 'trade2/ping',
            direction: 0
        })
    },
    ping_sell: () => {
        window.loading('交易中...', 0);
        dispatch({
            type: 'trade2/ping',
            direction: 1
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Btns, styles))

