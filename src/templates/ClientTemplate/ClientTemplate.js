import React, { Component } from 'react'
import HeaderContainer from "containers/Commons/HeaderContainer"
import Footer from "components/Commons/Footer"


class ClientTemplate extends Component {
    render() {
        return (
            <div >
                <HeaderContainer />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

export default ClientTemplate