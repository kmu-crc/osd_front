import React, { Component, Fragment } from 'react';
import { CreateCard, CreateStep, StepCard, ContentCard } from "./GridTools";
import styled from 'styled-components';
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import NewCardModal from "./NewCardModal";
import { ReactHeight } from 'react-height';
import arrow from "source/arrow.svg";

//todo 
//1) clean code

// DND
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";
const Container = SortableContainer(({ children }) => { return <ul style={{ margin: "0px", padding: "0px" }}>{children}</ul> });
const HorizonDragHandle = SortableHandle(() => <div style={{ display: "flex" }}><AsBelowArrow angle={90} percent={.15} marginRight={7} /><AsBelowArrow angle={-90} percent={.15} /></div>)
const VerticalDragHandle = SortableHandle(() => <div style={{ bakcground: "transparent" }}><AsBelowArrow angle={180} percent={.15} /><AsBelowArrow marginTop={7} angle={0} percent={.15} /></div>)

const margin = { marginTop: "25px", marginRight: "74px", marginBottom: "37px" };
const SortableCard = SortableElement(({ editor, card, openCard, boardId, design_id }) => (
    <ContentCard onClick={() => openCard(card, card.order, boardId)} id="contentcard" uid={card.uid} {...margin} card={card} design_id={design_id} >
        {editor ? <VerticalDragHandle /> : null}
    </ContentCard>
));
const SortableStep = SortableElement(({ step, boardId, editor, design_id, openCard, createCard, reorder }) => (
    <div>
        <StepCard title={step.title} uid={step.uid} id="stepcard" marginTop={0} marginRight={74} marginBottom={0} marginLef={0} >
            {editor ? <HorizonDragHandle /> : null}
        </StepCard>
        {step.cards && step.cards.length > 0 &&
            <Fragment>
                <div style={{ marginTop: "25px" }}>
                    <AsBelowArrow angle={0} percent={.25} marginTop={0} marginRight={0} marginBottom={0} marginLeft={85} />
                </div>
                <div>
                    <SortableDesignCards editor={editor} boardId={boardId} items={step.cards} design_id={design_id} openCard={openCard} reorder={reorder} />
                </div>
            </Fragment>}
        {editor &&
            <div style={{ marginTop: step.cards && step.cards.length > 0 ? "25px" : "66px" }}>
                <CreateCard onClick={() => createCard(step.order, boardId)} title={""} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0}
                />
            </div>}
    </div>
));
class SortableDesignCards extends Component {
    state = { items: this.props.items };
    onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return;
        this.setState(({ items }) => ({ items: arrayMove(items, oldIndex, newIndex), }));
        this.props.reorder(this.state.items);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items });
            return true;
        }
        if (nextState.items !== this.state.items) {
            return true;
        }
        return false;
    }

    render() {
        const { items } = this.state;
        const { editor, design_id, openCard, createCard, boardId } = this.props;
        return (<Container
            axis="y"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            useDragHandle>
            {items.map((item, index) => (<SortableCard createCard={createCard} openCard={openCard} boardId={boardId} design_id={design_id} editor={editor} key={`step-${index}`} index={index} card={item} />))}
        </Container>)
    }
}
class SortableDesignSteps extends Component {
    state = { items: this.props.items };
    onSortEnd = async ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return;
        this.setState(({ items }) => ({ items: arrayMove(items, oldIndex, newIndex), }));
        this.props.reorder(this.state.items);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items });
            return true;
        }
        if (nextState.items !== this.state.items) {
            return true;
        }
        return false;
    }
    shouldCancelStart = (e) => {
        var targetEle = e;
        if (!targetEle.id) {
            targetEle = e.target;
        }
        if (targetEle.id === 'stepcard') {
            const title = targetEle.getAttribute('title');
            const uid = targetEle.getAttribute('uid');
            // console.log(title, uid);
            this.props.editStep(title, uid);
        }
    }
    render() {
        const { items } = this.state;
        const { editor, design_id, cardReorder, createCard, openCard } = this.props;
        return (<Container
            axis="x"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            shouldCancelStart={this.shouldCancelStart}
            useDragHandle>
            <div style={{ display: "flex" }}>
                {items.map((item, index) => (
                    <SortableStep boardId={item.uid} createCard={createCard} openCard={openCard} reorder={cardReorder} design_id={design_id} disabled={!editor} editor={editor} key={`step-${index}`} index={index} step={item} />
                ))}
            </div>
        </Container >)
    }
}

const AsBelowArrow = styled.div`
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    width: ${props => props.percent * 100}px;
    height: ${props => props.percent * 65}px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: 0.5;
    border-top: ${props => props.percent * 65}px solid #707070;
    border-left: ${props => props.percent * 50}px solid transparent;
    border-right:${props => props.percent * 50}px solid transparent;
    transform: rotate(${props => props.angle}deg);
`;

const WhitePane = styled.div`
    z-index: 830;
    position: absolute;
    left: ${props => props.left};
    width: ${props => props.width};
    height: ${props => props.height}px;
    background: ${props => props.background};
    backgroundRepeat: no-repeat;
`;
const Arrow = styled.div`
    z-index: 831;
    position: relative;
    margin-top: ${props => props.gap + 105}px;
    margin-left: auto;
    margin-right: 29px;
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
            left: false, right: false, h: 0,
            card_loading: false, card: false, newcard: false, row: null, col: null, boardId: null,
            newstep: false, editstep: false, cardDetail: null, title: null, where: null,
            w: 1920 - 65, arrow_top: 0, tmp: null,
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
        this.props.DeleteDesignBoardRequest(this.props.design.uid, data, this.props.token)
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) })
    }
    async EditStep(data) {
        this.props.UpdateDesignBoardRequest(data.where, this.props.token, { title: data.title })
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) });
        this.setState({ editstep: false });
    }
    async NewStep(data) {
        this.props.CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
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
        const { h, left, right, row, boardId, card, newcard, newstep, editstep, cardDetail, title, where } = this.state;
        const scroll_width = DesignDetailStep && DesignDetailStep.length > 0 && DesignDetailStep.length * (200 + 75);
        return (<Fragment >
            {design.uid ? <Fragment>
                {/* ------------- scroll tool component-------------  */}
                {left ? <React.Fragment>
                    <WhitePane left="0px" width="178px" height={h}
                        background="transparent linear-gradient(90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)">
                        <Arrow id="arrow" angle="0deg" gap={this.state.arrow_top} onClick={this.ScrollLeft} />
                    </WhitePane>
                </React.Fragment> : undefined}
                {right ? <React.Fragment>
                    <WhitePane left="1699px" width="178px" height={h} background="transparent linear-gradient(-90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)">
                        <Arrow angle="180deg" gap={this.state.arrow_top} onClick={this.ScrollRight} /></WhitePane>
                    <WhitePane left="1877px" width="72px" height={h} background="transparent linear-gradient(0deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 100%)" />
                </React.Fragment> : undefined}

                {/* ------------- card modal component -------------  */}
                {card && <CardModal
                    isTeam={editor} edit={userInfo && userInfo.uid === cardDetail.user_id}
                    open={card} close={() => this.setState({ card: false })} //col={col} row={row} maxRow={maxRow}
                    title={title || "로딩중"} boardId={boardId} designId={this.props.design.uid} card={cardDetail} />}
                {editor && <NewStepModal {...this.props} open={newstep} newStep={this.NewStep} close={this.CloseNewStep} />}
                {editor && <EditStepModal open={editstep} title={title} where={where} steps={DesignDetailStep} RemoveStep={this.RemoveStep} EditStep={this.EditStep} close={this.CloseEditStep} />}
                {editor && newcard && <NewCardModal isTeam={editor} boardId={boardId} designId={this.props.design.uid} order={row} open={newcard} close={() => this.setState({ newcard: false })} />}

                {/* ------------- grid editor component  ------------- */}
                <ReactHeight onHeightReady={(height => { this.setState({ h: height }) })}>
                    <GridEditorWrapper width={scroll_width.toString()}>
                        <div className="Editor" ref={this.temp}>
                            {/* ------------단계 ------------*/}
                            {DesignDetailStep && DesignDetailStep.length > 0 &&
                                <SortableDesignSteps editStep={this.OpenEditStep} design_id={this.props.design.uid} editor={editor ? true : false} items={DesignDetailStep} cardReorder={this.requestCardReorder} createCard={this.createNewCard} openCard={this.openCard} reorder={this.requestReorder} />}
                            {editor && <div style={{ display: "flex" }}><CreateStep onClick={this.OpenNewStep} step={"단계"} /><div style={{ width: "200px" }}></div></div>}
                        </div>
                        {/* </div> */}
                    </GridEditorWrapper>
                </ReactHeight>
            </Fragment> : <div>디자인정보를 가져오고 있습니다.</div>
            }
        </Fragment>)
    }

}

export default GridEditor;
