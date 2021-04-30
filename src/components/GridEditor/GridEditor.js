import React, { Component } from 'react';
import { CreateStep } from "./GridTools";
import styled from 'styled-components';
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import NewCardModal from "./NewCardModal";
import arrow from "source/arrow.svg";
import SortableDesignSteps from "./SortableDesignSteps";
import osdcss from "StyleGuide";
import { alert } from "components/Commons/Alert/Alert";
// import { ReactHeight } from 'react-height';
// import { confirm } from "components/Commons/Confirm/Confirm";

const LeftWhitePane = styled.div`
    position: absolute;
    z-index: 830;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    background: transparent linear-gradient(90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 0) 50%, rgba(255,255,255, 0) 100%);
    backgroundRepeat: no-repeat;
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        background: transparent linear-gradient(-90deg, rgba(255,255,255, 0) 20%,rgba(255,255,255, 1) 70%);
    }

`;
const RightWhitePane = styled.div`
    position: absolute;
    z-index: 830;
    width: ${props => props.width}px;
    height: ${props => props.height + "px" || "100%"};
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    background: #FFFFFF; // transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%);
    backgroundRepeat: no-repeat;
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        background: transparent linear-gradient(90deg, rgba(255,255,255, 0) 20%, rgba(255,255,255, 1) 70%);
    }

`;
const Arrow = styled.div`
    width: 6px;
    height: 30px;
    position: absolute;
    top: ${props => props.top + 6}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    z-index: 831;
    border: none;
    background-image: url(${arrow});
    background-size: cover;
    transform: rotate(${props => props.angle});
    opacity: 0.9;
    cursor:pointer;
    :hover{
        opacity: 1;
    }
    cursor: pointer;
    @media only screen and (min-width : ${osdcss.resolutions.MediumMinWidth}px) 
    and (max-width : ${1024}px) { 
        top: ${props => props.top}px;
    }
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        top:110px;
        // top: ${props => props.top}px;
    }
`;
const GridEditorWrapper = styled.div`
    display: flex;
    position:relative;
    width: ${window.innerWidth < osdcss.resolutions.LargeMaxWidth
        ? window.innerWidth
        : osdcss.resolutions.LargeMaxWidth}; 
    .Editor{
        overflow: hidden;
        display: flex;
        white-space: nowrap;
        // padding-left:10px;
        // padding-right: 250px;
        // margin-top: 30px;
    }
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        margin-left:60px;
    }
`;
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    // overflow-x: hidden;
    :hover {
        overflow-y: auto;
    }
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
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
        // this.setState({
        //     w: window.innerWidth < osdcss.resolutions.LargeMaxWidth
        //         ? window.innerWidth
        //         : osdcss.resolutions.LargeMaxWidth
        // });
        // if (this.temp) {
        //     if (this.temp.current.scrollWidth - this.temp.current.scrollLeft < this.state.w) {
        //         this.setState({ right: false });
        //     } else {
        //         this.setState({ right: true });
        //     }
        //     if (this.temp.current.scrollLeft > 0) { this.setState({ left: true }); }
        // }
    }
    createNewCard(row, boardId) {
        this.setState({ row: row, boardId: row.id, newcard: true });
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
            item.order = index;
            return item;
        })
        return list;
    }
    async RemoveStep(data) {
        await this.props.DeleteItemListRequest(this.props.itemId, data, this.props.token)
            .then(res => {
                console.log(res);
                this.requestReorder(this.sorting(this.props.ItemStep));
            })
            .then(res => {
                console.log(res);
                this.props.GetItemStepsRequest();
            })
            .catch((err) => {
                console.error(err);
                // alert("Failed to delete the STEP");
            });
    };
    async EditStep(data) {
        await this.props.UpdateItemListRequest(this.props.itemId, data.where, this.props.token, { title: data.title })
            .then(res => {
                console.log(res);
                this.props.GetItemStepsRequest();
            })
        this.CloseEditStep();
    }
    async NewStep(_data) {
        // content_id: 190
        // editor_type: "project"
        // name: "554"
        // type: "item"
        // uid: 11
        const data = { list_header_id: this.props.header.uid, title: _data.title, order: _data.where, content_id: this.props.item["item-id"], }
        await this.props.CreateItemListRequest(data, this.props.item["item-id"], this.props.token)
            .then(res => {
                console.log(res);
                this.props.GetItemStepsRequest();
            })
            .catch(async (err) => { await alert("Failed to create new STEP"); console.error(err) });
        this.CloseNewStep();
    }
    async ScrollLeft() {
        if (this.temp) {
            this.temp.current.scrollLeft -= 275;
            console.log(this.temp.current.scrollLeft, this.temp.current.scrollWidth - this.temp.current.scrollLeft, this.state.w);
            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft >= this.state.w - 300) {
                await this.setState({ right: true });
            }

            if (this.temp.current.scrollLeft === 0) {
                await this.setState({ left: false });
            }
        }
    }
    async ScrollRight() {
        if (this.temp) {
            this.temp.current.scrollLeft += 275;
            console.log(this.temp.current.scrollLeft, this.temp.current.scrollWidth - this.temp.current.scrollLeft, this.state.w);
            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft <= this.state.w - 300) {
                await this.setState({ right: false });
            }
            if (this.temp.current.scrollLeft >= 0) {
                await this.setState({ left: true });
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
        console.log(items);
        const jobs = [];
        let promiseAry = [];
        items.forEach((element, index) => {
            if (element.order !== index) {
                jobs.push({ uid: element.uid, neworder: index });
            }
        });
        if (jobs.length === 0) return;
        promiseAry = jobs.map(job =>
            this.props.UpdateItemListRequest(this.props.itemId, job.uid, this.props.token, { order: job.neworder }))

        await Promise.all(promiseAry).then(this.props.GetItemStepsRequest())
    }
    componentDidUpdate(props, state) {
        if (props.ItemStep !== this.props.ItemStep) {
            if (this.props.ItemStep.length) {
                if (this.props.ItemStep.length * 275 > this.grid.current.clientWidth) {
                    this.setState({ right: true });
                }
            }
            return true;
        }
        // if (nextProps.DesignDetailStepCard && nextProps.DesignDetailStepCard.uid != null && this.props.DesignDetailStepCard !== nextProps.DesignDetailStepCard) {
        // console.log(nextProps.DesignDetailStepCard.uid, "i got it", nextProps.DesignDetailStepCard, this.props.DesignDetailStepCard, typeof this.props.DesignDetailStepCard);
        // this.setState({ cardDetail: nextProps.DesignDetailStepCard });
        // }
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
        const { editor, ItemStep: steps, itemId, userInfo } = this.props;
        const { gap, h, left, right, boardId, card, row, newcard, newstep, editstep, cardDetail, title, where } = this.state;
        console.log(h);
        return (<Wrapper>
            {itemId ?
                <React.Fragment>
                    {left ?
                        // <LeftWhitePane width={43} height={h} background="transparent linear-gradient(0deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%)">
                        <Arrow angle="0deg" top={5} gap={0} left={3} onClick={this.ScrollLeft} />
                        // </LeftWhitePane>
                        : null}

                    {right ?
                        <RightWhitePane width={25} right={0} background="transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%)">
                            <Arrow angle="180deg" top={5} gap={0} right={3} onClick={this.ScrollRight} />
                        </RightWhitePane>
                        : null}

                    {editor && newcard ?
                        <NewCardModal
                            GetItemStepsRequest={this.props.GetItemStepsRequest}

                            // boardId={boardId}
                            // order={steps.length}
                            isTeam={editor}
                            itemId={this.props.itemId}
                            open={newcard}
                            row={row}
                            return={this.handleReturn}
                            close={() => this.setState({ newcard: false })}
                        /> : null}


                    {editor && newstep ?
                        <NewStepModal
                            {...this.props}
                            steps={steps}
                            open={newstep}
                            newStep={this.NewStep}
                            close={this.CloseNewStep}
                        /> : null}

                    {editor && editstep ?
                        <EditStepModal
                            open={editstep}
                            title={title}
                            where={where}
                            steps={steps}
                            RemoveStep={this.RemoveStep}
                            EditStep={this.EditStep}
                            close={this.CloseEditStep}
                        /> : null}

                    {/* <ReactHeight onHeightReady={(height => { this.setState({ h: height }) })}> */}
                    <GridEditorWrapper ref={this.grid} id="herehere!">
                        <div style={{ width: window.innerWidth + "px" }} className="Editor" ref={this.temp}>
                            {/* ------------단계 ------------*/}
                            {steps && steps.length > 0 ?
                                <SortableDesignSteps
                                    bought={this.props.bought}
                                    editStep={this.OpenEditStep}
                                    item_id={this.props.item.uid}
                                    editor={editor ? true : false}
                                    items={steps}
                                    cardReorder={this.requestCardReorder}
                                    createCard={this.createNewCard}
                                    openCard={this.openCard}
                                    reorder={this.requestReorder}
                                    userInfo={userInfo}
                                /> : null}
                            {editor ?
                                <div style={{ display: "flex" }}>
                                    <CreateStep
                                        userInfo={this.props.userInfo}
                                        onClick={this.OpenNewStep}
                                        step={"단계"} />
                                    <div style={{ width: "300px" }}>&nbsp;</div>
                                </div> : null}
                        </div>
                    </GridEditorWrapper>


                    {card ?
                        <CardModal
                            GetItemStepsRequest={this.props.GetItemStepsRequest}
                            bought={this.props.bought}
                            open={card} close={() => this.setState({ card: false })}
                            edit={editor} //userInfo && (userInfo.uid === cardDetail.user_id)}
                            card={cardDetail}
                            isTeam={editor}
                            // title={title}
                            boardId={boardId}
                            itemId={itemId}
                        /> : null}
                    {/* </ReactHeight> */}
                </React.Fragment>


                : <div>FAILED TO LOAD DATA :( <br />
                    PLEASE, REFRESH THIS PAGE... :)</div>
            }
        </Wrapper>)
    }
}

export default GridEditor;
