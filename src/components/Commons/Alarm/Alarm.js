import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
// todo:
class Alarm extends Component {
    state = {}
    render() {
        const { alarms } = this.props
        return (alarms ? <div><Icon name='alarm' /></div> : <div>_alarm</div>)
    }
}
export default Alarm