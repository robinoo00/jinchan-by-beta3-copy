import CSSModules from 'react-css-modules'
import styles from '../styles/home.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import Banner from './banner'
import Nav from './nav'
import List from './list'
import router from 'umi/router'
import Position from './position-list'
import config from "../../../utils/config";

const Home = () => (
    <div>
        <Header
            title={'金蟾操盘'}
            leftText={'客服'}
            leftCallBack={() => {router.push({pathname:'/help'})}}
            rightText={'新手指引'}
            rightCallBack={() => {router.push({pathname:'/guide'})}}
            back={false}
        />
        <Banner/>
        <Nav/>
        <List/>
        {localStorage.getItem(config.KEY) ? <Position/> : null}
    </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Home, styles))

