import React, { Component } from 'react';
import styled from 'styled-components';
import { StepCard, ContentCard, CreateCard, CreateStep, } from "./GridTools";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import CardModal from "./CardModal";
import NewCardModal from "./NewCardModal";
import StepReOrderModal from "./StepReOrderModal";
import CardReOrderModal from "./CardReOrderModal";
import arrow from "source/arrow.svg";
import Cross from 'components/Commons/Cross';
// import osdcss from "opendesign_style";

const EditorWrapper = styled.div`
    // border: 1px solid blue;
    margin-top: 100px;
    padding-bottom: 35px;
    width: 100%;

    .step-wrapper {
        width: max-content;
        margin: auto;
        position: relative;
        display: flex;
        flex-direction: row;

        .more-button {
          position: absolute;
          right: -50px;
        }
        .more-menu {
          position: absolute;
          border: 2px solid #707070;
          border-radius: 5px;
          box-shadow: 2.5px 2.5px #EFEFEF;
          background-color: white;
          width: 150px;
          right: -50px;
          top: 30px;
          display: none;
          ul {
            text-align: center;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          li {
              padding: 10px;
              font-size: 1rem;
              color: #707070;
              font-weight: 500;
          }
          &.active {
            display: block;
          }
        }
    }
    .navigation {
        position: relative;
        .normal {
            position: absolute;
            top: 50px;
        }
        .left {
            left: 5px;
        }
        .right {
            right: 5px;
        }
    }
    .cards-wrapper {
        width: max-content;
        margin: auto;
        .card {
            margin: 15px;
        }
    }
`;
const Arrow = styled.div`
    width: 17px;
    height: 48px;
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
`;
class GridEditorMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /* parameters */
            step: 0,
            /* modal flags */
            card: false,
            editstep: false,
            newstep: false,
            more: false,
            stepreorder: false,
            cardreorder: false,
        };
        this.changeStep = this.changeStep.bind(this);
        this.EditStep = this.EditStep.bind(this);
        this.CloseEditStep = this.CloseEditStep.bind(this);
        this.NewStep = this.NewStep.bind(this);
        this.CloseNewStep = this.CloseNewStep.bind(this);
        this.RemoveStep = this.RemoveStep.bind(this);
        this.StepReOrderModal = this.StepReOrderModal.bind(this);
        this.requestReorder = this.requestReorder.bind(this);
        this.requestCardReorder = this.requestCardReorder.bind(this);
    };

    // navigation
    changeStep(offset) {
        this.setState({ step: this.state.step + offset, more: false, });
    }

    // edit step
    async EditStep(data) {
        await this.props.UpdateDesignBoardRequest(data.where, this.props.token, { title: data.title })
            .then(() =>
                this.props.UpdateDesignTime(this.props.design.uid, this.props.token))
            .then(() =>
                this.props.GetDesignBoardRequest(this.props.design.uid))
            .then(() =>
                this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token))
            .catch(err => console.error(err));
        this.CloseEditStep();
    }
    async RemoveStep(data) {
        await this.props.DeleteDesignBoardRequest(this.props.design.uid, data, this.props.token)
            .then(() =>
                this.props.UpdateDesignTime(this.props.design.uid, this.props.token))
            .then(() =>
                this.props.GetDesignBoardRequest(this.props.design.uid))
            .then(() =>
                this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token))
            .then(() => {
                let step = (this.props.DesignDetailStep && this.props.DesignDetailStep.length - 1 < 0) ? 0 : this.props.DesignDetailStep.length - 1;
                this.setState({ step: step, more: false, });
            })
            .catch(err =>
                console.error(err))
    }
    CloseEditStep() {
        this.setState({ editstep: false, more: false, });
    }

    // add step
    async NewStep(data) {
        await this.props.CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
            .then(() =>
                this.props.UpdateDesignTime(this.props.design.uid, this.props.token))
            .then(() =>
                this.props.GetDesignBoardRequest(this.props.design.uid))
            .then(() =>
                this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token))
            .catch(err =>
                console.error(err))

        this.CloseNewStep();
    }
    CloseNewStep() {
        this.setState({ newstep: false, more: false });
    }

    // add card
    createCard() {
        this.setState({ newcard: true, more: false });
    }

    // re-order 
    StepReOrderModal() {
        this.setState({ stepreorder: true, more: false });
    }
    CardReOrderModal() {
        this.setState({ cardreorder: true, more: false });
    }
    async requestReorder(jobs) {
        if ((jobs == null) && (jobs.length === 0)) return;

        let promiseAry
            = jobs.map(job =>
                this.props.UpdateDesignBoardRequest(
                    job.uid, this.props.token, { order: job.neworder }));

        await Promise
            .all(promiseAry)
            .then(this.props.GetDesignBoardRequest(this.props.design.uid));
    }
    async requestCardReorder(jobs, step_uid) {
        if (jobs == null && jobs.length === 0)
            return;
        let promiseAry
            = jobs.map(job =>
                this.props.UpdateCardTitleRequest(
                    { order: job.neworder }, this.props.token, job.uid));

        await Promise
            .all(promiseAry)
            .then(this.props.GetDesignBoardRequest(this.props.design.uid))
            .then(this.props.GetDesignCardRequest(this.props.design.uid, step_uid));
    }

    render() {
        const { design, DesignDetailStep, editor, userInfo, } = this.props;
        const { editstep, newstep, card, newcard, more, stepreorder, cardreorder } = this.state;
        const Step = (DesignDetailStep && DesignDetailStep.filter(step => step.order === this.state.step)[0]) || { title: "데이터 없음", isEmpty: true };
        console.log(this.props);
        console.log(Step, card);

        return (<React.Fragment> mobile version
            {/* edit step modal */}
            {editor && <EditStepModal
                open={editstep}
                title={Step.title}
                where={Step.uid}
                steps={DesignDetailStep}
                RemoveStep={this.RemoveStep}
                EditStep={this.EditStep}
                close={this.CloseEditStep}
            />}

            {/* new step modal */}
            {editor && <NewStepModal
                {...this.props}
                open={newstep}
                newStep={this.NewStep}
                close={this.CloseNewStep}
            />}

            {/* card modal */}
            {card !== false &&
                <CardModal
                    isTeam={editor}
                    edit={userInfo && (userInfo.uid === card.user_id)}
                    open={card}
                    close={() => this.setState({ card: false })}
                    title={card.title}
                    boardId={Step.uid}
                    designId={design.uid}
                    card={card} />}

            {/* new card modal */}
            {editor &&
                <NewCardModal
                    open={newcard}
                    close={() => this.setState({ newcard: false })}
                    isTeam={editor}
                    boardId={Step.uid}
                    designId={design.uid}
                    order={DesignDetailStep.length}
                />}

            {editor &&
                <StepReOrderModal
                    title={"단계"}
                    open={stepreorder}
                    close={() => this.setState({ stepreorder: false })}
                    current={Step.order}
                    options={DesignDetailStep.map(step =>
                        ({ value: step.order, text: `(${step.order}) ${step.title}`, uid: step.uid }))}
                    reorder={this.requestReorder}
                />}

            {editor &&
                <CardReOrderModal
                    title={"카드"}
                    open={cardreorder}
                    close={() => this.setState({ cardreorder: false })}
                    options={Step.cards &&
                        Step.cards.length > 0 &&
                        Step.cards.map(card =>
                            ({ value: card.order, text: `(${card.order}) ${card.title}`, uid: card.uid }))}
                    reorder={(data) =>
                        this.requestCardReorder(data, Step.uid)}
                />}

            {/* step detail */}
            {design.uid &&
                <EditorWrapper>
                    {/* step */}
                    <div className="step-wrapper">
                        {this.state.step === DesignDetailStep.length ?
                            <CreateStep
                                onClick={() => editor && this.setState({ newstep: true, more: false })} />
                            :
                            <StepCard
                                onClick={() => editor && this.setState({ editstep: true, more: false })}
                                id={Step.id}
                                uid={Step.uid}
                                title={Step.title}
                                editor={editor}
                                marginTop={0} marginLeft={0} marginBottom={10} marginRight={0}
                            />}

                        <div className="more-button" onClick={() => this.setState({ more: !more })}>
                            <i aria-hidden="true" className="ellipsis vertical icon"></i>
                        </div>

                        <div className={`more-menu ${more ? "active" : ""}`} >
                            <ul>
                                <li onClick={() => this.StepReOrderModal()}>단계 순서변경</li>
                                <li onClick={() => this.CardReOrderModal()}>카드 순서변경</li>
                            </ul>
                        </div>
                    </div>

                    {/* navigation */}
                    <div className="navigation">
                        {this.state.step > 0
                            ? <div className="normal left">
                                <Arrow angle="0deg" onClick={() => this.changeStep(-1)} />
                            </div> : null}
                        {this.state.step < (DesignDetailStep && DesignDetailStep.length || 0)
                            ? <div className="normal right">
                                <Arrow angle="180deg" onClick={() => this.changeStep(+1)} />
                            </div> : null}
                    </div>

                    {/* cards */}
                    <div id="cards-wrapper" className="cards-wrapper">
                        {Step &&
                            Step.cards &&
                            Step.cards.length > 0 &&
                            Step.cards.map(card =>
                                <div className="card"
                                    key={card.uid + card.title}>
                                    <ContentCard
                                        onClick={async () => await this.setState({ card: Step.cards.find(_card => _card.uid === card.uid) })}
                                        id="contentcard"
                                        editor={false}
                                        uid={card.uid}
                                        card={card}
                                        design_id={design.uid} />
                                </div>
                            )}

                        {editor && Step.isEmpty == null
                            ? <div className="card">
                                <CreateCard
                                    onClick={() => this.createCard()}
                                    title={""} step={"카드 "}
                                    marginTop={0} marginRight={0} marginBottom={0} marginLeft={0} />
                            </div> : null}

                    </div>
                </EditorWrapper>}
        </React.Fragment>)
    }
}

export default GridEditorMobile;
