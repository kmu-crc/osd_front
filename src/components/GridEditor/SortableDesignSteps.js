import React, { Component, } from 'react';
import styled from 'styled-components';
import { CreateCard, StepCard, ContentCard } from "./GridTools";
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";
import { alert } from "components/Commons/Alert/Alert";

const AsBelowArrow = styled.div`
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    width: ${props => props.percent * 100}px;
    height: ${props => props.percent * 50}px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: ${props => props.opacity};
    border-top: ${props => props.percent * 65}px solid ${props => props.color || "#707070"};
    border-left: ${props => props.percent * 50}px solid transparent;
    border-right:${props => props.percent * 50}px solid transparent;
    transform: rotate(${props => props.angle}deg);
`;
const DragHandler = styled.div`
    position: absolute;
    margin-left: 125px;
    margin-top: 25px;
    z-index: 800;
    .wrapper {
        display: flex;
        visibility: hidden;
    }
    .tip-txt {
        display: none;
        width: max-content;
        background-color: #000000;
        color: #FFFFFF;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        margin-top: -10px;
    }
    :hover {
        .wrapper {
            visibility: visible;
        }
        .tip-txt {
            display: block;
        }
    }
`;
let bought = false;
const Container = SortableContainer(({ children }) =>
    <ul style={{ margin: "0px", padding: "0px" }}>{children}</ul>);
const HorizonDragHandle = SortableHandle(() =>
    <div style={{ display: "flex" }}>
        <AsBelowArrow color="#FF0000" angle={90} percent={.21} marginRight={0} />
        <AsBelowArrow color="#FF0000" angle={-90} percent={.21} />
    </div>)
const VerticalDragHandle = SortableHandle(({ is_white }) =>
    <div>
        <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={180} percent={.21} />
        <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={0} percent={.21} marginTop={0} />
    </div>)
const margin = {
    marginTop: "10px", marginRight: "20px", marginBottom: "15px"
};
const SortableCard = SortableElement(({ disableReorder, editor, card, openCard, boardId, designId, userInfo }) => (
    <ContentCard
        // onClick={() => openCard(card, card.order, boardId)}
        onClick={async () =>
            (card.private === 1)
                ? (userInfo && (userInfo.uid === card.user_id || bought))
                    ? openCard(card, card.order, boardId)
                    : await alert("이 컨텐츠는 비공개입니다.\n컨텐츠 구매자만 열람할 수 있습니다.")
                : openCard(card, card.order, boardId)
            // : openCard(card, card.order, boardId)
        }
        id="contentcard" uid={card.uid} {...margin} card={card} designId={designId} >
        {/* {editor && !disableReorder ? <VerticalDragHandle is_white={card.first_img} /> : null} */}
    </ContentCard>));

const SortableStep = SortableElement(({ disableReorder, reload, index, editStep, step, boardId, editor, designId, openCard, createCard, reorder, userInfo }) => (
    <div style={{ position: "relative" }}>
        {<DragHandler>
            <div className="wrapper">
                {editor && !disableReorder ? <HorizonDragHandle /> : null}
                <div className="tip-txt">단계의 순서를<br />'드래그앤드롭'으로<br />바꾸실 수 있습니다.</div>
            </div>
        </DragHandler>}
        <StepCard
            onClick={() => editStep(step.title, step.uid)}
            title={step.title}
            uid={step.uid}
            id="stepcard"
            marginTop={0} marginRight={20} marginBottom={0} marginLeft={0} />

        {step.cards && step.cards.length > 0 ?
            <React.Fragment>
                <div style={{ marginTop: "10px" }}>
                    <AsBelowArrow angle={0} percent={.2} marginTop={0} marginRight={0} marginBottom={0} marginLeft={90} />
                </div>
                <div>
                    <SortableDesignCards
                        reload={reload}
                        editor={editor}
                        boardId={boardId}
                        stepindex={index}
                        items={step.cards}
                        designId={designId}
                        openCard={openCard}
                        reorder={reorder}
                        disableReorder={disableReorder}
                        userInfo={userInfo}
                    />
                </div>
            </React.Fragment> : null}

        {editor ?
            <React.Fragment>
                <div style={{ marginTop: "10px" }}>
                    <AsBelowArrow angle={0} percent={.2} marginTop={0} marginRight={0} marginBottom={0} marginLeft={90} />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <CreateCard
                        onClick={() => createCard({ order: (step && step.cards) ? step.cards.length : 0, id: boardId })}
                        title={""} step={"카드 "}
                        marginTop={0} marginRight={20} marginBottom={0} marginLeft={0} />
                </div>
            </React.Fragment> : null}
    </div>));

class SortableDesignCards extends Component {
    constructor(props) {
        super(props);
        this.state = { items: this.props.items };
        this.onSortEnd = this.onSortEnd.bind(this);
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return;
        this.setState(({ items }) => ({ items: arrayMove(items, oldIndex, newIndex), }));
        this.props.reorder(this.state.items);
    };
    componentDidUpdate(prevProps) {
        if (prevProps.reload !== this.props.reload) {
            return true;
        }
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.reload !== this.props.reload) {
            return true;
        }
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items });
            return true;
        }
        if (nextState.items !== this.state.items) {
            return true;
        }
        return false;
    };

    render() {
        const { items } = this.state;
        const { editor, designId, openCard, createCard, boardId, userInfo } = this.props;

        return (<Container
            axis="y"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            useDragHandle>
            {items.map((item, index) => (
                <SortableCard
                    stepindex={this.props.index}
                    cardindex={index}
                    createCard={createCard}
                    openCard={openCard}
                    boardId={boardId}
                    designId={designId}
                    editor={editor}
                    key={`step-${index}`}
                    index={index}
                    card={item}
                    disableReorder={this.props.disableReorder}
                    userInfo={userInfo}
                />))}
        </Container>)
    }
};
class SortableDesignSteps extends Component {
    state = { items: this.props.items };
    onSortEnd = async ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return;
        this.setState(({ items }) => ({ items: arrayMove(items, oldIndex, newIndex), }));
        this.props.reorder(this.state.items);
    }
    componentDidMount() {
        bought = this.props.bought;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.reload !== this.props.reload) {
            return true;
        }
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items });
            console.log("updated 2");
            return true;
        }
        if (nextState.items !== this.state.items) {
            console.log("updated 3");
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
        const { editor, designId, cardReorder, createCard, openCard } = this.props;
        return (<Container
            axis="x"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            // shouldCancelStart = { this.shouldCancelStart }
            useDragHandle={true}
        >
            <div style={{ display: "flex" }}>
                {items.map((item, index) => (
                    <SortableStep
                        reload={this.props.reload}
                        editStep={this.props.editStep}
                        boardId={item.uid}
                        createCard={createCard}
                        openCard={openCard}
                        reorder={cardReorder}
                        designId={designId}
                        disabled={!editor}
                        editor={editor}
                        key={`step-${index}`}
                        index={index}
                        step={item}
                        steporder={index}
                        disableReorder={this.props.disableReorder}
                        userInfo={this.props.userInfo}
                    />
                ))}
            </div>
        </Container >)
    }
};


export default SortableDesignSteps;
