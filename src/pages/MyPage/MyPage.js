import React, { Component } from 'react';
import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';

class MyPage extends Component {
    render() {
        return (
            <React.Fragment>
                <MypageHeader />
                <MypageBody />
            </React.Fragment>
        )
    }
}

export default MyPage