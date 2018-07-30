import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List} from 'antd-mobile'
import Button from '../../../components/button/button'
import router from 'umi/router'
const Item = List.Item


const Example = ({data,credit}) => {
    return (
        <div>
            <Header
                title={'风险查询'}
                rightText={'记录'}
                rightCallBack={() => router.push('redits')}
            />
            {data.map((item,index) => (
                <Item
                    key={'capital_'+index}
                    extra={item.value}
                >{item.title}</Item>
            ))}
            <div
                style={{padding:'15px'}}
            >
                <Button
                    title={'重新授信'}
                    callBack={credit}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    data:state.capital.data
})

const mapDispatchToProps = (dispatch,props) => ({
    credit:() => {
        dispatch({
            type:'capital/credit'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

