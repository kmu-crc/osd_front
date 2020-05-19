import React, { Component } from 'react'
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

const Container = styled.div`
    height: ${props => props.height};
    width: 100%;
    top: 50px;
    position: relative;
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
    width: 100%;
    position: fixed;
    z-index: 820;
    top: 50px;
    padding-left: 115px;
    display: flex;
    background-color: #FFFFFF;
    @media only screen and (max-width : 900px) {
    top:100px;
    padding-left:30px;
    justify-content:flex-start;
    overflow:scroll;
    ::-webkit-scrollbar { display: none; }

    }

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
    margin-right: 25px;    
    cursor: pointer;
    white-space:nowrap;
    padding-right:5px;
    
    &.selected {
        font-weight: 500;
    }


`
const SubCategory = styled.div`
    z-index: 810;
    position: fixed;
    width:${props => props.screenWidth < 1920 ? window.innerWidth + "px" : "1920px"};
    top: 70px;
    padding-top: 17px;
    height:70px;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
    margin-right:25px;
    @media only screen and (max-width : 900px) {
        justify-content: center;
        ::-webkit-scrollbar { display: none; }
    }
    @media only screen and (max-width : 900px) {
        top:120px;
        overflow:scroll;
        padding-left:30px;
        justify-content: flex-start;
        ::-webkit-scrollbar { display: none; }
    }
`
const SubCateElement = styled.div`
    z-index: 810;
    height: 29px;
    font-size: 20px;
    font-weight: 300;
    font-family: Noto Sans KR;
    line-height: 29px;
    text-align: center;
    color: #707070;
    margin-right: 15px;    
    padding-right:5px;
    white-space:nowrap;

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
        // console.log("width",window.innerWidth);
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
            <SubCategory screenWidth={window.innerWidth}>
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