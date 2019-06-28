import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const AlarmContainer = styled.div`
    width: 34px;
    height: 34px;
    display: flex;
`
const AlarmLabel = styled.div`
  width: 6px;
  height: 6px;
  position: fixed;
  border-radius: 15px;
  background-color: red;
`

class Alarm extends Component {
    state = {}
    render() {
        const { alarms } = this.props
        return (
            <AlarmContainer>
                <Icon name="alarm" size="large" className="alarm-icon" />
                {alarms.count > 0 && <AlarmLabel />}
            </AlarmContainer>
        )
    }
}
export default Alarm