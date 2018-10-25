import React from 'react'
import {Modal, List, Button,InputItem,Toast} from 'antd-mobile'
import {connect} from 'dva'
import {createForm} from 'rc-form'
import router from 'umi/router'
import config from "../../../utils/config";

let id = 0;

class LimitEarn extends React.Component{
    state = {
        price:0
    }
    componentDidMount(){
        let data = sessionStorage.getItem(config.K_DATA_LIST);
        if (typeof data != 'undefined') {
            this._assignPirce(data)
        }
        id = setInterval(() => {
            data = sessionStorage.getItem(config.K_DATA_LIST);
            if (typeof data != 'undefined') {
                this._assignPirce(data)
            }
        }, 1000)
    }
    _assignPirce = (resource) => {
        const code = sessionStorage.getItem(config.TRADE_CODE);
        const list = JSON.parse(resource);
        const data = list.filter(item => item.合约 === code)[0];
        this.setState({
            price:data.最新价
        })
    }
    render(){
        const {code,visible,inputs,hide,form,submit,list} = this.props;
        return(
            <Modal
                popup
                visible={visible}
                onClose={hide}
                animationType="slide-up"
            >
                <List renderHeader={() => <div>
                    止损止盈({code}) <span style={{position:'absolute',right:0,marginRight:'10px'}}>最新价:{this.state.price}</span>
                </div>} className="popup-list">
                    {inputs.map((i, index) => (
                        <InputItem
                            {...form.getFieldProps(i.name,{
                                // rules: [{
                                //     required: true, message: i.placeholder,
                                // }],
                            })}
                            key={index}
                            clear
                            placeholder={i.placeholder}
                        >{i.text}</InputItem>
                    ))}
                    <List.Item>
                        <Button inline style={{width:'47%',height:'40px',lineHeight:'40px'}} onClick={hide}>取消</Button>
                        <Button inline type="primary"style={{width:'47%',float:'right',height:'40px',lineHeight:'40px'}} onClick={submit}>设置</Button>
                    </List.Item>
                </List>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    code:state.limits.code,
    visible:state.limits.limit_earn.visible,
    inputs:state.limits.limit_earn.inputs,
    list:state.limits.list
})

const mapDispatchToProps = (dispatch,props) => ({
    submit: () => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                dispatch({
                    ...value,
                    type:'limits/modify',
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    },
    hide: () => {
        dispatch({
            type:'limits/hideLimitEarn'
        })
    }
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(LimitEarn))

