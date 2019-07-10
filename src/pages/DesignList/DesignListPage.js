import React, { Component } from 'react'
// import DesignListContainer from "containers/Designs/DesignListContainer"
import Design from "components/Designs/Design"
import styled from 'styled-components'
import MenuContext from "Global/Context/GlobalContext"

const CategoryContainer = styled.div`
    z-index: 899;
    background-color: #FFFFFF;
    position: fixed;
    width: 100%;
    top: 55px;
    padding-left: 115px;
    display: flex;
    &.hidemenu {
        top: -55px;
        opacity: 0;
    }
    -webkit-transition: all 0.45s;
    -moz-transition: all 0.45s;
    -ms-transition: all 0.45s;
    -o-transition: all 0.45s;
    transition: all 0.45s;
`
class Category extends Component {
    static contextType = MenuContext
    changeCategory = (idx) => {
        this.props.category_clicked(idx)
    }
    render() {
        return (
            <CategoryContainer className={this.context && "hidemenu"}>
                {this.props.list.map((element, idx) => {
                    return (<div key={idx} style={{
                        color: "red", fontFamily: "Noto Sans KR",
                        fontSize: "20px", fontWeight: "300", marginRight: "30px", cursor: "pointer"
                    }}
                        onClick={() => this.changeCategory(idx)}>{element}</div>)
                })}
            </CategoryContainer>
        )
    }
}
const category = {
    first: ["카테고리", "카테고리", "카테고리", "카테고리"], second: ["패션", "제품", "커뮤니케이션", "공간", "엔터테인먼트", "소프트웨어", "새분야"]
}

const orderoption = ["인기순", "최신순"]
const orderoption_margin = [30, 44]
class OrderOption extends Component {
    state = { options: orderoption }
    handleClicked = (idx) => {
        this.props.order_clicked(idx)
    }
    render() {
        const opts = this.state.options
        return (
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "35px", fontSize: "20px", fontFamily: "Noto Sans KR", color: "#707070", fontWeight: "500", lineHeight: "29px", textAlign: "middle" }}>
                {opts.map((option, key) => {
                    return (
                        <div onClick={() => this.handleClicked(key)} key={key}
                            style={key === this.props.selected
                                ? { color: "#FF0000", marginRight: orderoption_margin[key], fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px", borderBottom: "1.5px solid red" }
                                : { color: "#707070", marginRight: orderoption_margin[key], fontFamily: "Noto Sans KR", fontWeight: "500", lineHeight: "29px", fontSize: "20px" }}>
                            {option}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const TextWrapper = styled.div`
    position: relative;
    top: 25px;
    text-align: center;
    font-size: 25px;
    font-family: Noto Sans KR;
    font-weight: 700;
    color: red;
`
class DesignListPage extends Component {
    state = { this_category: null, this_order: 0 }
    handleChangeCategory = (idx) => {
        this.setState({ this_category: category.first[idx] })
        // console.log("changed category", this.state.this_category)
    }
    handleChangeOrderOps = (idx) => {
        this.setState({ this_order: idx })
        // console.log("changed_order", idx)
    }
    render() {
        return (
            <>
                <Category category_clicked={this.handleChangeCategory} list={category.first} />
                <TextWrapper>패션 디자인(333)</TextWrapper>
                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />
                <>
                    <div style={{ marginLeft: "10px", paddingTop: "30px", display: "flex" }}><Design forked={true} /><Design /><Design /><Design /><Design /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "80px", display: "flex" }}><Design forked={true} /><Design /><Design forked={true} /><Design forked={true} /><Design /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "80px", display: "flex" }}><Design /><Design /><Design forked={true} /><Design forked={true} /><Design /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "80px", display: "flex" }}><Design /><Design /><Design /><Design /><Design /></div>
                    <div style={{ marginLeft: "10px", paddingTop: "80px", paddingBottom: "68px", display: "flex" }}><Design /><Design /><Design /><Design /><Design /></div>
                </>
            </>
        )
    }
}

export default DesignListPage

