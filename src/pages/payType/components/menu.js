import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List,WhiteSpace,Modal} from 'antd-mobile'
import icon1 from '../images/wx_alipay.jpg'
import router from 'umi/router'
import React from 'react'
import config from '../../../utils/config'
const Item = List.Item;
const Brief = Item.Brief;

class Example extends React.Component{
    componentDidMount(){
        Modal.alert('',<img style={{width:'100%'}} src={'http://47.100.123.216:1225/public/agreement.png?time='+new Date().valueOf()}/>,[
            {text:'我已知晓',onPress:() => {}}
        ])
    }
    render(){
        return(
            <div>
                <Header
                    title={'账户充值'}
                    url={'/personal'}
                />
                <List renderHeader={() => '选择支付方式'} className="my-list">
                    <Item
                        // onClick={() => {router.push({pathname:'/pay',query:{type:'alipay'}})}}
                        onClick={() => {window.location.href = `http://47.100.123.216:1220/capital/niubipay1?account=${localStorage.getItem(config.ACCOUNT)}`}}
                        multipleLine
                        arrow={"horizontal"}
                        thumb={<img src={icon1} style={{width:'.71rem',height:'.37rem'}}/>}
                    >
                        <div style={{fontSize:'.16rem',color:'#fff'}}>微信支付宝</div>
                        <Brief style={{fontSize:'.1rem'}}>手机支付，免手续费</Brief>
                    </Item>
                    <WhiteSpace size={"xs"} style={{backgroundColor:'#20212b'}}/>
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

