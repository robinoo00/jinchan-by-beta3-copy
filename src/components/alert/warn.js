import CSSModules from 'react-css-modules'
import styles from './warn.less'
import React from 'react'

class Warn extends React.Component{
    hide = () => {
        this.setState({
            visible:false
        })
    }
    render(){
        const {title,content,callBack,visible = false,hide} = this.props;
        return(
            <div styleName={'warn-wrap'} style={visible ? {display:'block'}:{display:'none'}}>
                <div styleName="mask"></div>
                <div styleName="warn">
                    <div styleName="title">
                        {title}
                    </div>
                    <div styleName="content">
                        {content}
                    </div>
                    <div styleName="actions">
                        <span onClick={hide}>取消</span>
                        <span onClick={callBack}>下单</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default CSSModules(Warn,styles)
