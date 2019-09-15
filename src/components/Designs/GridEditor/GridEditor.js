import React, { Component, Fragment } from 'react';
import { Icon } from "semantic-ui-react";
import { CreateCard, CreateStep, StepCard, ContentCard } from "./GridTools";
import styled from 'styled-components';
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import NewCardModal from "./NewCardModal";
import { ReactHeight } from 'react-height';
import arrow from "source/arrow.svg";

// DND
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";
const Container = SortableContainer(({ children }) => { return <ul>{children}</ul> });
const DragHandle = SortableHandle(() => <Icon style={{ fontSize: "25px" }} name="bars" />)

const margin = { marginTop: "25px", marginRight: "74px", marginBottom: "37px", marginLeft: "-40px" };
const SortableCard = SortableElement(({ editor, card, design_id }) => (
    /* onClick={() => this.takeOutCard(card_index, step_index, step.cards[card_index], step.cards.length)} /> */
    <ContentCard id="contentcard" uid={card.uid} {...margin} card={card} design_id={design_id} >
        {editor ? <DragHandle /> : null}
    </ContentCard>
));
const SortableStep = SortableElement(({ step, boardId, editor, design_id, reorder }) => (
    <div>
        <StepCard title={step.title} uid={step.uid} id="stepcard" >
            {editor ? <DragHandle /> : null}
        </StepCard>
        {step.cards && step.cards.length > 0 &&
            <Fragment>
                <div style={{ marginTop: "25px" }}>
                    <AsBelowArrow percent={.25} marginTop={0} marginRight={0} marginBottom={0} marginLeft={85} />
                </div>
                <div>
                    <SortableDesignCards editor={editor} boardId={boardId} items={step.cards} design_id={design_id} reorder={reorder} />
                </div>
            </Fragment>}
        {editor &&
            <div style={{ marginTop: step.cards && step.cards.length > 0 ? "25px" : "66px" }}>
                <CreateCard title={""} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0}
                /*this.takeOutCard(step.cards.length > 0 ? step.cards.length - 1 : 0, step.uid, null, step.cards.length)*/
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
    shouldCancelStart = (e) => {
        var targetEle = e;
        if (!targetEle.id) {
            targetEle = e.target;
        }
        if (targetEle.id === 'contentcard' || targetEle.parentNode.id === 'contentcard') {
            const target = targetEle.id === 'contentcard' ? targetEle : targetEle.parentNode;
            console.log(target.id, target.getAttribute('uid'), target);
            //this.props.openCard()
            // const title = targetEle.getAttribute('title');
            // const uid = targetEle.getAttribute('uid');
            // this.props.editStep(title, uid);
        }
    }
    render() {
        const { items } = this.state;
        const { editor, design_id } = this.props;
        return (<Container
            axis="y"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            shouldCancelStart={this.shouldCancelStart}
            useDragHandle>
            {items.map((item, index) => (<SortableCard design_id={design_id} editor={editor} key={`step-${index}`} index={index} card={item} />))}
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
        const { editor, design_id, cardReorder } = this.props;
        return (<Container
            axis="x"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            shouldCancelStart={this.shouldCancelStart}
            useDragHandle>
            <div style={{ display: "flex" }}>
                {items.map((item, index) => (
                    <SortableStep boardId={item.uid} reorder={cardReorder} design_id={design_id} disabled={!editor} editor={editor} key={`step-${index}`} index={index} step={item} />
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
`;
const GridEditorWrapper = styled.div`
    width: 1925px;
    display: flex;
    margin-bottom: 75px;
    overflow: hidden;
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
    width: 15px;
    height: 48px;
    border: none;
    background-image: url(${arrow});
    background-size: cover;
    background-position: 50%;
    transform: rotate(${props => props.angle});
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
            w: 1920, arrow_top: 0, tmp: null,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.ScrollLeft = this.ScrollLeft.bind(this);
        this.ScrollRight = this.ScrollRight.bind(this);
        this.createNewCard = this.createNewCard.bind(this);
        this.takeOutCard = this.takeOutCard.bind(this);
        this.CloseNewStep = this.CloseNewStep.bind(this);
        this.CloseEditStep = this.CloseEditStep.bind(this);
        this.OpenNewStep = this.OpenNewStep.bind(this);
        this.OpenEditStep = this.OpenEditStep.bind(this);
        this.RemoveStep = this.RemoveStep.bind(this);
        this.EditStep = this.EditStep.bind(this);
        this.NewStep = this.NewStep.bind(this);
        this.requestReorder = this.requestReorder.bind(this);
    };
    componentWillUnmount() {
        this.temp && this.temp.current.removeEventListener("scroll", this.handleScroll, true);
        window.removeEventListener("resize", this.handleScroll, true);
    }
    componentDidMount() {
        console.log(this.temp.current);
        this.temp.current && this.temp.current.addEventListener("scroll", this.handleScroll, true);
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
    takeOutCard(row, boardId, data, maxRow) {
        if (data === null) {
            this.createNewCard(row, boardId);
            return;
        }
        this.setState({ cardDetail: data, title: data.title, row: row, boardId: boardId, maxRow: maxRow, card: true });
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
    RemoveStep(data) {
        this.props.DeleteDesignBoardRequest(this.props.design.uid, data, this.props.token)
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) })
    }
    EditStep(data) {
        this.props.UpdateDesignBoardRequest(data.where, this.props.token, { title: data.title })
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) });
        this.setState({ editstep: false });
    }
    NewStep(data) {
        this.props.CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) })
            .catch((err) => { console.error(err) });
        this.CloseNewStep();
    }
    ScrollLeft() {
        // event.preventDefault();
        if (this.temp) {
            this.temp.current.scrollLeft -= 375;
            if (this.temp.current.scrollLeft === 0) { this.setState({ left: false }); }
            if (this.temp.current.scrollLeft < 800) { this.setState({ right: true }); }
            // console.log("scrollLeft:", this.temp.current.scrollLeft);
            // console.log("scroll gap:", this.temp.current.clientWidth, window.innerWidth);
        }
    }
    ScrollRight() {
        if (this.temp) {
            this.temp.current.scrollLeft += 375;
            if (this.temp.current.scrollLeft > 0) { this.setState({ left: true }); }
            if (this.temp.current.scrollLeft > 800) { this.setState({ right: false }); }
            // console.log("scrollLeft:", this.temp.current.scrollLeft);
            // console.log("scroll gap:", this.temp.current.clientWidth, window.innerWidth);
        }
    }
    async requestCardReorder(items) {
        console.log("dnd:cards", items);
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
                // console.log(this.state.w, nextProps.DesignDetailStep.length * 275);
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
        return (<Fragment>
            {design.uid ? <Fragment>
                {/* ------------- scroll tool component-------------  */}
                {left ? <React.Fragment>
                    <WhitePane left="0px" width="178px" height={h}
                        background="transparent linear-gradient(90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)">
                        <Arrow id="arrow" angle="0deg" gap={this.state.arrow_top} onClick={this.ScrollLeft} />
                    </WhitePane>
                </React.Fragment> : undefined}
                {right ? <React.Fragment>
                    <WhitePane left="1699px" width="178px" height={h}
                        background="transparent linear-gradient(-90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)">
                        <Arrow angle="180deg" gap={this.state.arrow_top} onClick={this.ScrollRight} />
                    </WhitePane>
                    <WhitePane left="1877px" width="72px" height={h}
                        background="transparent linear-gradient(0deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 100%)" />
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
                    <GridEditorWrapper ref={this.temp}>
                        <div style={{ width: "max-content", paddingLeft: "73.5px" }}>
                            <div ref={(ref) => this.grid = ref} style={{ display: "flex", marginTop: "90px" }}>
                                {/* ------------단계 ------------*/}
                                {DesignDetailStep && DesignDetailStep.length > 0 &&
                                    <SortableDesignSteps editStep={this.OpenEditStep} design_id={this.props.design.uid} editor={editor ? true : false} items={DesignDetailStep} cardReorder={this.requestCardReorder} reorder={this.requestReorder} />}
                                {editor && <CreateStep onClick={this.OpenNewStep} step={"단계"} />}
                            </div>
                        </div>
                    </GridEditorWrapper>
                </ReactHeight>
            </Fragment> : <div>디자인정보를 가져오고 있습니다.</div>
            }
        </Fragment>)
    }

}

export default GridEditor;
