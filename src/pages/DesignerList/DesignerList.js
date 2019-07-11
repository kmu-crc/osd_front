import React, { Component } from 'react'
import Designer from "components/Designer/Designer";
import styled from 'styled-components'


const orderoption = ["인기순", "최신순"]
const orderoption_margin = [30, 44]
const Options = styled.div`
    position: relative;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    font-family: Noto Sans KR;
    color: #707070;
    font-weight: 500;
    line-height: 29px;
    text-align: middle;
`
class OrderOption extends Component {
    state = { options: orderoption }
    handleClicked = (idx) => {
        this.props.order_clicked(idx)
    }
    render() {
        const opts = this.state.options
        return (
            <Options>
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
            </Options>
        )
    }
}
class DesignerListPage extends Component {
    state = { this_order: 0 }
    handleChangeOrderOps = (idx) => {
        this.setState({ this_order: idx })
        // console.log("changed_order", idx)
    }
    render() {
        console.log("designer:", this.props)
        return (
            <>
                <OrderOption order_clicked={this.handleChangeOrderOps} selected={this.state.this_order} />
                <div>
                    <Designer />

                </div>
            </>
        )

    }
}
export default DesignerListPage