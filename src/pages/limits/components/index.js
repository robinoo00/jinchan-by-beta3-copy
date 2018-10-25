import React from 'react'
import List from './list'
import LimitEarn from './limit-earn-modify'
import LimitEarnAdd from './limit-earn-add'
import Footer from './footer'
import Footer2 from './footer2'
import Header from './header'
import {connect} from 'dva'

@connect(({routing}) => ({
    type:routing.location.query.type
}))

class Limits extends React.PureComponent{
    render(){
        const {type} = this.props
        console.log(type)
        return(
            <div>
                <Header/>
                <List/>
                {this.props.type === 'all' ? <Footer2/> : <Footer/>}
                <LimitEarn/>
                <LimitEarnAdd/>
            </div>
        )
    }
}
export default Limits
