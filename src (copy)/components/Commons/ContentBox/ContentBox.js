import React, { Component } from 'react'
import styled from 'styled-components'
import opendesign_style from "opendesign_style"

const Container = styled.div`
    @media only screen and (max-width: 767px) and (min-width: 320px){
        padding: 0 20px;
        width: ${opendesign_style.gridContent.mobile};
    }
    @media only screen and (max-width: 991px) and (min-width: 768px) and (min-height: 320px){
        width: ${opendesign_style.gridContent.tablet};
    }
    @media only screen and (min-width: 992px){
        width: ${opendesign_style.gridContent.computer};
    }
    @media only screen and (max-width: 1919px) and (min-width: 1200px){
        width: ${opendesign_style.gridContent.largeScreen};
    }
    @media only screen and (max-width: 1920px){
        width: ${opendesign_style.gridContent.largeScreen};
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