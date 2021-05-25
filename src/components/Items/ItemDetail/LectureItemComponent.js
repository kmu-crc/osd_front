import React, { Component } from 'react'
import styled from 'styled-components'

const LectureStatus = styled.div`
    .remain {
        font-size: 2rem;
    }
`
export default class LectureItemComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { max, current, } = this.props
        return (<LectureStatus>
            <div className="remain">{current} / {max}</div>
        </LectureStatus>)
    }
}