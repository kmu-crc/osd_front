import React, { Component } from 'react'
import { CreateCard, CreateStep, StepCard, ContentCard, TipDiv } from "./GridTools"
import styled from 'styled-components'

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
    render() {
        const { DesignDetailStep } = this.props
        return (<>
            <div style={{ border: "1px dashed orange", marginLeft: "344px", width: "100%", display: "flex" }}>
                {DesignDetailStep.map(step => {
                    return <div>
                        <StepCard {...step} key={step.uid} marginRight="74px" />
                        <AsBelowArrow />
                    </div>
                })}
            </div>
            <div style={{ border: "1px dashed purple", marginLeft: "71px" }}>

            </div>
        </>)
    }
}
export default GridEditor;