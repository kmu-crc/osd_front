import React, { Component } from 'react'
import { CreateCard, CreateStep, StepCard, ContentCard, TipDiv } from "./GridTools"
import styled from 'styled-components'
import arrow from "source/arrow.svg"
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'

const AsBelowArrow = styled.div`
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    width: 31px;
    height: 27px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: 0.5;
    border-left: 15.5px solid transparent;
    border-right: 15.5px solid transparent;
    border-top: 27px solid #707070
`
const CardDialog = styled(Modal)`
    width: 1530px;
    height: 889px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    opacity: 1;
`
class CardModal extends Component {
    onSubmit = () => { }
    onClose = () => { this.props.close() }
    render() {
        const card = this.props.cardDetail || { title: "사용자 메뉴얼 디자인 등록 01", userName: "진아진아진아" }
        const SideDialog = (props) => {
            return <div></div>
        }
        return (<><SideDialog direction="left" />
            <CardDialog open={this.props.open} onClose={this.onClose}>
                <div>{card.title}</div>
                <div>{card.userName}</div>
                <div>card_content</div>
                <div><hr /></div>
                <div>comment</div>
            </CardDialog>
            <SideDialog direction="right" /></>)
    }
}

const NewStepDialog = styled(Modal)`
  max-width: 849px;
  height: 295px;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 6px #FF0000;
`

class NewStepModal extends Component {
    state = {
        title: ""
    }
    onChange = (event) => {
        const target = event.target
        this.setState({ [target.name]: target.value })
    }
    onSubmit = () => {
        if (!this.state.title) {
            return;
        }
        let data = this.state
        data.order = this.props.DesignDetailStep[this.props.DesignDetailStep.length - 1].order + 1
        console.log("DDSC, data:", data, this.props.id, this.props.token)
        this.props.newStep(data)
        // .then(this.props.close())
    }
    onClose = () => {
        this.props.close()
    }
    render() {
        return (<NewStepDialog open={this.props.open} onClose={this.onClose}>
            <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "7.32px", marginLeft: "34.32px" }}>
                <Cross angle={45} color={"#FFFFFF"} weight={2} width={32.36} height={32.36} />
            </div>
            <form /*onSubmit={this.onSubmit}*/ ref={ref => (this.form = ref)}>
                <div
                    style={{ width: "62px", height: "29px", lineHeight: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left", marginTop: "43.5px", marginLeft: "109.5px" }}>새 단계</div>
                <div style={{ display: "flex", width: "575.5px", marginTop: "40px", marginLeft: "109.5px" }}>
                    <div style={{ width: "40px", height: "29px", lineHeight: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left" }}>제목</div>
                    <div style={{ width: "505.5px", height: "56px", borderRadius: "5px", marginLeft: "34px", backgroundColor: "#EFEFEF" }}>
                        <input name="title" onChange={this.onChange} style={{ width: "100%", height: "100%", paddingTop: "16px", paddingRight: "10px", paddingBottom: "16px", paddingLeft: "10px", border: "none", backgroundColor: "transparent" }} value={this.state.title || ""} />
                    </div>
                </div>
                <div style={{ display: "flex", width: "576px", marginLeft: "109.5px", marginTop: "38px" }}>
                    <div onClick={this.onSubmit} style={{ marginLeft: "auto", textAlign: "middle", color: "#FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", lineHeight: "29px", borderBottom: "1.5px solid #FF0000", cursor: "pointer" }}>생성하기</div>
                </div>
            </form>
        </NewStepDialog >)
    }
}
class GridEditor extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        card_loading: false, card: false,
        newstep: false, title: null,
        w: 1920, ws: { left: 271, top: 270, height: 1890 },
        movableRight: true, movableLeft: true
    }
    getHeight(obj) {
        console.log(`${obj.offsetHeight}px`)
        return `${obj.offsetHeight}px`
        // return `${obj && obj.offsetHeight}px`
    }
    createNewCard(row, col) {
        alert(`(${row},${col}) 0 4 ing...?!"`)
    }
    takeOutCard(row, col, data) {
        if (data === null) {
            alert("새로운 카드를 만듭니다. ")
            this.createNewCard(row, col)
            return;
        }
        // request card detail
        // this.props.GetDesignCardDetailRequest
        this.setState({ title: data.title, card: true })
    }
    componentDidMount() {
        window.addEventListener("resize", () => { this.setState({ w: window.innerWidth }) }, true)
        if (this.item) {
            this.setState({ ws: { top: this.item.offsetTop, left: this.item.offsetWidth, width: 178, height: this.item.height } })
            console.log(this.state.ws, "ws")
        }
    }
    CloseNewStep = () => {
        this.setState({ newstep: false })
    }
    OpenNewStep = () => {
        this.setState({ newstep: true })
    }
    NewStep = (data) => {
        this.props.CreateDesignBoardRequest(data, this.props.design.uid, this.props.token)
            .then(this.props.GetDesignBoardRequest(this.props.design.uid))
            .then(this.props.UpdateDesignTime(this.props.design.uid, this.props.token))
            .then(this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token))
        this.CloseNewStep()
    }
    NewItem = (data) => {

    }
    render() {
        const { DesignDetailStep } = this.props
        const { w, ws, card, newstep } = this.state
        // temp code //
        // const items = DesignDetailStep.map(step => { return step.cards.length })
        // const maxItems = Math.max.apply(Math, items.map(tem => { return tem }))
        const itemlist = ['BOX1', 'BOX2', 'BOX3']//, 'BOX4', 'BOX5', 'BOX6', 'BOX7', 'BOX8', 'BOX9', 'BOX10']
        // console.log(DesignDetailStep && DesignDetailStep.map(step => { return step.title }), "!")
        console.log(this.props.design, DesignDetailStep)
        return (<>
            {/* card modal component */}
            {card && <CardModal open={card} close={() => this.setState({ card: false })} title={this.state.title || "로딩중"} card={this.props.cardDetail} />}
            {newstep && <NewStepModal {...this.props} open={newstep} newStep={this.NewStep} close={this.CloseNewStep} />}

            {/* grid editor component */}
            <div style={{ display: "flex", marginBottom: "150px" }}>
                {/* 왼쪽 */}
                <div style={{ display: "flex" }}>
                    <div style={{ marginTop: "290px" }}>
                        {itemlist && itemlist.map(item => {
                            return <StepCard key={item} marginBottom={190} title={item} />
                        })}
                        <CreateStep onClick={this.OpenNewStep} step={"단계"} />
                    </div>
                </div>
                {/* 오른쪽 */}
                <div style={{ width: `${window.innerWidth}px`, paddingLeft: "73.5px" }}>
                    {/* 상 */}
                    <div style={{ display: "flex", marginTop: "90px" }}>
                        {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                            return <div key={step_index + step.title} style={{ marginRight: "74px" }}>
                                <StepCard title={step.title} />
                                <AsBelowArrow marginTop={25} marginRight={0} marginBottom={0} marginLeft={85} />
                            </div>
                        })}
                        <CreateStep onClick={this.OpenNewStep} step={"단계"} />
                    </div>
                    {/* 하 */}
                    <div style={{ overflow: "hidden" }}>
                        {itemlist && itemlist.map((item, item_index) => {
                            return <div key={item_index} style={{ width: "10000px", marginTop: "70.5px", display: "flex" }}>
                                {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                                    return (step.cards.length > item_index)
                                        ? <ContentCard key={item + item_index + step_index} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => this.takeOutCard(item_index, step_index, step.cards[item_index])} title={step.cards[item_index].title} />
                                        : <ContentCard key={item + item_index + step_index} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => this.takeOutCard(item_index, step_index, null)} title={""} />
                                })}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>)
    }
}

export default GridEditor
