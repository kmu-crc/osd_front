import React, { Component } from 'react'
import styled from 'styled-components'
import zoom from "source/zoom.svg"

const SearchContainer = styled.div`
    display: ${props => props.visible};
    background-color: #FFFFFF;
    border-radius: 20px;
    border: 1.5px solid #707070;
    width: 327px;
    height: 36px;
    background: url(${zoom});
    background-size: 21.49px 21.49px;
    background-repeat: no-repeat;
    background-position: right 12.7px top 4px;
    &:focus{
        outline: 1.5px solid red;
    }
    input {
        outline: none;
        width: 280px;
        border: none;
        margin: 0px 10px;
    }
    .shadow_button{
        position: absolute;
        transform: translate( 285px, -2px);
        width:36px;
        height:36px;
        cursor: pointer;
    }
`
class SearchForm extends Component {
    _search = () => { }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // console.log('Enter')
            window.location.href = '/search'
        }
    }
    goSearch = () => {
        window.location.href = '/search'
    }
    render() {
        return (
            <SearchContainer visible={this.props.visible === 1 ? "block" : "none"} onKeyDown={this._handleKeyDown}>
                <div className="shadow_button" onClick={this.goSearch} />
                <input type="text" placeholder="Search..." />
            </SearchContainer>)
    }
}

export default SearchForm