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
`;
class SearchForm extends Component {
    state = {
        searchKeyword: "",
    };
    goSearch = () => {
        const addrText = window.location.href.toString();
        let thisCate = "/design";
        if(addrText.indexOf('/group')!==-1)
        {
            thisCate="/group"
        }
        else if(addrText.indexOf('/designer')!==-1)
        {
            thisCate="/designer"
        }
        else if(addrText.indexOf('/design')!==-1)
        {
            thisCate="/design"
        }
        window.location.href = '/search'+thisCate+'/null/'+this.state.searchKeyword;
    };

    submitEnter = (e) => {
        if (e.keyCode === 13) {
            this.goSearch();
        }
    };
    handleKeyDown = (e)=>{
        if(e.keyCode === 13){
            this.goSearch();
        }
        const target = e.target;
        const value = target.value;
        console.log(e.keyCode);
        let regExp = /^[a-zA-Zㄱ-힣0-9"_-]*$/i;
        if (!value.match(regExp)) {
            alert("특수문자는 사용할 수 없습니다.");
            target.value = "";
            return;
        } else {
            this.setState({
                searchKeyword: value
            });
        }


    }
    render() {
        return (
            <SearchContainer visible={this.props.visible === 1 ? "block" : "none"} >
                <div className="shadow_button" onClick={this.goSearch} />
                <input type="text" placeholder="Search..." maxLength = "100" onChange={this.handleKeyDown} onKeyDown={this.submitEnter} value={this.state.searchKeyword}/>
            </SearchContainer>)
    }

}


export default SearchForm