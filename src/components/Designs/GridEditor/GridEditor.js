import React, { Component } from "react";
import { CreateStep } from "./GridTools";
import styled from "styled-components";
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import NewCardModal from "./NewCardModal";
import { ReactHeight } from "react-height";
import arrow from "source/arrow.svg";
import SortableDesignSteps from "./SortableDesignSteps";
import osdcss from "opendesign_style";
import { CATEGORY1_SOFTWARE, CATEGORY1_PRODUCT } from "constant";

const LeftWhitePane = styled.div`
  position: absolute;
  z-index: 899;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
  background: transparent
    linear-gradient(
      -90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.5) 100%
    );
  backgroundrepeat: no-repeat;
  // @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px)
  // and (max-width : ${osdcss.resolutions.MediumMinWidth}px) {
  //     background: transparent linear-gradient(-90deg, rgba(255,255,255, 0) 20%,rgba(255,255,255, 1) 70%);
  // }
`;
const RightWhitePane = styled.div`
  position: absolute;
  z-index: 899;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
  background: transparent
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.5) 100%
    );
  backgroundrepeat: no-repeat;
  // @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px)
  // and (max-width : ${osdcss.resolutions.MediumMinWidth}px) {
  //     background: transparent linear-gradient(90deg, rgba(255,255,255, 0) 20%, rgba(255,255,255, 1) 70%);
  // }
`;
const Arrow = styled.div`
  width: 17px;
  height: 48px;
  position: absolute;
  top: ${(props) => props.gap + 105}px;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
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
  cursor: pointer;
  @media only screen and (min-width: ${osdcss.resolutions
      .MediumMinWidth}px) and (max-width: ${1024}px) {
    top: ${(props) => props.gap}px;
  }
  @media only screen and (min-width: ${osdcss.resolutions
      .SmallMinWidth}px) and (max-width: ${osdcss.resolutions
      .MediumMinWidth}px) {
    top: 110px;
    // top: ${(props) => props.gap}px;
  }
`;
const GridEditorWrapper = styled.div`
  max-width: 1740px;
  width: 100%;
  display: flex;
  margin-left: 38px;
  margin-bottom: 75px;
  // width: ${window.innerWidth < osdcss.resolutions.LargeMaxWidth
    ? window.innerWidth
    : osdcss.resolutions.LargeMaxWidth};
  .Editor {
    padding-right: 250px;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    margin-top: 30px;
  }
  @media only screen and (min-width: ${osdcss.resolutions
      .SmallMinWidth}px) and (max-width: ${osdcss.resolutions
      .MediumMinWidth}px) {
    margin-left: 60px;
  }
`;

class GridEditor extends Component {
  constructor(props) {
    super(props);
    this.temp = React.createRef();
    this.grid = React.createRef();
    this.state = {
      h: 0,
      w:
        window.innerWidth < osdcss.resolutions.LargeMaxWidth
          ? window.innerWidth
          : osdcss.resolutions.LargeMaxWidth,
      left: false,
      right: false,
      card_loading: false,
      card: false,
      newcard: false,
      row: null,
      col: null,
      boardId: null,
      newstep: false,
      editstep: false,
      cardDetail: null,
      title: null,
      where: null,
      tmp: null,
      gap: null,
      wire: false,
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
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, true);
    window.removeEventListener("scroll", this.handleScroll, true);
  }
  componentDidMount() {
    console.log("grid-editor:", this.grid);
    window.addEventListener("resize", this.handleResize, true);
    window.addEventListener("scroll", this.handleScroll, true);

    if (
      this.temp.current.scrollWidth - this.temp.current.scrollLeft >=
      this.state.w
    ) {
      this.setState({ right: true });
    }

    if (this.temp.current.scrollLeft > 0) {
      this.setState({ left: true });
    }

    if (this.temp.current.scrollLeft === 0) {
      this.setState({ left: false });
    }

    if (
      this.temp.current.scrollWidth - this.temp.current.scrollLeft <=
      this.state.w
    ) {
      this.setState({ right: false });
    }
    // if (this.grid) {
    // console.log('grid-editor:', 'init');
    // this.grid.current.addEventListener("scroll", this.handleScroll, true);
    // }
    // else
  }
  handleScroll(event) {
    if (this.grid && event.target.scrollTop !== 0) {
      this.setState({ gap: event.target.scrollTop });
    }
  }
  handleResize() {
    this.setState({
      w:
        window.innerWidth < osdcss.resolutions.LargeMaxWidth
          ? window.innerWidth
          : osdcss.resolutions.LargeMaxWidth,
    });
    if (this.temp) {
      if (
        this.temp.current.scrollWidth - this.temp.current.scrollLeft <
        this.state.w
      ) {
        this.setState({ right: false });
      } else {
        this.setState({ right: true });
      }
      if (this.temp.current.scrollLeft > 0) {
        this.setState({ left: true });
      }
    }
  }
  createNewCard(row, boardId) {
    this.setState({ row: row, boardId: boardId, newcard: true });
  }
  openCard = (card, row, boardId) => {
    this.setState({
      cardDetail: card,
      title: card.title,
      row: row,
      boardId: boardId,
      card: true,
    });
  };
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
  async RemoveStep(data) {
    await this.props
      .DeleteDesignBoardRequest(this.props.design.uid, data, this.props.token)
      .then(() => {
        this.props.UpdateDesignTime(this.props.design.uid, this.props.token);
      })
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.design.uid);
        // console.log("1", this.props.DesignDetailStep)
      })
      .then(() => {
        this.props.GetDesignDetailRequest(
          this.props.design.uid,
          this.props.token
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async EditStep(data) {
    await this.props
      .UpdateDesignBoardRequest(data.where, this.props.token, {
        title: data.title,
      })
      .then(() => {
        this.props.UpdateDesignTime(this.props.design.uid, this.props.token);
      })
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.design.uid);
        // console.log("2", this.props.DesignDetailStep)
      })
      .then(() => {
        this.props.GetDesignDetailRequest(
          this.props.design.uid,
          this.props.token
        );
      })
      .catch((err) => {
        console.error(err);
      });
    this.CloseEditStep();
  }
  async NewStep(data) {
    await this.props
      .CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
      .then(() => {
        this.props.UpdateDesignTime(this.props.design.uid, this.props.token);
      })
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.design.uid);
        // console.log("3", this.props.DesignDetailStep)
      })
      .then(() => {
        this.props.GetDesignDetailRequest(
          this.props.design.uid,
          this.props.token
        );
      })
      .catch((err) => {
        console.error(err);
      });
    this.CloseNewStep();
  }
  ScrollLeft() {
    if (this.temp) {
      this.temp.current.scrollLeft -= 275;

      if (
        this.temp.current.scrollWidth - this.temp.current.scrollLeft >=
        this.state.w
      ) {
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

      if (
        this.temp.current.scrollWidth - this.temp.current.scrollLeft <=
        this.state.w
      ) {
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
      if (element.order !== index)
        jobs.push({ uid: element.uid, neworder: index });
    });
    if (jobs.length === 0) return;
    promiseAry = jobs.map((job) =>
      this.props.UpdateCardTitleRequest(
        { order: job.neworder },
        this.props.token,
        job.uid
      )
    );
    await Promise.all(promiseAry)
      .then(() => this.props.GetDesignBoardRequest(this.props.design.uid))
      .then(() =>
        this.props.GetDesignCardRequest(
          this.props.design.uid,
          this.state.boardId
        )
      );
  }
  async requestReorder(items) {
    const jobs = [];
    let promiseAry = [];
    items.forEach((element, index) => {
      if (element.order !== index) {
        jobs.push({ uid: element.uid, neworder: index });
      }
    });
    if (jobs.length === 0) return;
    promiseAry = jobs.map((job) =>
      this.props.UpdateDesignBoardRequest(job.uid, this.props.token, {
        order: job.neworder,
      })
    );
    await Promise.all(promiseAry).then(() =>
      this.props.GetDesignBoardRequest(this.props.design.uid)
    );
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.DesignDetailStep !== nextProps.DesignDetailStep) {
      if (nextProps.DesignDetailStep.length) {
        if (nextProps.DesignDetailStep.length * 275 > this.state.w) {
          this.setState({ right: true });
        }
      }
    }
    // if (nextProps.DesignDetailStepCard && nextProps.DesignDetailStepCard.uid !== null && this.props.DesignDetailStepCard !== nextProps.DesignDetailStepCard) {
    //     // console.log(nextProps.DesignDetailStepCard.uid, "i got it", nextProps.DesignDetailStepCard, this.props.DesignDetailStepCard, typeof this.props.DesignDetailStepCard);
    //     this.setState({ cardDetail: nextProps.DesignDetailStepCard });
    // }
    return true;
  }

  // componentDidUpdate(prevProps) {
  // const { design } = this.props;
  // const { design: prev } = prevProps;
  // if (wiredraw === false && design.wires) {
  // console.log("wire: :(");
  // this.setState({ wire: true });
  // wiredraw = true;
  // }
  // }

  render() {
    const { editor, design, DesignDetailStep, userInfo } = this.props;
    const {
      //   wire,
      gap,
      h,
      left,
      right,
      boardId,
      card,
      newcard,
      newstep,
      editstep,
      cardDetail,
      title,
      where,
    } = this.state;
    //console.log("items - ", DesignDetailStep);
    // console.log(design);

    return (
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* {wire ? <Wiring gap={gap} wires={design && design.wires} /> : null} */}

        {
          design.uid ? (
            <React.Fragment>
              {left ? (
                <LeftWhitePane
                  width={138}
                  height={h}
                  background="transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%)"
                >
                  <Arrow
                    angle="0deg"
                    gap={gap}
                    left={50}
                    onClick={this.ScrollLeft}
                  />
                </LeftWhitePane>
              ) : null}

              {right ? (
                <RightWhitePane
                  width={138}
                  height={h}
                  right={0}
                  background="transparent linear-gradient(-90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)"
                >
                  <Arrow
                    angle="180deg"
                    gap={gap}
                    right={50}
                    onClick={this.ScrollRight}
                  />
                </RightWhitePane>
              ) : null}

              {editor && newcard ? (
                <NewCardModal
                  isTeam={editor}
                  boardId={boardId}
                  designId={this.props.design.uid}
                  is_problem={this.props.design.is_problem}
                  is_github={
                    this.props.design.category_level1 === CATEGORY1_SOFTWARE ||
                    this.props.design.category_level1 === CATEGORY1_PRODUCT
                  }
                  open={newcard}
                  close={() => this.setState({ newcard: false })}
                />
              ) : null}

              {card ? (
                <CardModal
                  isTeam={editor}
                  edit={userInfo && userInfo.uid === cardDetail.user_id}
                  open={card}
                  close={async () => {
                    await this.setState({ card: false });
                  }}
                  title={title}
                  boardId={boardId}
                  // open={(card_id) => {
                  //     // console.log(id)
                  //     // this.openCard(card, row, boardId);
                  //     console.log(card_id, boardId, card, this.props, this.state);
                  // }}
                  // wires={this.props.design.wires}
                  designId={this.props.design.uid}
                  card={cardDetail}
                />
              ) : null}

              {editor && (
                <NewStepModal
                  {...this.props}
                  open={newstep}
                  newStep={this.NewStep}
                  close={this.CloseNewStep}
                />
              )}

              {editor && (
                <EditStepModal
                  open={editstep}
                  title={title}
                  where={where}
                  steps={DesignDetailStep}
                  RemoveStep={this.RemoveStep}
                  EditStep={this.EditStep}
                  close={this.CloseEditStep}
                />
              )}

              <ReactHeight
                onHeightReady={(height) => {
                  this.setState({ h: height });
                }}
              >
                <GridEditorWrapper
                  onScroll={() => console.log("grid-editor: scroll")}
                  ref={this.grid}
                >
                  <div
                    style={{ width: "100%" }}
                    className="Editor"
                    ref={this.temp}
                  >
                    {/* ------------단계 ------------*/}
                    {DesignDetailStep && DesignDetailStep.length > 0 && (
                      <SortableDesignSteps
                        editStep={this.OpenEditStep}
                        design_id={this.props.design.uid}
                        editor={editor ? true : false}
                        items={DesignDetailStep}
                        cardReorder={this.requestCardReorder}
                        createCard={this.createNewCard}
                        openCard={this.openCard}
                        reorder={this.requestReorder}
                        userInfo={userInfo}
                      />
                    )}
                    {editor && (
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        <CreateStep onClick={this.OpenNewStep} step={"단계"} />
                        <div style={{ width: "300px" }}>&nbsp;</div>
                      </div>
                    )}
                  </div>
                </GridEditorWrapper>
              </ReactHeight>
            </React.Fragment>
          ) : null //<div>디자인정보를 가져오고 있습니다.</div>
        }
      </div>
    );
  }
}

export default GridEditor;
