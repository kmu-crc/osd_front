import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { CreateCard, StepCard, ContentCard } from "./GridTools";
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";

const AsBelowArrow = styled.div`
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    width: ${props => props.percent * 100}px;
    height: ${props => props.percent * 65}px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: ${props => props.opacity};
    border-top: ${props => props.percent * 65}px solid ${props => props.color || "#707070"};
    border-left: ${props => props.percent * 50}px solid transparent;
    border-right:${props => props.percent * 50}px solid transparent;
    transform: rotate(${props => props.angle}deg);
`;
const Container = SortableContainer(({ children }) => { return <ul style={{ margin: "0px", padding: "0px" }}>{children}</ul> });
const HorizonDragHandle = SortableHandle(() =>
    <div style={{ display: "flex" }}>
        <AsBelowArrow color="#FF0000" angle={90} percent={.21} marginRight={7} />
        <AsBelowArrow color="#FF0000" angle={-90} percent={.21} />
    </div>)
const VerticalDragHandle = SortableHandle(({ is_white }) =>
    <div style={{ bakcground: "transparent" }}>
        <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={180} percent={.15} />
        <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={0} percent={.15} marginTop={7} />
    </div>)
const margin = { marginTop: "25px", marginRight: "74px", marginBottom: "37px" };
const SortableCard = SortableElement(({ editor, card, openCard, boardId, design_id }) => (
    <ContentCard onClick={() => openCard(card, card.order, boardId)} id="contentcard" uid={card.uid} {...margin} card={card} design_id={design_id} >
        {editor ? <VerticalDragHandle is_white={card.first_img} /> : null}
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
                <CreateCard onClick={() => createCard(step.order, boardId)} title={""} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} />
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
export default SortableDesignSteps;