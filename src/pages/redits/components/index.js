import React from 'react'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import List from './list'

class Redits extends React.Component{
    render(){
        const {list} = this.props;
        return(
            <div>
                <Header
                    title={'授信记录'}
                />
                <List/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state.redits.list
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(Redits)
