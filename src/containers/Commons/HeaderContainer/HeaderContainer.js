import React, { Component } from 'react'
import Header from "components/Commons/Header"

class HeaderContainer extends Component {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

export default HeaderContainer
