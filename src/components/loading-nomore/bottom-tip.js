import {ActivityIndicator} from 'antd-mobile'
import styles from './style.less'

const BottomTip = ({nomore = false}) => (
    <div>
        {!nomore ? <div style={{display:'flex',justifyContent:'center'}}><ActivityIndicator color={"#fff"} text="正在加载..." /></div> :
            <div className={styles.nomore}>我也是有底线的</div>
        }
    </div>
)

export default BottomTip
