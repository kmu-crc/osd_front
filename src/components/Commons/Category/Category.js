import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

const CategoryContainer = styled.div`
    z-index: 899;
    background-color: #FFFFFF;
    position: fixed;
    width: 100%;
    height: 20px;
    top: 55px;
    padding-left: 115px;
    display: flex;
    &.hidemenu {
        top: -55px;
        opacity: 0;
    }
    &.larger {
        height: 30px;
    }
    -webkit-transition: all 0.45s;
    -moz-transition: all 0.45s;
    -ms-transition: all 0.45s;
    -o-transition: all 0.45s;
    transition: all 0.45s;
`
const CategoryElement = styled.div`
    color: red;
    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 300;
    padding-right: 30px;
    cursor: pointer;
    :hover {}
`
// display: ${props => props.display === "yes" ? "display" : "none"};
const SubCategoryWrapper = styled.div`
    position: absolute;
    background: #FFF;
    border-radius: 25px;
    border: 1px solid red;
    padding: 15px;
    left: ${props => props.left + "px"};
    top: ${props => props.top + "px"};
`
const SubCategoryElement = styled.div`
    color: red;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 300px;
    margin-bottom: 10px;
    &:hover{
        background: #F0F0F0;
    }
`
class Category extends Component {
    static contextType = MenuContext
    state = { event: false, subs: [], top: 0, left: 0, open: false }
    changeCategory = (category) => {
        this.props.category_clicked(category)
    }
    changeSubCategory = (category) => {
        this.props.subcategory_clicked(category.parent, category)
    }
    displaySubCateMenu = (event, parent) => {
        if (parent.value === 0) { this.setState({ open: false }); return }
        const subs = this.props.sublist[parent.value]
        const top = event.target.getBoundingClientRect().y - 31
        const left = event.target.getBoundingClientRect().x
        this.state.event === false && document.addEventListener("mousemove", this.checkMoveOutside)
        this.setState({ event: true, subs: subs, open: true, top: top, left: left })
    }
    checkMoveOutside = (e) => {
        if (this.myMainRef.current === null || this.mySubRef.current === null) return
        if (!this.myMainRef.current.contains(e.target) && !this.mySubRef.current.contains(e.target)) {
            this.outFocus()
        }
    }
    outFocus = () => {
        this.state.event && document.removeEventListener("mousemove", this.checkMoveOutside)
        this.setState({ open: false, event: false })
    }
    mySubRef = React.createRef()
    myMainRef = React.createRef()
    render() {
        const { subs, top, left, open } = this.state
        const hidemenu_style = this.context.hidemenu ? "hidemenu " : ""
        const larger_style = this.context.larger ? "larger " : ""
        return (<CategoryContainer ref={this.myMainRef} className={`${hidemenu_style}${larger_style}`} >
            {this.props.list.map(element => {
                return (<CategoryElement key={element.value} onMouseOver={(event) => this.displaySubCateMenu(event, element)} onClick={() => this.changeCategory(element)}>{element.text}</CategoryElement>)
            })}
            {open && <SubCategoryWrapper ref={this.mySubRef} left={left} top={top}>
                {subs.map(element => {
                    return element.value !== 0 && <SubCategoryElement key={element.value} onClick={() => this.changeSubCategory(element)}>{element.text}</SubCategoryElement>
                })}
            </SubCategoryWrapper>}
        </ CategoryContainer>)
    }
}

export default Category