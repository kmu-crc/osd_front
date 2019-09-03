import React, { Component } from 'react';
import { CreateCard, CreateStep, StepCard, ContentCard } from "./GridTools";
import styled from 'styled-components';
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import NewCardModal from "./NewCardModal";

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
`;
const GridEditorWrapper = styled.div`
    display: flex;
    margin-bottom: 150px;
`;

class GridEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card_loading: false, card: false, newcard: false, row: null, col: null,
            newstep: false, cardDetail: null, title: null, w: 1920, ws: { left: 271, top: 270, height: 1890 }, movableRight: true, movableLeft: true
        }
    }
    getHeight(obj) {
        console.log(`${obj.offsetHeight}px`)
        return `${obj.offsetHeight}px`
        // return `${obj && obj.offsetHeight}px`
    }
    createNewCard(row, col) {
        this.setState({ newcard: true }) // alert(`(${row},${col}) 0 4 ing...?!"`)
    }
    takeOutCard(row, col, data, maxRow) {
        console.log("DEBUG", maxRow, row, col)
        if (data === null) {
            this.createNewCard(row, col)
            return;
        }
        this.setState({ cardDetail: data, title: data.title, row: row, col: col, maxRow: maxRow, card: true })
        // request card detail
        console.log("card-data:", data)
        // this.props.GetDesignCardDetailRequest
    }
    componentDidMount() {
        window.addEventListener("resize", () => { this.setState({ w: window.innerWidth }) }, true)
        if (this.item) {
            this.setState({ ws: { top: this.item.offsetTop, left: this.item.offsetWidth, width: 178, height: this.item.height } })
            console.log(this.state.ws, "ws")
        }
    }
    CloseNewStep = () => {
        this.setState({ newstep: false })
    }
    OpenNewStep = () => {
        this.setState({ newstep: true })
    }
    NewStep = (data) => {
        this.props.CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) })
        this.CloseNewStep()
    }
    NewItem = (data) => { }
    render() {
        const { editor, DesignDetailStep } = this.props
        const { w, ws, row, col, maxRow, card, newcard, newstep } = this.state
        // temp code //
        // const items = DesignDetailStep.map(step => { return step.cards.length })
        // const maxItems = Math.max.apply(Math, items.map(tem => { return tem }))
        const itemlist = ['STEP1', 'STEP2', 'STEP3', 'STEP4', 'STEP5', 'STEP6', 'STEP7', 'STEP8', 'STEP9', 'STEP10']
        // console.log(DesignDetailStep && DesignDetailStep.map(step => { return step.title }), "!")
        // console.log("DDSC / GE /> ", this.props.design, DesignDetailStep, editor)
        console.log(this.props, "card:");
        return (<>
            {/* ------------- card modal component */}
            {card && <CardModal open={card} close={() => this.setState({ card: false })} title={this.state.title || "로딩중"} card={this.state.cardDetail} col={col} row={row} maxRow={maxRow} />}
            {editor && newstep && <NewStepModal {...this.props} open={newstep} newStep={this.NewStep} close={this.CloseNewStep} />}
            {editor && newcard && <NewCardModal open={newcard} close={() => this.setState({ newcard: false })} />}

            {/* ------------- grid editor component */}
            <GridEditorWrapper>
                {/* 왼쪽 */}
                {/* <div style={{ display: "flex" }}>
                    <div style={{ marginTop: "290px" }}>
                    {itemlist && itemlist.map(item => { return <StepCard key={item} marginBottom={190} title={item} /> })}
                    {editor && <CreateStep onClick={this.OpenNewStep} step={"단계"} />}
                    </div>
                </div> */}
                {/* 오른쪽 */}
                <div style={{ width: `max-content`, paddingLeft: "73.5px" }}>
                    {/* 상 */}
                    <div style={{ display: "flex", marginTop: "90px" }}>
                        {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                            return <div key={step_index + step.title} style={{ marginRight: "74px" }}>
                                <StepCard title={step.title} />
                                <AsBelowArrow marginTop={25} marginRight={0} marginBottom={0} marginLeft={85} />
                            </div>
                        })}
                        {editor && <CreateStep onClick={this.OpenNewStep} step={"단계"} />}
                    </div>
                    {/* 하 */}
                    <div style={{ overflow: "hidden", marginTop: "70.5px", display: "flex" }}>
                        {/* {itemlist && itemlist.map((item, item_index) => { */}
                        {/* return <div key={item_index} style={{ width: "10000px", marginTop: "70.5px", display: "flex" }}> */}
                        {/* {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                            return (step.cards.length > item_index)
                            ? <ContentCard key={item + item_index + step_index} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => this.takeOutCard(item_index, step_index, step.cards[item_index], step.cards.length)} title={step.cards[item_index].title} />
                            : editor
                            ? <CreateCard key={item + item_index + step_index} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => editor && this.takeOutCard(item_index, step_index, null, step.cards.length)} title={""} />
                            : <ContentCard key={item + item_index + step_index} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => editor && this.takeOutCard(item_index, step_index, null, step.cards.length)} title={""} />
                        })} */}
                        {/* </div> */}
                        {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                            return (<div key={step.uid + step_index + step.title}>
                                {step.cards && step.cards.length > 0 &&
                                    step.cards.map((card, card_index) => {
                                        return <ContentCard
                                            key={step.uid + card.uid + step_index + card_index + card.title}
                                            marginTop={0} marginRight={74} marginBottom={37} marginLeft={0}
                                            onClick={() => this.takeOutCard(card_index, step_index, step.cards[card_index], step.cards.length)}
                                            title={step.cards[card_index].title} />
                                    })}
                                {editor &&
                                    <CreateCard
                                        title={""} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0}
                                        onClick={() => this.takeOutCard(step.cards.length - 1, step_index, null, step.cards.length)} />}
                            </div>)
                        })}
                    </div>
                </div>
            </GridEditorWrapper>
        </>)
    }
}

export default GridEditor
