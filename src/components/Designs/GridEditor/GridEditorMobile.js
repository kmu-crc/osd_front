import React, { Component } from "react";
import styled from "styled-components";
// import { StepCard, ContentCard, CreateCard, CreateStep, } from "./GridTools";
import NewStepModal from "./NewStepModalMobile";
import EditStepModal from "./EditStepModal";
import CardModal from "./CardModalMobile";
import NewCardModal from "./NewCardModalMobile";
import StepReOrderModal from "./StepReOrderModal";
import CardReOrderModal from "./CardReOrderModal";
import DateFormat from "modules/DateFormat";
import new_logo_lock from "source/new_logo_lock.svg";
import new_logo_cross from "source/new_logo_cross.svg";
import arrow from "source/mobile_step_arrow_below.svg";
import Cross from "components/Commons/Cross";

const EditorWrapper = styled.div`
  // border: 1px solid blue;
  margin-top: 10px;
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
      box-shadow: 2.5px 2.5px #efefef;
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
  transform: rotate(${(props) => props.angle});
  opacity: 0.9;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  // *{border:1px solid red;}

  #style-2::-webkit-scrollbar-track {
    border: 1px solid #7a7a7a;
    border-radius: 10px;
    background: transparent;
  }

  #style-2::-webkit-scrollbar {
    background-color: white;
  }

  #style-2::-webkit-scrollbar-thumb {
    background-color: red;
    height: 1px;
    width: 1px;
  }
`;
const ArrowBelow = (
  <svg
    id="구성_요소_34_2"
    data-name="구성 요소 34 – 2"
    xmlns="http://www.w3.org/2000/svg"
    width="10.85"
    height="9.435"
    viewBox="0 0 10.85 9.435"
  >
    <path
      id="다각형_5"
      data-name="다각형 5"
      d="M5.425,0,10.85,9.435H0Z"
      transform="translate(10.85 9.435) rotate(180)"
    />
  </svg>
);

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
    this.OpenEditStep = this.OpenEditStep.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.EditStep = this.EditStep.bind(this);
    this.CloseEditStep = this.CloseEditStep.bind(this);
    this.NewStep = this.NewStep.bind(this);
    this.CloseNewStep = this.CloseNewStep.bind(this);
    this.RemoveStep = this.RemoveStep.bind(this);
    this.StepReOrderModal = this.StepReOrderModal.bind(this);
    this.requestReorder = this.requestReorder.bind(this);
    this.requestCardReorder = this.requestCardReorder.bind(this);
  }
  moreRef = React.createRef();

  // navigation
  changeStep(offset) {
    this.setState({ step: this.state.step + offset, more: false });
  }

  // edit step
  async EditStep(data) {
    // console.log({ data }); return;
    await this.props
      .UpdateDesignBoardRequest(data.where, this.props.token, {
        title: data.title,
      })
      .then(() =>
        this.props.UpdateDesignTime(this.props.design.uid, this.props.token)
      )
      .then(() => this.props.GetDesignBoardRequest(this.props.design.uid))
      .then(() =>
        this.props.GetDesignDetailRequest(
          this.props.design.uid,
          this.props.token
        )
      )
      .catch((err) => console.error(err));
    this.CloseEditStep();
  }
  async RemoveStep(data) {
    await this.props
      .DeleteDesignBoardRequest(this.props.design.uid, data, this.props.token)
      .then(() =>
        this.props.UpdateDesignTime(this.props.design.uid, this.props.token)
      )
      .then(() => this.props.GetDesignBoardRequest(this.props.design.uid))
      .then(() =>
        this.props.GetDesignDetailRequest(
          this.props.design.uid,
          this.props.token
        )
      )
      .then(() => {
        let step =
          this.props.DesignDetailStep &&
            this.props.DesignDetailStep.length - 1 < 0
            ? 0
            : this.props.DesignDetailStep.length - 1;
        this.setState({ step: step, more: false });
      })
      .catch((err) => console.error(err));
  }
  CloseEditStep() {
    this.setState({ editstep: false, more: false });
  }

  // add step
  async NewStep(data) {
    await this.props
      .CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
      .then(() =>
        this.props.UpdateDesignTime(this.props.design.uid, this.props.token)
      )
      .then(() => this.props.GetDesignBoardRequest(this.props.design.uid))
      .then(() =>
        this.props.GetDesignDetailRequest(
          this.props.design.uid,
          this.props.token
        )
      )
      .catch((err) => console.error(err));

    this.CloseNewStep();
  }
  CloseNewStep() {
    this.setState({ newstep: false, more: false });
  }

  // add card
  createCard(boardid) {
    this.setState({ boardId: boardid, newcard: true, more: false });
  }

  // re-order
  StepReOrderModal() {
    this.setState({ stepreorder: true, more: false });
  }
  CardReOrderModal() {
    this.setState({ cardreorder: true, more: false });
  }
  async requestReorder(jobs) {
    if (jobs == null && jobs.length === 0) return;

    let promiseAry = jobs.map((job) =>
      this.props.UpdateDesignBoardRequest(job.uid, this.props.token, {
        order: job.neworder,
      })
    );

    await Promise.all(promiseAry).then(
      this.props.GetDesignBoardRequest(this.props.design.uid)
    );
  }
  async requestCardReorder(jobs, step_uid) {
    if (jobs == null && jobs.length === 0) return;
    let promiseAry = jobs.map((job) =>
      this.props.UpdateCardTitleRequest(
        { order: job.neworder },
        this.props.token,
        job.uid
      )
    );

    await Promise.all(promiseAry)
      .then(this.props.GetDesignBoardRequest(this.props.design.uid))
      .then(this.props.GetDesignCardRequest(this.props.design.uid, step_uid));
  }

  // open more button
  checkClickOutSideMoreButton = (event) => {
    if (this.moreRef.current === null) return;
    if (!this.moreRef.current.contains(event.target)) {
      this.setState({ more: false });
      document.removeEventListener(
        "mousedown",
        this.checkClickOutSideMoreButton
      );
      //console.log("event removed");
    }
  };
  openMoreMenu = (_) => {
    document.addEventListener("mousedown", this.checkClickOutSideMoreButton);
    //console.log("event added");
    this.setState({ more: true });
  };
  async OpenEditStep(title, where) {
    await this.setState({ editstep: true, title: title, where: where });
  }
  render() {
    const { design, DesignDetailStep: steps, editor, userInfo } = this.props;
    const { editstep, newstep, card, newcard, more, stepreorder, cardreorder } =
      this.state;
    //
    // || { title: "데이터 없음", isEmpty: true };
    console.log(this.props);
    // console.log(Step, card);

    return (
      <Wrapper>
        {/* {editor &&
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
                />} */}

        {/* edit step modal */}
        {editor && (
          <EditStepModal
            open={editstep}
            title={this.state.title}
            where={this.state.where}
            steps={steps}
            RemoveStep={this.RemoveStep}
            EditStep={this.EditStep}
            close={this.CloseEditStep}
          />
        )}

        {/* new step modal */}
        {editor && (
          <NewStepModal
            {...this.props}
            open={newstep}
            newStep={this.NewStep}
            close={this.CloseNewStep}
          />
        )}

        {/* new card modal */}
        {editor ? (
          <NewCardModal
            isTeam={editor}
            boardId={this.state.boardId}
            designId={this.props.design.uid}
            is_problem={this.props.design.is_problem}
            open={newcard}
            close={() => this.setState({ newcard: false, boardId: null })}
          />
        ) : null}

        {/* card modal */}
        {card !== false && (
          <CardModal
            isTeam={editor}
            edit={userInfo && userInfo.uid === card.user_id}
            open={card}
            close={() => this.setState({ card: false })}
            title={card.title}
            boardId={card.uid}
            designId={design.uid}
            card={card}
          />
        )}

        <div
          style={{
            marginTop: "18px",
            marginLeft: "9px",
            paddingLeft: "9px",
            marginRight: "9px",
            width: `${window.innerWidth - 18}px`,
            height: `${window.innerHeight - 333}px`,
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
            overflowY: "scroll",
          }}
          id="style-2"
        >
          {/* <div ref={this.moreRef} className="more-menu active" >
                    <ul>
                        <li onClick={() => this.StepReOrderModal()}>단계 순서변경</li>
                        <li onClick={() => this.CardReOrderModal()}>카드 순서변경</li>
                    </ul>
                </div> */}

          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                marginRight: "29px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* step */}
              <div
                onClick={() =>
                  editor &&
                  this.setState({
                    editstep: true,
                    title: step.title,
                    where: step.uid,
                  })
                }
                style={{
                  width: "146px",
                  height: "25px",
                  backgroundColor: "#515151",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    width: "max-content",
                    height: "25px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    lineHeight: "25px",
                    fontFamily: "Spoqa Han Sans",
                    fontWeight: "700",
                  }}
                >
                  {step.title}
                </p>
              </div>

              <div
                style={{
                  height: "9px",
                  margin: "auto",
                  width: "max-content",
                  marginBottom: "7px",
                }}
              >
                <img src={arrow} />
              </div>

              {/* cards */}
              {step.cards.map((card, cidx) => (
                <div
                  key={cidx}
                  onClick={async () =>
                    card.private === 1
                      ? userInfo &&
                        (userInfo.uid === card.user_id || userInfo.uid === 77)
                        ? await this.setState({ card: card })
                        : alert(
                          "이 컨텐츠는 비공개입니다.\n컨텐츠 작성자만 열람할 수 있습니다."
                        )
                      : await this.setState({ card: card })
                  }
                  style={{
                    marginTop: cidx === 0 ? "7px" : "29px",
                    width: "146px",
                    minWidth: "146px",
                    height: "146px",
                    minHeight: "146px",
                    backgroundColor: "#CCC",
                    backgroundImage: `url(${card.first_img && card.first_img.m_img
                      })`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    border: "1px solid #A3A0A0",
                    position: "relative",
                    boxShadow: "8px 8px 8px #4141411A",
                  }}
                >
                  {/* {card.first_img} */}
                  {card.private === 1 ? (
                    <div
                      style={{
                        top: "6px",
                        left: "7px",
                        position: "absolute",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={new_logo_lock}
                        style={{ width: "15px", height: "15px" }}
                      />
                      <p
                        style={{
                          height: "10px",
                          textAlign: "center",
                          fontWeight: "300",
                          fontSize: "7px",
                          lineHeight: "10px",
                          fontFamily: "Spoqa Han Sans Neo",
                          letterSpacing: "0px",
                          color: "#707070",
                        }}
                      >
                        비공개
                      </p>
                    </div>
                  ) : null}

                  <div
                    style={{
                      marginTop: "18px",
                      height: "17px",
                      textAlign: "center",
                      fontWeight: "medium",
                      fontSize: "12px",
                      lineHeight: "17px",
                      fontFamily: "Spoqa Han Sans Neo",
                      letterSpacing: "0px",
                      color: "#000000",
                      backgroundColor: card.first_img
                        ? "rgba(255,255,255,0.25)"
                        : "none",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      marginTop: "66px",
                      height: "13px",
                      textAlign: "center",
                      fontWeight: "medium",
                      fontSize: "9px",
                      lineHeight: "13px",
                      fontFamily: "Spoqa Han Sans Neo",
                      letterSpacing: "0px",
                      color: card.first_img ? "#000" : "#707070",
                      backgroundColor: card.first_img
                        ? "rgba(255,255,255,0.25)"
                        : "none",
                    }}
                  >
                    {card.nick_name}
                  </div>
                  <div
                    style={{
                      marginTop: "2px",
                      height: "13px",
                      textAlign: "center",
                      fontWeight: "medium",
                      fontSize: "9px",
                      lineHeight: "13px",
                      fontFamily: "Spoqa Han Sans Neo",
                      letterSpacing: "0px",
                      color: card.first_img ? "#000" : "#707070",
                      backgroundColor: card.first_img
                        ? "rgba(255,255,255,0.35)"
                        : "none",
                    }}
                  >
                    {DateFormat(card.update_time)}
                  </div>
                </div>
              ))}

              {/*  */}
              {editor ? (
                <div className="card">
                  <div
                    onClick={() => this.createCard(step.uid)}
                    style={{
                      marginTop: step.cards.length === 0 ? "7px" : "29px",
                      width: "146px",
                      height: "146px",
                      backgroundColor: "#FFF",
                      border: "1px solid #A3A0A0",
                      position: "relative",
                      boxShadow: "8px 8px 8px #4141411A",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        margin: "auto",
                        textAlign: "center",
                        fontSize: "12px",
                      }}
                    >
                      +<br />
                      컨텐츠등록
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          ))}

          {editor ? (
            <div className="card">
              <div
                onClick={() =>
                  this.setState({
                    newstep: true,
                    more: false,
                    boardId: this.state.boardId,
                  })
                }
                style={{
                  width: "146px",
                  height: "25px",
                  backgroundColor: "#515151",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <p
                  style={{
                    width: "max-content",
                    height: "25px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    lineHeight: "25px",
                    fontFamily: "Spoqa Han Sans",
                    fontWeight: "700",
                  }}
                >
                  +단계생성
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Wrapper>
    );
  }
}

export default GridEditorMobile;
