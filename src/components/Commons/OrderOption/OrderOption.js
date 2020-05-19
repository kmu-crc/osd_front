import React, { Component } from 'react'
import styled from 'styled-components'

const OrderWrapper = styled.div`
    width:100%;
    z-index:820;
    display:flex;
    justify-content:flex-end;
    font-size: 20px;
    font-family: Noto Sans KR;
    padding:10px;
`
const OrderElement = styled.div`
    font-family: Noto Sans KR;
    font-weight: 500;
    line-height: 29px;
    font-size: 20px;
    cursor: pointer;
    z-index: 800;

    &.selected {
        color: #FF0000;
        margin-left: ${props => props.marginRight};
        border-bottom: 1.5px solid red;
    }
    &.unselected {
        color: #707070;
        margin-left: ${props => props.marginRight};
    }
`
class OrderOption extends Component {
    state = {
        options:
            [{ text: "인기순", keyword: "like", marginRight: "30px" },
            { text: "최신순", keyword: "update", marginRight: "30px" }]
    }

    handleClicked = (order) => {
        console.log(order);
        this.props.order_clicked(order)
    }
    render() {
        const { options } = this.state
        const { selected, style } = this.props
        return (
            
            <OrderWrapper style={style}>
                
                {options.map(opt => {
                    return (<OrderElement
                        marginRight={opt.marginRight}
                        className={selected.keyword === opt.keyword ? "selected" : "unselected"}
                        onClick={() => this.handleClicked(opt)} key={opt.keyword}>{opt.text}</OrderElement>)
                })}

            </OrderWrapper>
        )
    }
}

export default OrderOption
