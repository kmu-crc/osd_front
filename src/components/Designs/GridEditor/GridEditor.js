import React, { Component } from 'react';
import { CreateStep } from "./GridTools";
import styled from 'styled-components';
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import NewCardModal from "./NewCardModal";
import { ReactHeight } from 'react-height';
import arrow from "source/arrow.svg";
import SortableDesignSteps from "./SortableDesignSteps";

const WhitePane = styled.div`
    z-index: 830;
    width: ${props => props.width};
    height: ${props => props.height}px;
    position: absolute;
    left: ${props => props.left};
    right: ${props => props.right};
    background: #FFFFFF; // transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%)
    backgroundRepeat: no-repeat;
`;
const Arrow = styled.div`
    z-index: 831;
    position: absolute;
    top:105px;
    left: ${props => props.left};
    right: ${props => props.right};
    // margin-top: ${props => props.gap + 105}px;
    // margin-left: auto;
    // margin-right: 29px;
    width: 17px;
    height: 48px;
    border: none;
    background-image: url(${arrow});
    background-size: cover;
    background-position: 50%;
    transform: rotate(${props => props.angle});
    opacity: 0.9;
    :hover{
        opacity: 1;
    }
`;
const GridEditorWrapper = styled.div`
    // width: 1920px;
    // width: ${props => props.width}px; 
    display: flex;
    margin-left:65px;
    margin-bottom: 75px;
    .Editor{
        padding-right: 250px;
        overflow: hidden;
        white-space: nowrap;
        width: max-content; 
        display: flex;
        margin-top: 90px;
    }
`;
class GridEditor extends Component {
    constructor(props) {
        super(props);
        this.temp = React.createRef();
        this.grid = React.createRef();
        this.state = {
            h: 0, w: 1920 - 65, left: false, right: false, card_loading: false, card: false, newcard: false, row: null, col: null,
            boardId: null, newstep: false, editstep: false, cardDetail: null, title: null, where: null, arrow_top: 0, tmp: null,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.ScrollLeft = this.ScrollLeft.bind(this);
        this.ScrollRight = this.ScrollRight.bind(this);
        this.createNewCard = this.createNewCard.bind(this);
        this.CloseNewStep = this.CloseNewStep.bind(this);
        this.CloseEditStep = this.CloseEditStep.bind(this);
        this.OpenNewStep = this.OpenNewStep.bind(this);
        this.OpenEditStep = this.OpenEditStep.bind(this);
        this.RemoveStep = this.RemoveStep.bind(this);
        this.EditStep = this.EditStep.bind(this);
        this.NewStep = this.NewStep.bind(this);
        this.requestReorder = this.requestReorder.bind(this);
        this.requestCardReorder = this.requestCardReorder.bind(this);
    };
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll, true);
        window.removeEventListener("resize", this.handleScroll, true);
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, true);
        window.addEventListener("resize", this.handleResize, true);
    }
    handleResize() {
        this.setState({ w: window.innerWidth });
    }
    handleScroll(event) {
        if (this.grid) {
            this.setState({ arrow_top: event.target.scrollTop });
            console.log("scroll:", event.target.scrollTop, event.target.scrollLeft);
        }
    }
    createNewCard(row, boardId) {
        this.setState({ row: row, boardId: boardId, newcard: true });
    }
    openCard = (card, row, boardId) => {
        console.log(card, row, boardId);
        // return;
        this.setState({ cardDetail: card, title: card.title, row: row, boardId: boardId, card: true });
    }
    CloseNewStep() {
        this.setState({ newstep: false });
    }
    CloseEditStep() {
        this.setState({ editstep: false });
    }
    OpenNewStep() {
        this.setState({ newstep: true });
    }
    async OpenEditStep(title, where) {
        await this.setState({ editstep: true, title: title, where: where });
    }
    async RemoveStep(data) {
        await this.props.DeleteDesignBoardRequest(this.props.design.uid, data, this.props.token)
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid); console.log("1", this.props.DesignDetailStep) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) })
    }
    async EditStep(data) {
        await this.props.UpdateDesignBoardRequest(data.where, this.props.token, { title: data.title })
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid); console.log("2", this.props.DesignDetailStep) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) });
        this.setState({ editstep: false });
    }
    async NewStep(data) {
        await this.props.CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid); console.log("3", this.props.DesignDetailStep) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) })
            .catch((err) => { console.error(err) });
        this.CloseNewStep();
    }
    ScrollLeft() {
        if (this.temp) {
            this.temp.current.scrollLeft -= 275;
            if (this.temp.current.scrollLeft === 0) { this.setState({ left: false }); }
            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft >= this.state.w) {
                this.setState({ right: true });
            }
        }
    }
    ScrollRight() {
        if (this.temp) {
            this.temp.current.scrollLeft += 275;
            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft < this.state.w) {
                this.setState({ right: false });
            }
            if (this.temp.current.scrollLeft > 0) { this.setState({ left: true }); }
        }
    }
    async requestCardReorder(items) {
        const jobs = [];
        let promiseAry = [];
        items.forEach((element, index) => {
            if (element.order !== index) jobs.push({ uid: element.uid, neworder: index });
        });
        if (jobs.length === 0) return;
        promiseAry = jobs.map(job => {
            return this.props.UpdateCardTitleRequest({ order: job.neworder }, this.props.token, job.uid);
        })
        await Promise.all(promiseAry)
            .then(this.props.GetDesignBoardRequest(this.props.design.uid))
            .then(this.props.GetDesignCardRequest(this.props.design.uid, this.state.boardId));
    }
    async requestReorder(items) {
        const jobs = [];
        let promiseAry = [];
        items.forEach((element, index) => {
            if (element.order !== index) jobs.push({ uid: element.uid, neworder: index });
        });
        if (jobs.length === 0) return;
        promiseAry = jobs.map(job => {
            return this.props.UpdateDesignBoardRequest(job.uid, this.props.token, { order: job.neworder });
        })
        await Promise.all(promiseAry)
            .then(this.props.GetDesignBoardRequest(this.props.design.uid))
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.DesignDetailStep !== nextProps.DesignDetailStep) {
            if (nextProps.DesignDetailStep.length) {
                if (nextProps.DesignDetailStep.length * 275 > this.state.w) {
                    this.setState({ right: true });
                }
            }
        }
        return true;
    }
    render() {
        const { editor, design, DesignDetailStep, userInfo } = this.props;
        console.log("rendertag", DesignDetailStep)
        const { h, left, right, row, boardId, card, newcard, newstep, editstep, cardDetail, title, where } = this.state;
        const scroll_width = DesignDetailStep && DesignDetailStep.length > 0 && DesignDetailStep.length * (200 + 75);
        return (
            <div style={{ position: "relative" }}>
                {design.uid ?
                    <div>
                        {left ? <WhitePane width="150px" height={h} left={0}>
                            <Arrow angle="0deg" left={50} gap={this.state.arrow_top} onClick={this.ScrollLeft} />
                        </WhitePane> : null}
                        {right ? <WhitePane width="150px" height={h} right={0} background="transparent linear-gradient(-90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)">
                            <Arrow angle="180deg" right={0} gap={this.state.arrow_top} onClick={this.ScrollRight} />
                        </WhitePane> : null}
                        {card && <CardModal
                            isTeam={editor} edit={userInfo && userInfo.uid === cardDetail.user_id}
                            open={card} close={() => this.setState({ card: false })} //col={col} row={row} maxRow={maxRow}
                            title={title || "로딩중"} boardId={boardId} designId={this.props.design.uid} card={cardDetail} />}
                        {editor && <NewStepModal {...this.props} open={newstep} newStep={this.NewStep} close={this.CloseNewStep} />}
                        {editor && <EditStepModal open={editstep} title={title} where={where} steps={DesignDetailStep} RemoveStep={this.RemoveStep} EditStep={this.EditStep} close={this.CloseEditStep} />}
                        {editor && newcard && <NewCardModal isTeam={editor} boardId={boardId} designId={this.props.design.uid} order={row} open={newcard} close={() => this.setState({ newcard: false })} />}

                        <ReactHeight onHeightReady={(height => { this.setState({ h: height }) })}>
                            <GridEditorWrapper width={scroll_width.toString()}>
                                <div className="Editor" ref={this.temp}>
                                    {/* ------------단계 ------------*/}
                                    {DesignDetailStep && DesignDetailStep.length > 0 &&
                                        <SortableDesignSteps editStep={this.OpenEditStep} design_id={this.props.design.uid} editor={editor ? true : false} items={DesignDetailStep} cardReorder={this.requestCardReorder} createCard={this.createNewCard} openCard={this.openCard} reorder={this.requestReorder} />}
                                    {editor && <div style={{ display: "flex" }}>
                                        <CreateStep onClick={this.OpenNewStep} step={"단계"} /><div style={{ width: "200px" }}></div></div>}
                                </div>
                            </GridEditorWrapper>
                        </ReactHeight>
                    </div>
                    : <div>디자인정보를 가져오고 있습니다.</div>
                }</div>)
    }
}

export default GridEditor;
