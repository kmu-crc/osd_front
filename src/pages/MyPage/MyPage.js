import React, {Component} from 'react'
import MypageHeader from 'components/MypageHeader';
class MyPage extends Component {
    render(){
        return(
            <>
                <MypageHeader/>
                <a href="/myinfomodify">내 정보 수정하기</a>
            </>
        )
    }
}

export default MyPage