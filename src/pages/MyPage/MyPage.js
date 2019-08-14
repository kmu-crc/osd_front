import React, {Component} from 'react'
import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';
class MyPage extends Component {
    render(){
        return(
            <>
                <MypageHeader/>
                <MypageBody />
                <a href="/myinfomodify">내 정보 수정하기</a>
            </>
        )
    }
}

export default MyPage