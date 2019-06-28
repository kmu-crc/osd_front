import React, { Component } from 'react'
import styled from 'styled-components'

// todo: 
class Notification extends Component {
    state = {}
    render() {
        const { count } = this.props
        return (count > 0 ? <div>notinoti</div> : null)
    }
}

export default Notification 