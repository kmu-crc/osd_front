import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

const Container = styled.div`
    height: ${props => props.height};
    width: 1920px;
    top: 50px;
    position: fixed;
    z-index: 800;
    background-color: #FFFFFF;
    &.hidemenu {
		top: -55px;
		opacity: 0;
    }&.larger {;}
    
    -webkit-transition: all 0.45s;
	-moz-transition: all 0.45s;
	-ms-transition: all 0.45s;
	-o-transition: all 0.45s;
	transition: all 0.45s;
`
const MainCategory = styled.div`
    position: fixed;
    z-index: 820;
    width: 1920px;
    top: 50px;
    padding-left: 115px;
    display: flex;
    background-color: #FFFFFF;
`
const MainCateElement = styled.div`
    z-index: 820;
    height: 29px;
    font-size: 20px;
    font-weight: 300;
    font-family: Noto Sans KR;
    line-height: 29px;
    text-align: left;
    color: #FF0000;
    margin-right: 30px;    
    cursor: pointer;
    &.selected {
        font-weight: 500;
    }
`
const SubCategory = styled.div`
    z-index: 810;
    position: fixed;
    width: 1920px;
    top: 70px;
    padding-top: 17px;
    height:70px;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
`
const SubCateElement = styled.div`
    z-index: 810;
    height: 29px;
    font-size: 20px;
    font-weight: 300;
    font-family: Noto Sans KR;
    line-height: 29px;
    text-align: left;
    color: #707070;
    margin-right: 20px;    
    &.selected {
        color: #FF0000;
    }
    &:hover {
        color: #FFA0A0;
    }
    cursor: pointer;
`
class Category extends Component {
    static contextType = MenuContext
    constructor(props) {
        super(props);
        this.clickedMainCategory = this.clickedMainCategory.bind(this);
        this.clickedSubCategory = this.clickedSubCategory.bind(this);
    }
    clickedMainCategory(category) {
        this.props.category_clicked(category)
        this.setState({ parent: category.value })
    }
    clickedSubCategory(category) {
        this.props.subcategory_clicked(this.props.main_selected, category)
    }
    render() {
        const { category1, category2, main_selected, sub_selected } = this.props;
        const selected = sub_selected && sub_selected.value;
        const hidemenu = this.context.hidemenu ? "hidemenu " : "";
        const larger = this.context.larger ? "larger " : "";
        return (<Container className={`${hidemenu}${larger}`} >
            <MainCategory>
                {category1.map(element => {
                    return <MainCateElement
                        className={main_selected && main_selected.value === element.value ? "selected" : ""}
                        onClick={() => this.clickedMainCategory(element)}
                        key={element.value}>{element.text}</MainCateElement>
                })}</MainCategory>
            <SubCategory>
                {category2 && category2.length > 0 && category2.map(element => {
                    const style = element.value === selected ? "selected " : ""
                    return <SubCateElement
                        className={`${style}`}
                        onClick={() => this.clickedSubCategory(element)}
                        key={element.value}>{element.text}</SubCateElement>
                })}
                </SubCategory>
        </Container>)
    }
}

export default Category;