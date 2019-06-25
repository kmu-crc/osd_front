import React, { Component } from 'react'
import styled from 'styled-components'
import OSDstyle from "OpenDesignStyle"

const Container = styled.div`
    margin: 0 auto;
    @media only screen and (max-width: 767px) and (min-width: 320px){
        padding: 0 20px;
        width: ${OSDstyle.gridContent.mobile};
    }
    @media only screen and (max-width: 991px) and (min-width: 768px) and (min-height: 320px){
        width: ${OSDstyle.gridContent.tablet};
    }
    @media only screen and (min-width: 992px){
        width: ${OSDstyle.gridContent.computer};
    }
    @media only screen and (max-width: 1919px) and (min-width: 1200px){
        width: ${OSDstyle.gridContent.largeScreen};
    }
    @media only screen and (max-width: 1920px){
        width: ${OSDstyle.gridContent.largeScreen};
    }
`
class ContentBox extends Component {
    render() {
        return (
            <Container className={this.props.className}>{this.props.children}</Container>
        )
    }
}

export default ContentBox