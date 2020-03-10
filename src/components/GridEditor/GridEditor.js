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
import osdcss from "StyleGuide";

const WhitePane = styled.div`
    position: absolute;
    z-index: 830;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    background: #FFFFFF; // transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%);
    backgroundRepeat: no-repeat;
`;
const Arrow = styled.div`
    width: 17px;
    height: 48px;
    position: absolute;
    top: ${props => props.gap + 105}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    z-index: 831;
    border: none;
    background-image: url(${arrow});
    background-size: cover;
    background-position: 50%;
    transform: rotate(${props => props.angle});
    opacity: 0.9;
    cursor:pointer;
    :hover{
        opacity: 1;
    }
    cursor: pointer;
`;
const Wrapper = styled.div`
    position: relative;
`;
const GridEditorWrapper = styled.div`
    display: flex;
    margin-left: 20px;
    margin-bottom: 75px;
    width: ${window.innerWidth < osdcss.resolutions.LargeMaxWidth ? window.innerWidth : osdcss.resolutions.LargeMaxWidth}; 
    
    .Editor{
        overflow: auto;
        // height: 700px;
        padding-right: 250px;
        // overflow: hidden;
        white-space: nowrap;
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
            content: [],
            h: 0, w: window.innerWidth < osdcss.resolutions.LargeMaxWidth ? window.innerWidth : osdcss.resolutions.LargeMaxWidth,
            left: false, right: false, card_loading: false, card: false, newcard: false, row: null, col: null,
            boardId: null, newstep: false, editstep: false, cardDetail: null, title: null, where: null, tmp: null,
            gap: null,
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
        this.handleReturn = this.handleReturn.bind(this);
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize, true);
        window.removeEventListener("scroll", this.handleScroll, true);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize, true);
        window.addEventListener("scroll", this.handleScroll, true);
    }
    handleScroll(event) {
        if (this.grid && event.target.scrollTop !== 0) {
            this.setState({ gap: event.target.scrollTop });
        }
    }
    handleResize() {
        this.setState({ w: window.innerWidth < osdcss.resolutions.LargeMaxWidth ? window.innerWidth : osdcss.resolutions.LargeMaxWidth });
        if (this.temp) {
            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft < this.state.w) {
                this.setState({ right: false });
            } else {
                this.setState({ right: true });
            }
            if (this.temp.current.scrollLeft > 0) { this.setState({ left: true }); }
        }
    }
    createNewCard(row, boardId) {
        alert(row);
        this.setState({ row: row, boardId: boardId, newcard: true });
    }
    openCard = (card, row, boardId) => {
        this.setState({ cardDetail: card, title: card.title, row: row, boardId: boardId, card: true });
    }
    OpenNewStep() {
        this.setState({ newstep: true });
    }
    CloseNewStep() {
        this.setState({ newstep: false });
    }
    CloseEditStep() {
        this.setState({ editstep: false });
    }
    async OpenEditStep(title, where) {
        await this.setState({ editstep: true, title: title, where: where });
    }
    sorting = (list) => {
        list.map((item, index) => {
            item.uid = index;
            item.where = index;
            return item;
        })
        return list;
    }
    async RemoveStep(data) {
        if (this.props.item.uid === "new") {
            let copyContent = [...this.state.content];
            copyContent.splice(data, 1);
            copyContent = this.sorting(copyContent);
            this.setState({ content: copyContent });
        }
        else
            await this.props.DeleteDesignBoardRequest(this.props.item.uid, data, this.props.token)
                .then(() => { this.props.UpdateDesignTime(this.props.item.uid, this.props.token) })
                .then(() => {
                    this.props.GetDesignBoardRequest(this.props.item.uid);
                    // console.log("1", this.props.DesignDetailStep) 
                })
                .then(() => { this.props.GetDesignDetailRequest(this.props.item.uid, this.props.token) })
                .catch((err) => { console.error(err) });
    }
    async EditStep(data) {
        if (this.props.item.uid === "new") {
            let copyContent = [...this.state.content];
            copyContent.splice(data.where, 1, { uid: data.where, title: data.title, where: data.where });
            copyContent = this.sorting(copyContent);
            this.setState({ content: copyContent });
        }
        else
            await this.props.UpdateDesignBoardRequest(data.where, this.props.token, { title: data.title })
                .then(() => { this.props.UpdateDesignTime(this.props.item.uid, this.props.token) })
                .then(() => {
                    this.props.GetDesignBoardRequest(this.props.item.uid);
                    // console.log("2", this.props.DesignDetailStep) 
                })
                .then(() => { this.props.GetDesignDetailRequest(this.props.item.uid, this.props.token) })
                .catch((err) => { console.error(err) });
        this.CloseEditStep();
    }
    async NewStep(data) {
        if (this.props.item.uid === "new") {
            let copyContent = [...this.state.content];
            copyContent.push({ uid: data.where, title: data.title, where: data.where });
            copyContent = this.sorting(copyContent);
            this.setState({ content: copyContent });
        }
        else
            await this.props.CreateDesignBoardRequest(data, this.props.item.uid, this.props.token)
                .then(() => { this.props.UpdateDesignTime(this.props.item.uid, this.props.token) })
                .then(() => {
                    this.props.GetDesignBoardRequest(this.props.item.uid);
                })
                .then(() => { this.props.GetDesignDetailRequest(this.props.item.uid, this.props.token) })
                .catch((err) => { console.error(err) });
        this.CloseNewStep();
    }
    ScrollLeft() {
        if (this.temp) {
            this.temp.current.scrollLeft -= 275;

            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft >= this.state.w) {
                this.setState({ right: true });
            }

            if (this.temp.current.scrollLeft === 0) {
                this.setState({ left: false });
            }
        }
    }
    ScrollRight() {
        if (this.temp) {
            this.temp.current.scrollLeft += 275;

            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft <= this.state.w) {
                this.setState({ right: false });
            }

            if (this.temp.current.scrollLeft > 0) {
                this.setState({ left: true });
            }
        }
    }
    async requestCardReorder(items) {
        const jobs = [];
        let promiseAry = [];
        items.forEach((element, index) => {
            if (element.order !== index) jobs.push({ uid: element.uid, neworder: index });
        });
        if (jobs.length === 0) return;
        promiseAry = jobs.map(job =>
            this.props.UpdateCardTitleRequest({ order: job.neworder }, this.props.token, job.uid)
        );
        await Promise.all(promiseAry)
            .then(() => this.props.GetDesignBoardRequest(this.props.item.uid))
            .then(() => this.props.GetDesignCardRequest(this.props.item.uid, this.state.boardId));
    }
    async requestReorder(items) {
        const jobs = [];
        let promiseAry = [];
        items.forEach((element, index) => {
            if (element.order !== index) { jobs.push({ uid: element.uid, neworder: index }); }
        });
        if (jobs.length === 0) return;
        promiseAry = jobs.map((job) => this.props.UpdateDesignBoardRequest(job.uid, this.props.token, { order: job.neworder }))
        await Promise.all(promiseAry).then(() => this.props.GetDesignBoardRequest(this.props.item.uid))
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.DesignDetailStep !== nextProps.DesignDetailStep) {
            if (nextProps.DesignDetailStep.length) {
                if (nextProps.DesignDetailStep.length * 275 > this.state.w) {
                    this.setState({ right: true });
                }
            }
        }
        if (nextProps.DesignDetailStepCard && nextProps.DesignDetailStepCard.uid != null && this.props.DesignDetailStepCard !== nextProps.DesignDetailStepCard) {
            // console.log(nextProps.DesignDetailStepCard.uid, "i got it", nextProps.DesignDetailStepCard, this.props.DesignDetailStepCard, typeof this.props.DesignDetailStepCard);
            this.setState({ cardDetail: nextProps.DesignDetailStepCard });
        }
        return true;
    }
    async handleReturn(data) {
        console.log(data);
        let copy = [...this.state.content];
        for (let item of copy) {
            // if (item)
            if (item.uid === data.uid) {

            }
        }
    }
    render() {
        const { editor, item, ItemStep, userInfo } = this.props;
        const { gap, h, left, right, boardId, card, newcard, newstep, editstep, cardDetail, title, where } = this.state;
        const steps = ItemStep;

        return (
            <Wrapper>
                {item.uid ?
                    <React.Fragment>
                        {left ? <WhitePane width={138} height={h} background="transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%)">
                            <Arrow angle="0deg" gap={gap} left={50} onClick={this.ScrollLeft} />
                        </WhitePane> : null}

                        {right ? <WhitePane width={138} height={h} right={0} background="transparent linear-gradient(-90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)">
                            <Arrow angle="180deg" gap={gap} right={50} onClick={this.ScrollRight} />
                        </WhitePane> : null}

                        {editor && newcard &&
                            <NewCardModal
                                isTeam={editor} boardId={boardId} itemId={this.props.item.uid}
                                order={steps.length} open={newcard} return={this.handleReturn}
                                close={() => this.setState({ newcard: false })} />}

                        {card &&
                            <CardModal
                                bought={this.props.bought}
                                open={card} close={() => this.setState({ card: false })}
                                edit={editor} //userInfo && (userInfo.uid === cardDetail.user_id)}
                                card={cardDetail}
                                isTeam={editor}
                                title={title}
                                boardId={boardId}
                                itemId={this.props.item.uid} />}

                        {editor && newstep && <NewStepModal {...this.props} steps={steps} open={newstep} newStep={this.NewStep} close={this.CloseNewStep} />}
                        {editor && editstep && <EditStepModal open={editstep} title={title} where={where} steps={steps} RemoveStep={this.RemoveStep} EditStep={this.EditStep} close={this.CloseEditStep} />}

                        <ReactHeight onHeightReady={(height => { this.setState({ h: height }) })}>
                            <GridEditorWrapper ref={this.grid}>
                                <div style={{ width: window.innerWidth + "px" }} className="Editor" ref={this.temp}>
                                    {/* ------------단계 ------------*/}
                                    {steps && steps.length > 0 &&
                                        <SortableDesignSteps editStep={this.OpenEditStep} item_id={this.props.item.uid} editor={editor ? true : false} items={steps} cardReorder={this.requestCardReorder} createCard={this.createNewCard} openCard={this.openCard} reorder={this.requestReorder} />}
                                    {editor && <div style={{ display: "flex" }}>
                                        <CreateStep onClick={this.OpenNewStep} step={"단계"} /><div style={{ width: "300px" }}>&nbsp;</div>
                                    </div>}
                                </div>
                            </GridEditorWrapper>
                        </ReactHeight>
                    </React.Fragment>
                    : <div>FAILED TO LOAD DATA :( <br />PLEASE, REFRESH THIS PAGE... :)</div>
                }
            </Wrapper>)
    }
}

export default GridEditor;
