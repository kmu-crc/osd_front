import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import MainContainer from ''

class MainContainer extends Component {
    render() {
        return (
            <div><br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br /><Link to="/tour">TOUR</Link>MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer<br /><br /><br />MainContainer</div>
        )
    }
}

class MainPage extends Component {
    render() {
        return (
                <MainContainer />
        )
    }
}


export default MainPage