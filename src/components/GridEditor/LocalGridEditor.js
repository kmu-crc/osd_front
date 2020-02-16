import React, { Component } from 'react';
import { CreateStep } from "./GridTools";
import styled from 'styled-components';
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import { LocalNewCardModal } from "./LocalNewCardModal";
import { LocalCardModal } from "./LocalCardModal";
import { ReactHeight } from 'react-height';
import arrow from "source/arrow.svg";
import SortableDesignSteps from "./SortableDesignSteps";
import SortableDesignSteps2 from "./SortableDesignSteps2";
import osdcss from "StyleGuide";

const WhitePane = styled.div`
    position: absolute;
    z-index: 830;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    background: #FFFFFF; // ${props => props.left ? "transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%)" : "transparent linear-gradient(-90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)"}
    background-repeat: no-repeat;
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
    margin-left: 32px;
    margin-bottom: 75px;
    width: ${window.innerWidth < osdcss.resolutions.LargeMaxWidth ? window.innerWidth : osdcss.resolutions.LargeMaxWidth}; 
    .Editor {
        width: ${props => props.editorWidth}px;
        padding-right: 250px;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        margin-top: 90px;
    }
    .plus {
        display: flex;
        .space { 
            width: 300px;
        }
    }
`;

const DUMMY = {
    //info

    // data(steps)
    steps: [
        {
            uid: 0,
            order: 0,
            title: "First step",
            cards: [
                {
                    uid: 0,
                    order: 0,
                    title: "First Card",
                    //
                    content: "First Card Content",
                    contents: [
                        { uid: 0, order: 0, type: "TEXT", content: "text test" },
                        { uid: 1, order: 1, type: "TEXT", content: "text test" },
                        { uid: 2, order: 2, type: "TEXT", content: "text test" },
                        { uid: 3, order: 3, type: "TEXT", content: "text test" },
                        { uid: 4, order: 4, type: "TEXT", content: "text test" }
                    ]
                },
                {
                    uid: 1,
                    order: 1,
                    title: "Second Card",
                    //
                    content: "Second Card Content",
                    contents: [
                        { uid: 5, order: 0, type: "TEXT", content: "test test" },
                        { uid: 6, order: 1, type: "TEXT", content: "text test" },
                        { uid: 7, order: 2, type: "TEXT", content: "test test" },
                        { uid: 8, order: 3, type: "TEXT", content: "text test" },
                        { uid: 9, order: 4, type: "TEXT", content: "test test" }
                    ]
                },
                {
                    uid: 2,
                    order: 2,
                    title: "Third Card",
                    //
                    content: "Third Card Content",
                    contents: [
                        { uid: 10, order: 0, type: "TEXT", content: "test test" },
                        { uid: 11, order: 1, type: "TEXT", content: "text test" },
                        { uid: 12, order: 2, type: "TEXT", content: "test test" },
                        { uid: 13, order: 3, type: "TEXT", content: "text test" },
                        { uid: 14, order: 4, type: "TEXT", content: "test test" }
                    ]
                }
            ]
        },
        {
            uid: 1,
            order: 1,
            title: "Seconde step",
            cards: [
                {
                    uid: 3,
                    order: 0,
                    title: "First Card",
                    //
                    content: "First Card Content",
                    contents: [
                        { uid: 15, order: 0, type: "TEXT", content: "text test" },
                        { uid: 16, order: 1, type: "TEXT", content: "text test" },
                        { uid: 17, order: 2, type: "TEXT", content: "text test" },
                        { uid: 18, order: 3, type: "TEXT", content: "text test" },
                        { uid: 19, order: 4, type: "TEXT", content: "text test" }
                    ]
                },
                {
                    uid: 4,
                    order: 1,
                    title: "Second Card",
                    //
                    content: "Second Card Content",
                    contents: [
                        { uid: 20, order: 0, type: "TEXT", content: "test test" },
                        { uid: 21, order: 1, type: "TEXT", content: "text test" },
                        { uid: 22, order: 2, type: "TEXT", content: "test test" },
                        { uid: 23, order: 3, type: "TEXT", content: "text test" },
                        { uid: 24, order: 4, type: "TEXT", content: "test test" }
                    ]
                },
                {
                    uid: 5,
                    order: 2,
                    title: "Third Card",
                    //
                    content: "Third Card Content",
                    contents: [
                        { uid: 25, order: 0, type: "TEXT", content: "test test" },
                        { uid: 26, order: 1, type: "TEXT", content: "text test" },
                        { uid: 27, order: 2, type: "TEXT", content: "test test" },
                        { uid: 28, order: 3, type: "TEXT", content: "text test" },
                        { uid: 29, order: 4, type: "TEXT", content: "test test" }
                    ]
                }
            ]
        },
    ]
}

export class LocalGridEditor extends Component {
    constructor(props) {
        super(props);
        this.temp = React.createRef();
        this.grid = React.createRef();
        this.state = {
            h: 0, w: window.innerWidth < osdcss.resolutions.LargeMaxWidth ? window.innerWidth : osdcss.resolutions.LargeMaxWidth,
            left: false, right: false, card_loading: false, card: false, newcard: false, row: null, col: null, cardOrder: null,
            boardId: null, newstep: false, editstep: false, cardDetail: null, title: null, where: null, tmp: null, reload: 0,
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
        this.handleReturnNewCardData = this.handleReturnNewCardData.bind(this);
        this.handleReturnChangedData = this.handleReturnChangedData.bind(this);

        // added //
        this.removeCard = this.removeCard.bind(this);
        this.updateReload = this.updateReload.bind(this);
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
    createNewCard(data) {
        this.setState({ newcard: true, boardId: data.id, cardOrder: data.order, content: data.content });
        console.log("zlzl", data);
    }
    openCard = (card, row, boardId) => {
        this.setState({ cardDetail: card, title: card.title, row: row, boardId: boardId, card: true });
        console.log("zlzl", card, row, boardId);
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
        let copyContent = [...this.props.content];
        copyContent.splice(data, 1);
        copyContent = this.sorting(copyContent);
        this.props.returnContent(copyContent);
    }
    async EditStep(data) {
        let copyContent = [...this.props.content];
        copyContent.splice(data.where, 1, { uid: data.uid, title: data.title, where: data.where });
        copyContent = this.sorting(copyContent);
        this.props.returnContent(copyContent);
        this.CloseEditStep();
    }
    async NewStep(data) {
        let copyContent = [...this.props.content];
        copyContent.push({ uid: copyContent.length || 0, title: data.title, where: data.where, cards: [] });
        copyContent = this.sorting(copyContent);
        this.props.returnContent(copyContent);
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
    async handleReturnChangedData(data) {
        let copy = [...this.props.content];
        for (let item of copy) {
            if (item.uid === data.card.boardId) {
                item = { ...data.card, nick_name: item.nick_name, contents: data.content.data.newContent }
            }
        }
        this.props.returnContent(copy);
        // await this.setState({ content: copy });
        // this.props.returnContent(this.state.content);
        this.updateReload();
    }
    async handleReturnNewCardData(data) {
        let copy = [...this.props.content];
        console.log(copy, data);
        for (let item of copy) {
            if (item.uid === data.card.boardId) {
                item.cards.push({
                    ...data.card,
                    nick_name: this.props.userInfo.nickName,
                    contents: data.content.data.newContent
                });
            }
        }
        // await this.setState({ content: copy });
        console.log("new-card",copy);
        this.props.returnContent(copy);
        this.updateReload();
    }

    // added
    removeCard(boardId, cardId) {
        let copyContent = [...this.props.content];
        copyContent[boardId].cards.splice(cardId, 1);
        this.props.returnContent(copyContent);
        this.updateReload();
    }
    updateReload() {
        this.setState({ reload: (this.state.reload + 1) % 10 });
    }


    render() {
        const { editor, content, /*userInfo*/ } = this.props;
        const { gap, h, /*row,*/ reload, cardOrder, left, right, boardId, card, newcard, newstep, editstep, cardDetail, title, where } = this.state;
        const steps = content;
        console.log("steps:", content);
        return (
            <Wrapper>
                {/* <React.Fragment> */}
                {left ?
                    <WhitePane width={138} height={h} left >
                        <Arrow angle="0deg" gap={gap} left={50} onClick={this.ScrollLeft} />
                    </WhitePane> : null}

                {right ?
                    <WhitePane width={138} height={h} right={0} >
                        <Arrow angle="180deg" gap={gap} right={50} onClick={this.ScrollRight} />
                    </WhitePane> : null}

                {editor && newcard ?
                    <LocalNewCardModal
                        close={() => this.setState({ newcard: false })}
                        open={newcard}
                        designId={"local"}
                        isTeam={editor}
                        boardId={boardId}
                        order={cardOrder}
                        return={this.handleReturnNewCardData}
                    /> : null}

                {card ?
                    <LocalCardModal
                        close={() => this.setState({ card: false })}
                        open={card}
                        designId={"local"}
                        isTeam={editor}
                        boardId={boardId}
                        edit={true}
                        card={cardDetail}
                        title={title}
                        return={this.handleReturnChangedData}
                        removeCard={this.removeCard}
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
                        close={this.CloseEditStep}
                        open={editstep}
                        title={title}
                        where={where}
                        steps={steps}
                        RemoveStep={this.RemoveStep}
                        EditStep={this.EditStep}
                    /> : null}

                {/* alsdkjfaslkj */}
                <ReactHeight onHeightReady={(height => { this.setState({ h: height }) })}>
                    <GridEditorWrapper ref={this.grid} editorWidth={window.innerWidth}>
                        <div className="Editor" ref={this.temp}>
                            {/* ------------ 단계 ------------*/}
                            {steps && steps.length > 0 ?
                                <SortableDesignSteps
                                    editStep={this.OpenEditStep}
                                    designId={"local"}
                                    editor={editor}
                                    items={steps}
                                    reload={reload}
                                    createCard={this.createNewCard}
                                    openCard={this.openCard}
                                    disableReorder={true}
                                // cardReorder={this.requestCardReorder}
                                // reorder={this.requestReorder} 
                                /> : null}

                            {/* ------------ 추가 ------------*/}
                            {editor ?
                                <div className="plus">
                                    <CreateStep onClick={this.OpenNewStep} step={"단계"} />
                                    <div className="space">&nbsp;</div>
                                </div> : null}

                        </div>

                    </GridEditorWrapper>

                </ReactHeight>


                {/* new editor */}
                {/* {DUMMY ?
                        <SortableDesignStep2
                            steps={DUMMY.steps} />
                        : null} */}
                {/* end of new eidtor */}
                {/* </React.Fragment> */}
            </Wrapper>)
    }
}
