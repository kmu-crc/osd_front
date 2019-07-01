import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const AlarmContainer = styled.div`
    width: 34px;
    height: 34px;
`
const AlarmLabel = styled.div`
    position: absolute;
    transform: translate(450%,-500%);
    width: 6px;
    height: 6px;
    position: fixed;
    border-radius: 15px;
    background-color: red;
`

class Alarm extends Component {
    state = { test_flag: true }
    switchFlag = () => {
        this.setState({ test_flag: !this.state.test_flag })
    }
    render() {
        const { alarms } = this.props
        return (
            <AlarmContainer onClick={this.switchFlag}>
                <Icon name="alarm" size="large" className="alarm-icon" />
                {/* {alarms.count > 0 && <AlarmLabel />} */}
                {this.state.test_flag && <AlarmLabel />}
            </AlarmContainer>
        )
    }
}
export default Alarm