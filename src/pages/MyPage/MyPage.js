import React, {Component} from 'react'
import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';
class MyPage extends Component {
    render(){
        return(
            <>
                <MypageHeader/>
                <MypageBody />
            </>
        )
    }
}

export default MyPage