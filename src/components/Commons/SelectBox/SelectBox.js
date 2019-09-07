import React, { Component } from 'react'
import styled from 'styled-components'

const SelectBoxContainer = styled.div`
   div{z-index: 950;}
  .select-box--container {
    position: relative;
    border: 1px solid #EFEFEF;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    font-family: Noto Sans KR;
    font-weight: 300;
    font-size: 20px;
    line-height: 29px;
    color: #707070;
    background-color: #EFEFEF;
  }
  
  .select-box--box {
    z-index: 950;
    background: #EFEFEF;
    width: 100%;
    margin-top: 10.04px;
    /*margin-left: 27px;*/
  }
  
  .select-box--arrow {
    z-index: 950;
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
    z-index: 950;
    position: absolute;
    left: 25%;
    top: 35%;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #707070;
  }

  .select-box--selected-item {
    z-index: 950;
    display: inline-block;
    height: 100%;
    width: 92%;
    vertical-align: middle;
    padding-left: 12px;
  }
  
  .select-box--items {
    z-index: 950;
    background-color:  #EFEFEF;
    font-size: 20px;
  }
  
  .select-box--items div {
    z-index: 950;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 12px;
  }
  
  .select-box--items div.selected {
    z-index: 950;
    background-color: #FFFFFF;
    background-image: url('/check.png');
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: 2px 8px;
  }
  
  .select-box--items div:hover {
    z-index: 950;
    background-color: #000;
    color:white;
    opacity: 0.3;
  }
  
`
class SelectBox extends Component {
  state = {
    ...this.props,
    items: this.props.items || [],
    selectedItem: this.props.default || this.props.items[0] || this.props.selectedItem,
    showItems: false,
  }
  dropDown = () => {
    this.setState(prevState => ({ showItems: !prevState.showItems }))
  }
  selectItem = (item) => {
    this.setState({ selectedItem: item, showItems: false, })
    this.props.onSelectedItem(item)
  }
  clicked = () => {
    if (this.state.showItems === false) {
      document.addEventListener("mousedown", this.handleClickOutside)
    }
  }
  myRef = React.createRef()
  handleClickOutside = e => {
    if (this.myRef.current === null) return
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ showItems: false })
      document.removeEventListener("mousedown", this.handleClickOutside)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({ items: nextProps.items });
    }
  }
  render() {
    return <>
      <SelectBoxContainer onClick={this.clicked} ref={this.myRef} >
        <div className="select-box--box">
          <div className="select-box--container" onClick={this.dropDown}>
            <div className="select-box--selected-item" width={this.props.width + "px"}>
              {this.state.selectedItem.text}</div>
            <div className="select-box--arrow">
              <span className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`} /></div>
          </div>
          <div className="select-box--items" style={{ display: this.state.showItems ? 'block' : 'none' }}>
            {this.state.items.map((item, index) =>
              <div key={index} value={item.value} onClick={() => this.selectItem(item)} className={this.state.selectedItem === item ? 'selected' : ''}> {item.text}</div>)}
          </div>
        </div>
        <input type="hidden" name={this.props.name} value={this.state.selectedItem.id} />
      </SelectBoxContainer>
    </>
  }
}

export default SelectBox
