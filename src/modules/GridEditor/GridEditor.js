import React, { Component } from 'react'
import { CreateCard, CreateStep, StepCard, ContentCard, TipDiv } from "./GridTools"
import styled from 'styled-components'
import arrow from "source/arrow.svg"

const AsBelowArrow = styled.div`
    margin-left: 85px;
    margin-top: 25px;
    width: 31px;
    height: 27px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: 0.5;
    border-left: 15.5px solid transparent;
    border-right: 15.5px solid transparent;
    border-top: 27px solid #707070
`
class GridEditor extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        w: 1920,
        movableRight: true,
        movableLeft: true
    }
    getHeight(editor) {
        console.log(`${editor.offsetHeight}px`)
        return `${editor.offsetHeight}px`
        // return `${obj && obj.offsetHeight}px`
    }
    scrollLeft(editor) {
        if (editor) {
            editor.scrollLeft -= 250;
            if (editor.scrollLeft >= 0) {
                this.setState({ movableLeft: false })
            }
            if (editor.scrollRight > editor.offsetWidth) {
                this.setState({ movableRight: true })
            }
        }
    }
    scrollRight(editor) {
        if (editor) {
            editor.scrollLeft += 250;
            if (editor.scrollLeft === editor.offsetWidth) {
                this.setState({ movableRight: false })
            }
            if (editor.scrollLeft < editor.offsetWidth) {
                this.setState({ movableLeft: true })
            }
        }
    }
    componentDidMount() {
        window.addEventListener("resize", () => { this.setState({ w: window.innerWidth }) }, true)
        if (this.editor.scrollLeft === 0) {
            this.setState({ movableLeft: false })
        }
    }
    render() {
        const { DesignDetailStep } = this.props
        const { w } = this.state
        // temp code //
        const items = DesignDetailStep.map(step => { return step.cards.length })
        const maxItems = Math.max.apply(Math, items.map(tem => { return tem }))
        const itemlist = ['BOX1', 'BOX2', 'BOX3', 'BOX4', 'BOX5', 'BOX6', 'BOX7', 'BOX8', 'BOX9', 'BOX10']
        // console.log(DesignDetailStep, "!", itemlist, maxItems)
        // console.log("!!!!", document)
        return (<>
            <div style={{ width: `${w}px`, border: "3px dashed blue", overflowY: "hidden", overflowX: "hidden" }} ref={ref => (this.editor = ref)}>
                {this.state.movableLeft && <div style={{ border: "1px dashed red", zIndex: "601", position: "absolute", left: "0%", width: "178px", height: `${(this.editor && this.editor.offsetHeight) || 1680}px`, backgroundImage: "linear-gradient(-90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1))" }} />}
                {this.state.movableRight && <div style={{ border: "1px dashed red", zIndex: "601", position: "absolute", left: "91%", width: "178px", height: `${(this.editor && this.editor.offsetHeight) || 1680}px`, backgroundImage: "linear-gradient( 90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1))" }} />}
                {this.state.movableLeft && <div onClick={() => this.scrollLeft(this.editor)}><img style={{ zIndex: "602", position: "fixed", marginLeft: "10px", border: "1px solid red" }} src={arrow} alt="arrow" /></div>}
                {this.state.movableRight && <div onClick={() => this.scrollRight(this.editor)}> <img style={{ zIndex: "602", position: "fixed", marginLeft: "95%", border: "1px solid red", transform: "rotate(180deg)" }} src={arrow} alt="arrow" /></div>}
                <div style={{ paddingLeft: "344px", border: "1px dashed orange", display: "flex" }}>
                    {DesignDetailStep.map(step => {
                        return <div key={step.uid}>
                            <StepCard {...step} marginRight="74px" />
                            <AsBelowArrow />
                        </div>
                    })}
                </div>
                <div style={{ width: `${w}px`, border: "1px dashed purple", marginTop: "71.5px", paddingLeft: "71px" }}>
                    {itemlist && itemlist.map((item, index) => {
                        return <div key={item} style={{ border: "1px dashed red", width: `10000px`, display: "flex" }}>
                            <StepCard marginTop="0px" title={item} marginRight="73.5px" />
                            {DesignDetailStep && DesignDetailStep.map((step, index) => {
                                if (step.cards.length > index)
                                    return <ContentCard key={index} marginTop="0px" marginBottom="37px" marginRight="74px" txt={step.cards[index].title} />
                                return <ContentCard key={index} marginTop="0px" marginBottom="37px" marginRight="74px" txt={""} />
                            })}
                        </div>
                    })}
                </div>
            </div>
        </>)
    }
}

export default GridEditor
