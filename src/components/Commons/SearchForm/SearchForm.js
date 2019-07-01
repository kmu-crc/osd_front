import React, {Component} from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
// todo:
const SearchContainer = styled.div`
    width: 327px;
    height: 30px;
    margin: 0 auto;
    border: 1.5px solid #707070;
    border-radius: 20px;
    box-shadow: 0px 0px #888888;
    justfy-content: space-between;
    padding-left: 12.7px;
    input {
        focus:0;
        border: none;
    }
    .search-icon {
        paddding-top: 6.11px;
        width: 21.49px;
        height: 21.49px;
    }
    `
// right: 12.7px;
class SearchForm extends Component {
    state = {}
    _search = () => { }
    _handleKeyDown = (e) => {

        if (e.key === 'Enter') {
            console.log('Enter')
        }
    }
    render() {
        return (<SearchContainer onKeyDown={this._handleKeyDown}>
            <input type="text" placeholder="Search..." />
            <Icon onClick={this._search} className="search-icon" name="search" />
        </SearchContainer>)
    }
}

export default SearchForm