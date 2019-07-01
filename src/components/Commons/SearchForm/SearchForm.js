import React, {Component} from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
// todo:
// border: 1.5px solid #707070;
const SearchContainer = styled.div`
    width: 327px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0px 0px #888888;
    justfy-content: space-between;
    padding-left: 12.7px;
    input {
        text-indent: 5px;
        border: 1px solid #707070;
        border-radius: 20px;
    }
    .search-icon {
        paddding-top: 6.11px;
        width: 21.49px;
        height: 21.49px;
        transform: translateX(-170%);
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