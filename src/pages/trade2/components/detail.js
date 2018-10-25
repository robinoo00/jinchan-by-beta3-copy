import React from 'react'
import router from 'umi/router'
import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import {Flex} from 'antd-mobile'

let id = 0;
class Detail extends React.Component {
    componentDidMount() {
        const {getPositionList} = this.props;
        id = setInterval(getPositionList, 1000);
    }

    componentWillUnmount() {
        clearInterval(id);
    }
    render(){
        let {earn,code} = this.props;
        return(
            <Flex styleName="detail-list">
                <Flex.Item>
                    <div styleName="trade-details">持仓盈亏: <span style={earn < 0 ? {color: '#01B28E'} : {color: '#E34C4D'}}>{earn}</span></div>
                </Flex.Item>
                <Flex.Item>
                    <div styleName="trade-details" onClick={() => {router.push({pathname:'/tradeList'})}}>
                        交易明细
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <div styleName="trade-details" onClick={() => {router.push({pathname:'/limits',query:{type:'all',code:code}})}}>
                        损盈明细
                    </div>
                </Flex.Item>
                {/*<Flex.Item>*/}
                    {/*<div styleName="trade-details" onClick={() => {router.push({pathname:'/limitList'})}}>*/}
                        {/*挂单明细*/}
                    {/*</div>*/}
                {/*</Flex.Item>*/}
            </Flex>
        )
    }
}

const mapStateToProps = state => ({
    earn: state.tradeList.earn,
    code: state.trade2.code,
})

const mapDispatchToProps = dispatch => ({
    getPositionList: () => {
        dispatch({
            type: 'tradeList/getPositionList'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Detail,styles))
