import React, { Component } from 'react';
import { CreateCard, CreateStep, StepCard, ContentCard } from "./GridTools";
import styled from 'styled-components';
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import NewCardModal from "./NewCardModal";
import { thisExpression } from '@babel/types';

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
            newstep: false, editstep: false, cardDetail: null, title: null, where: null,
            w: 1920, ws: { left: 271, top: 270, height: 1890 }, movableRight: true, movableLeft: true
        }
    }
    getHeight(obj) {
        console.log(`${obj.offsetHeight}px`)
        return `${obj.offsetHeight}px`
    }
    createNewCard(row, boardId) {
      this.setState({ row: row, boardId: boardId, newcard: true });
    }
    takeOutCard(row, boardId, data, maxRow) {
        if (data === null) {
            this.createNewCard(row, boardId)
            return;
        }
        this.setState({ cardDetail: data, title: data.title, row: row, col: boardId, maxRow: maxRow, card: true })
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
    CloseEditStep = () => {
        this.setState({ editstep: false })
    }
    OpenNewStep = () => {
        this.setState({ newstep: true })
    }
    OpenEditStep = (title, where) => {
        this.setState({ editstep: true, title: title, where: where })
    }
    EditStep = (data) => {
        this.props.UpdateDesignBoardRequest(data.where, this.props.token, { title: data.title })
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) });
        this.setState({ editstep: false });
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
        const { editor, DesignDetailStep, userInfo } = this.props
        const { row, col, boardId, maxRow, card, newcard, newstep, editstep, cardDetail, title, where } = this.state
        console.log(this.props, "card:");
        console.log(this.state, "state-card:");
        return (<>
            {/* ------------- card modal component */}
            {card && <CardModal
                isTeam={editor} edit={userInfo.uid === cardDetail.user_id}
                open={card} close={() => this.setState({ card: false })} //col={col} row={row} maxRow={maxRow}
                title={title || "로딩중"} designId={this.props.design.uid} card={cardDetail} />}
            {editor && <NewStepModal {...this.props} open={newstep} newStep={this.NewStep} close={this.CloseNewStep} />}
            {editor && <EditStepModal open={editstep} title={title} where={where} EditStep={this.EditStep} close={this.CloseEditStep} />}
            {editor && newcard && <NewCardModal isTeam={editor} boardId={boardId} designId={this.props.design.uid} order={row} open={newcard} close={() => this.setState({ newcard: false })} />}
            {/* ------------- grid editor component */}
            <GridEditorWrapper>
                <div style={{ width: `max-content`, paddingLeft: "73.5px" }}>
                    {/* 상 */}
                    <div style={{ display: "flex", marginTop: "90px" }}>
                        {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                            return <div key={step_index + step.title} style={{ marginRight: "74px" }}>
                                <StepCard title={step.title} onClick={() => editor ? this.OpenEditStep(step.title, step.uid) : undefined} />
                                <AsBelowArrow marginTop={25} marginRight={0} marginBottom={0} marginLeft={85} />
                            </div>
                        })}
                        {editor && <CreateStep onClick={this.OpenNewStep} step={"단계"} />}
                    </div>
                    {/* 하 */}
                    <div style={{ overflow: "hidden", marginTop: "25px", display: "flex" }}>
                        {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                            return (<div key={step.uid + step_index + step.title}>
                                {step.cards && step.cards.length > 0 &&
                                    step.cards.map((card, card_index) => {
                                        return <ContentCard
                                            key={step.uid + card.uid + step_index + card_index + card.title}
                                            marginTop="0px" marginRight="74px" marginBottom="37px" marginLeft="0px"
                                            onClick={() => this.takeOutCard(card_index, step_index, step.cards[card_index], step.cards.length)}
                                            card={step.cards[card_index]}
                                            design_id={this.props.design.uid} />
                                    })}
                                {editor &&
                                    <CreateCard
                                        title={""} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0}
                                        onClick={() => this.takeOutCard(step.cards.length>0?step.cards.length - 1:0, step.uid, null, step.cards.length)} />}
                            </div>)
                        })}
                    </div>
                </div>
            </GridEditorWrapper>
        </>)
    }
}

export default GridEditor
