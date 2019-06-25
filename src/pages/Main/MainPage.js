import React, { Component } from 'react'
import ClientTemplate from "templates/ClientTemplate"
// import MainContainer from ''

class MainContainer extends Component {
    render() {
        return (
            <div><br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer<br/><br/><br/>MainContainer</div>
        )
    }
}

class MainPage extends Component {
    render() {
        return (
            <ClientTemplate>
                <MainContainer />
            </ClientTemplate>
        )
    }
}


export default MainPage