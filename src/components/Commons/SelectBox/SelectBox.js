import React, { Component } from 'react'
import styled from 'styled-components'

const SelectBoxContainer = styled.div`
border: 1px solid purple;
  .select-box--container {
    z-index: 950;
    position: relative;
    border: 1px solid #EFEFEF;
    margin: 0px;
    padding: 0px;
    width: ${props => props.width};
    font-family: Noto Sans KR;
    font-weight: 300;
    font-size: 20px;
    line-height: 29px;
    color: #707070;
    background-color: white;
  }
  
  .select-box--box {
    background: #EFEFEF;
    width: 100%; 
    margin-top: 10.04px;
    /*margin-left: 27px;*/
  }
  
  .select-box--arrow {
    position: absolute;
    width: 28.82px;
    height: 29.92px;
    margin: 0px;
    padding: 0px;
    display: inline-block;
    float: right;
    background: #EFEFEF;
  }
  .select-box--arrow-down {
    position: absolute;
    left: 45%;
    top: 45%;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #707070;
  }

  .select-box--selected-item {
    display: inline-block;
    height: 100%;
    width: 100%;
    vertical-align: middle;
  }
  
  .select-box--items {
    background-color: white;/* #EFEFEF;*/
    font-size: 20px;
  }
  
  .select-box--items div {
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 6px;
    padding-left: 20px;
  }
  
  .select-box--items div.selected {
    background-color: #EFEFEF;
    background-image: url('/check.png');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: 2px 8px;
  }
  
  .select-box--items div:hover {
    background-color: #FFF;
  }
  
`
class SelectBox extends Component {
  state = {
    ...this.props,
    items: this.props.items || [],
    selectedItem: this.props.items[0] || this.props.selectedItem,
    showItems: false,
  }
  dropDown = () => {
    this.setState(prevState => ({ showItems: !prevState.showItems }))
  }
  selectItem = (item) => {
    this.setState({ selectedItem: item, showItems: false, })
  }
  clicked = () => {
    if (this.state.showItems === false)
      document.addEventListener("mousedown", this.handleClickOutside)
  }
  myRef = React.createRef()
  handleClickOutside = e => {
    if (this.myRef.current === null) return
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ showItems: false })
      document.removeEventListener("mousedown", this.handleClickOutside)
    }
  }
  render() {
    const width = this.props.width - 30
    console.log("w:", width + "px")
    return <>
      <SelectBoxContainer onClick={this.clicked} ref={this.myRef} >
        <div className="select-box--box">
          <div className="select-box--container" width={this.props.width} onClick={this.dropDown}>
            <div className="select-box--selected-item">
              {this.state.selectedItem.value}</div>
            <div className="select-box--arrow">
              <span className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`} /></div>
          </div>
          <div className="select-box--items" style={{ display: this.state.showItems ? 'block' : 'none' }}>
            {this.state.items.map(item =>
              <div key={item.id} onClick={() => this.selectItem(item)} className={this.state.selectedItem === item ? 'selected' : ''}> {item.value}</div>)}
          </div>
        </div>
        <input type="hidden" name={this.state.name} value={this.state.selectedItem.id} />
      </SelectBoxContainer>
    </>
  }
}

export default SelectBox
