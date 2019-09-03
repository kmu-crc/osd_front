import React, { Component } from 'react'
import styled from 'styled-components'
import zoom from "source/zoom.svg"
import { all } from 'q';

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
            const addrText = window.location.href.toString();
            let thisCate = "#all";
                if(addrText.indexOf('/group')!=-1)
                {
                    thisCate="#group"
                }
                else if(addrText.indexOf('/designer')!=-1)
                {
                    thisCate="#designer"
                }
                else if(this.addrText.indexOf('/design')!=-1)
                {                
                    thisCate="#design"
                }
            window.location.href = '/search'+thisCate;
            }
        
    }
    goSearch = () => {
        const addrText = window.location.href.toString();
        let thisCate = "#all";
            if(addrText.indexOf('/group')!=-1)
            {
                thisCate="#group"
            }
            else if(addrText.indexOf('/designer')!=-1)
            {
                thisCate="#designer"
            }
            else if(this.addrText.indexOf('/design')!=-1)
            {                
                thisCate="#design"
            }
        window.location.href = '/search'+thisCate;
        }

    render() {
        console.log(this.state.keyword);
        return (
            <SearchContainer visible={this.props.visible === 1 ? "block" : "none"} onKeyDown={this.handleKeyDown}>
                <div className="shadow_button" onClick={this.goSearch} />
                <input type="text" placeholder="Search..." maxLength = "100" />

            </SearchContainer>)
    }
}

export default SearchForm