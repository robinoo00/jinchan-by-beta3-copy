import CSSModules from 'react-css-modules'
import styles from '../styles/rule.css'
import {connect} from 'dva'
import React from 'react'

class Example extends React.Component{
    render(){
        return(
            <div styleName="wrap">
                <div styleName="pt20">
                    <table>
                        <tbody><tr>
                            <td width="30%;">结算货币</td>
                            <td width="70%">人民币</td>
                        </tr>
                        <tr>
                            <td>上市交易所</td>
                            <td>上海期货交易所</td>
                        </tr>
                        <tr>
                            <td>中文名称</td>
                            <td>白银</td>
                        </tr>
                        <tr>
                            <td>品种代码</td>
                            <td style={{color:'red'}}>AG</td>
                        </tr>
                        <tr>
                            <td>报价单位</td>
                            <td>元（人民币）/千克</td>
                        </tr>
                        <tr>
                            <td>最小变动价位</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>交易单位</td>
                            <td>15千克/手</td>
                        </tr>
                        <tr>
                            <td>最小变动值</td>
                            <td>15元</td>
                        </tr>
                        <tr>
                            <td>盘内保证金</td>
                            <td>15000元人民币</td>
                        </tr>
                        <tr>
                            <td>交易时间</td>
                            <td>
                                白天<br/>
                                09:00:00 - 10:15:00<br/>
                                10:30:00 - 11:30:00<br/>
                                13:30:00 - 15:00:00<br/>
                                晚上<br/>
                                21:00:00 - 02:30:00<br/>
                                法定节假日(不包含双休日)前第一个工作日的不进行连续交易
                            </td>
                        </tr>
                        <tr>
                            <td>涨跌停</td>
                            <td>上一交易日结算价±5%</td>
                        </tr>
                        <tr>
                            <td>限制日内交易强平时间</td>
                            <td style={{backgroundColor:'#ffff00',color:'#ff3e00'}}>14:50 和 02:20 强平</td>
                        </tr>
                        <tr>
                            <td>限制开仓条件</td>
                            <td style={{backgroundColor:'#ffff00',color:'#ff3e00'}}>劣后资金低于强平线和单边行情接近涨跌停板</td>
                        </tr>
                        {/*<tr>*/}
                        {/*<td style={{backgroundColor:'#ffff00',color:'#ff3e00'}}>接近涨停板附近禁止卖，接近跌停板附近禁止买</td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td>隔夜设置</td>
                            <td style={{backgroundColor:'#ffff00',color:'#ff3e00'}}>目前不允许隔下午和隔夜</td>
                        </tr>
                        {/*<tr>*/}
                            {/*<td>交易手续费(单边)</td>*/}
                            {/*<td style={{backgroundColor:'#ffff00',color:'#ff3e00'}}>80元（人民币）</td>*/}
                        {/*</tr>*/}
                        <tr>
                            <td>最低授信交易保证金</td>
                            <td>3000元人民币</td>
                        </tr>
                        <tr>
                            <td>最低授信额</td>
                            <td>50000元人民币</td>
                        </tr>
                        <tr>
                            <td>授信区间</td>
                            <td>1.保证金大于3000，少于5000，默认授信金额5万<br/>
                                2.保证金大于5000，少于1.5万，默认授信金额10万<br/>
                                3.保证金大于1.5万，少于2.5万，默认授信金额20万</td>
                        </tr>
                        <tr>
                            <td>强制平仓比例</td>
                            <td>自有资金低于优先（授信）资金的3%</td>
                        </tr>
                        <tr>
                            <td>止盈、止损</td>
                            <td>无点位限制(在每日价格最大波动限制内)</td>
                        </tr>
                        <tr>
                            <td>最大持仓限制</td>
                            <td>无限制，合约归属结算币种授信累计最大100手（单边持仓限100手）</td>
                        </tr>
                        <tr>
                            <td>支持银行</td>
                            <td>根据系统内通道</td>
                        </tr>
                        <tr>
                            <td rowSpan={5}>出入金时间</td>
                            <td>资金入金时间：交易日时间 <br/>09:00-16:30 20:30-02:20</td>
                        </tr>
                        <tr>
                            <td>资金出金时间：交易日时间<br/>09:00-16:30</td>
                        </tr>
                        <tr>
                            <td>在交易日时间：16:30-20:30资金入金的客户资金将在20:30到账</td>
                        </tr>
                        <tr>
                            <td>02:20-09:00资金入金的客户资金将在09:00到账</td>
                        </tr>
                        <tr>
                            <td>（一天限出金3次）</td>
                        </tr>
                        </tbody></table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

