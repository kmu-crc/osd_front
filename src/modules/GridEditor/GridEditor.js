import React, { Component } from 'react'
import { CreateCard, CreateStep, StepCard, ContentCard, TipDiv } from "./GridTools"
import styled from 'styled-components'
import arrow from "source/arrow.svg"

const AsBelowArrow = styled.div`
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    width: 31px;
    height: 27px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: 0.5;
    border-left: 15.5px solid transparent;
    border-right: 15.5px solid transparent;
    border-top: 27px solid #707070
`
class CardModal extends Component {
    render() {
        return (<div>{this.props.title}</div>)
    }
}

class GridEditor extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        card_loading: false, card: false,
        title: null,
        w: 1920, ws: { left: 271, top: 270, height: 1890 },
        movableRight: true, movableLeft: true
    }
    getHeight(obj) {
        console.log(`${obj.offsetHeight}px`)
        return `${obj.offsetHeight}px`
        // return `${obj && obj.offsetHeight}px`
    }
    createNewCard(row, col) {
        alert(`(${row},${col}) 0 4 ing...?!"`)
    }
    takeOutCard(row, col, data) {
        if (data === null) {
            alert("새로운 카드를 만듭니다. ")
            this.createNewCard(row, col)
            return;
        }
        // request card detail
        // this.props.GetDesignCardDetailRequest
        this.setState({ title: data.title, card: true })

    }
    // scrollRight(objA, objB) {
    //     if (objA) {
    //         objA.scrollLeft += 250;
    //         if (objA.scrollLeft >= 0) {
    //             // this.setState({ movableLeft: false })
    //         }
    //         if (objA.scrollRight > objA.offsetWidth) {
    //             // this.setState({ movableRight: true })
    //         }
    //     }
    //     if (objB) {
    //         objB.scrollLeft += 250;
    //         if (objB.scrollLeft >= 0) {
    //             // this.setState({ movableLeft: false })
    //         }
    //         if (objB.scrollRight > objB.offsetWidth) {
    //             // this.setState({ movableRight: true })
    //         }
    //     }
    // }

    componentDidMount() {
        window.addEventListener("resize", () => { this.setState({ w: window.innerWidth }) }, true)
        if (this.item) {
            this.setState({ ws: { top: this.item.offsetTop, left: this.item.offsetWidth, width: 178, height: this.item.height } })
            console.log(this.state.ws, "ws")
        }
    }
    render() {
        const { DesignDetailStep } = this.props
        const { w, ws, card } = this.state
        // temp code //
        // const items = DesignDetailStep.map(step => { return step.cards.length })
        // const maxItems = Math.max.apply(Math, items.map(tem => { return tem }))
        const itemlist = ['BOX1', 'BOX2', 'BOX3', 'BOX4', 'BOX5', 'BOX6', 'BOX7', 'BOX8', 'BOX9', 'BOX10']
        console.log(DesignDetailStep && DesignDetailStep.map(step => { return step.title }), "!")
        return (<>
            {/* card modal component */}
            {card && <CardModal title={this.state.title || "로딩중"} card={this.props.cardDetail} />}

            {/* grid editor component */}
            <div style={{ display: "flex" }}>
                {/* 왼쪽 */}
                <div style={{ display: "flex" }}>
                    <div style={{ marginTop: "290px" }}>
                        {itemlist && itemlist.map(item => {
                            return <StepCard marginBottom={190} title={item} />
                        })}
                    </div>
                </div>
                {/* 오른쪽 */}
                <div style={{ width: `${window.innerWidth}px`, paddingLeft: "73.5px" }}>
                    {/* 상 */}
                    <div style={{ display: "flex", marginTop: "90px" }}>
                        {DesignDetailStep && DesignDetailStep.map(step => {
                            return <div style={{ marginRight: "74px" }}>
                                <StepCard title={step.title} />
                                <AsBelowArrow marginTop={25} marginRight={0} marginBottom={0} marginLeft={85} />
                            </div>
                        })}
                        <CreateStep onClick={()=>alert("단계를 추가합니다.")}step={"단계"} />
                    </div>
                    {/* 하 */}
                    <div style={{ overflow: "hidden" }}>
                        {itemlist && itemlist.map((item, item_index) => {
                            return <div key={item} style={{ width: "10000px", marginTop: "70.5px", display: "flex" }}>
                                {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                                    return (step.cards.length > item_index)
                                        ? <ContentCard key={item + item_index} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => this.takeOutCard(item_index, step_index, step.cards[item_index])} title={step.cards[item_index].title} />
                                        : <ContentCard key={item + item_index} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => this.takeOutCard(item_index, step_index, null)} title={""} />
                                })}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>)
    }
}

export default GridEditor
//<div style={{ width: `${w}px`, border: "3px dashed blue" }} ref={ref => (this.editor = ref)}>
//{this.state.movableLeft && <div style={{ zIndex: "601", border: "1px dashed red", position: "absolute", left: "335px", width: "178px", height: `${(this.editor && this.editor.offsetHeight) || 1680}px`, backgroundImage: "linear-gradient(-90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1))" }} />}
//{this.state.movableRight && <div style={{ zIndex: "601", border: "1px dashed red", position: "absolute", left: `${(this.editor && this.editor.offsetLeft - this.editor.offsetWidth) || 1920}px`, width: "178px", height: `${(this.editor && this.editor.offsetHeight) || 1680}px`, backgroundImage: "linear-gradient( 90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1))" }} />}
//{this.state.movableLeft && <div onClick={() => this.scrollLeft(this.header, this.grid)}><img style={{ cursor: "pointer", zIndex: "602", position: "fixed", marginTop: "50px", marginLeft: "320px" }} src={arrow} alt="arrow" /></div>}
//{this.state.movableRight && <div onClick={() => this.scrollRight(this.header, this.grid)}><img style={{ cursor: "pointer", zIndex: "602", position: "fixed", marginTop: "50px", marginLeft: "95%", transform: "rotate(180deg)" }} src={arrow} alt="arrow" /></div>}
//<div style={{ display: "flex", marginTop: "71.5px" }}>
////  <div style={{ width: `${w}px`, border: "1px dashed purple", overflow: "hidden" }} ref={ref => (this.grid = ref)}>
//</div>
//})}
//</div>
//</div>
//</div>
//