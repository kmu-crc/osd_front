import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { CreateCard, StepCard, ContentCard } from "./GridTools";
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";
import { alert } from 'components/Commons/Alert/Alert';

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
const DragBox = styled.div`
    // display:flex;
    width:100%;
    height:100%;
    // border:1px solid black;
`

const Container = SortableContainer(({ children }) => { return <ul style={{ margin: "0px", padding: "0px" }}>{children}</ul> });
const HorizonDragHandle = SortableHandle(() => <DragBox>
    {/* <AsBelowArrow color="#FF0000" angle={90} percent={.21} marginRight={7} />
    <AsBelowArrow color="#FF0000" angle={-90} percent={.21} /> */}
</DragBox>)
const VerticalDragHandle = SortableHandle(({ is_white }) => <DragBox>
    {/* <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={180} percent={.21} /> */}
    {/* <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={0} percent={.21} marginTop={7} /> */}
</DragBox>)
const margin = { marginTop: "25px", marginRight: "0px", marginBottom: "37px" };
const SortableCard = SortableElement(({ editor, card, openCard, boardId, design_id, userInfo }) => (
    // console.log(card, userInfo)
    <ContentCard
        onClick={() =>
            // 비공개인가
            // 관리자인가 혹은 주인인가
            // (userInfo && userInfo.uid !== 762) ||
            // (card.private === 1 && (userInfo == null || userInfo.uid !== card.user_id)
            // ? alert("이 컨텐츠는 비공개컨텐츠 입니다.\n컨텐츠작성자만 열람할 수 있습니다.")
            (card.private === 1)
                ? (userInfo && (userInfo.uid === card.user_id || userInfo.uid === 77))
                    ? openCard(card, card.order, boardId)
                    : alert("이 컨텐츠는 비공개컨텐츠 입니다.\n컨텐츠작성자만 열람할 수 있습니다.")
                : openCard(card, card.order, boardId)
            // : openCard(card, card.order, boardId)
        }
        id="contentcard"
        editor={editor}
        uid={card.uid}
        {...margin}
        card={card}
        design_id={design_id} >
        {
            editor
                ? <VerticalDragHandle is_white={card.first_img
                } />
                : null}
    </ContentCard >

));
const HorizonBox = styled.div`
    position:relative;
    
    .bound_box{
        // border:1px solid black;
        width:110%;
        height:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        border-radius:15px;
    }
    margin-right:64px;
`
const DragHandler = styled.div`
    cursor:${props => props.editor === true ? "move" : "default"};;
    width:110%;
    height:110%;
    position: absolute;
    z-index:0;
    // z-index: 800;
    // margin-left: 150px;
    // margin-top: 30px;
    .wrapper_ {
        background-color:gray;
        opacity:0.1;
        width:100%;
        height:100%;
        display: flex;
        border-radius:15px;
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
        .wrapper_ {
            visibility: ${props => props.editor === true ? "visible" : "none"};
        }
        .tip-txt {
            display: block;
        }
    }
`;
const SortableStep = SortableElement(({ editStep, step, boardId, editor, design_id, openCard, createCard, reorder, userInfo }) => (
    <HorizonBox>
        <div className="bound_box">

            <DragHandler editor={editor}>
                <div className="wrapper_">
                    {editor ? <HorizonDragHandle /> : null}
                    {/* <div className="tip-txt">단계의 순서를<br />'드래그앤드롭'으로<br />바꾸실 수 있습니다.</div> */}
                </div>
            </DragHandler>
            <StepCard editor={editor} onClick={() => editStep(step.title, step.uid)} title={step.title} uid={step.uid} id="stepcard" marginTop={0} marginRight={0} marginBottom={0} marginLef={0} />


            {step.cards && step.cards.length > 0 &&
                <Fragment>
                    <div style={{ marginTop: "25px" }}>
                        <AsBelowArrow angle={0} percent={.25} marginTop={0} marginRight={0} marginBottom={0} marginLeft={0} />
                    </div>
                    <div>
                        <SortableDesignCards editor={editor} boardId={boardId} items={step.cards} design_id={design_id} openCard={openCard} reorder={reorder} userInfo={userInfo} />
                    </div>
                </Fragment>}
            {editor &&
                <div style={{ marginTop: step.cards && step.cards.length > 0 ? "0px" : "66px" }}>
                    {/* <CreateCard onClick={() => createCard(step.order, boardId)} title={""} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} />
                 */}

                    <CreateCard onClick={() => createCard(step.order, boardId)} title={""} step={"카드 "} marginTop={0} marginRight={0} marginBottom={0} marginLeft={0} />

                </div>
            }
        </div>
    </HorizonBox>
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
        const { editor, design_id, openCard, createCard, boardId, userInfo } = this.props;
        console.log("!!!!", userInfo);
        return (<Container
            axis="y"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            useDragHandle>
            {items.map((item, index) => (<SortableCard createCard={createCard} openCard={openCard} boardId={boardId} design_id={design_id} editor={editor} key={`step-${index}`} index={index} card={item} userInfo={userInfo} />))}
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
        const { editor, design_id, cardReorder, createCard, openCard, userInfo } = this.props;
        return (<Container
            axis="x"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            // shouldCancelStart={this.shouldCancelStart}
            useDragHandle>
            <div style={{ display: "flex" }}>
                {items.map((item, index) => (
                    <SortableStep editStep={this.props.editStep} boardId={item.uid} createCard={createCard} openCard={openCard} reorder={cardReorder} design_id={design_id} disabled={!editor} editor={editor} key={`step-${index}`} index={index} step={item} userInfo={userInfo} />
                ))}
            </div>
        </Container >)
    }
}

export default SortableDesignSteps;
