import Button from '../../../components/button/button'
import styles from '../styles/footer.less'
import {connect} from 'dva'
import React from 'react'
import {Flex} from 'antd-mobile'

@connect(({routing,limits}) => ({
    code:routing.location.query.code,
    list:limits.list
}))

class Footer extends React.Component{
    _show = (direction) => () => {
        const {dispatch,code} = this.props
        dispatch({
            type:'limits/showLimitEarnAdd'
        })
        dispatch({
            type:'limits/assignTempData',
            data:{
                2:code,
                3:direction
            }
        })
    }
    render(){
        const {list} = this.props
        let buy = true
        let sell = true
        for(let item of list){
            if(item.方向 === 0){
                buy = false
            }
            if(item.方向 === 1){
                sell = false
            }
        }
        return(
            <Flex className={styles["footer-wrap"]}>
                {buy ? <Flex.Item>
                    <Button
                        title={'添加(买)'}
                        callBack={this._show(0)}
                    />
                </Flex.Item> : null}
                {sell ? <Flex.Item>
                    <Button
                        title={'添加(卖)'}
                        callBack={this._show(1)}
                    />
                </Flex.Item> : null}
            </Flex>
        )
    }
}

export default Footer
