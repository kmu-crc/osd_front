import React, { Component } from 'react'
import { CreateCard, CreateStep, StepCard, ContentCard, TipDiv } from "./GridTools"
import styled from 'styled-components'
import arrow from "source/arrow.svg"
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'
import CardSourceDetailContainer from 'containers/Designs/CardSourceDetailContainer';

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
    min-width: 1530px;
    height: 889px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    opacity: 1;
`

class CardModal extends Component {
    state = { sroll: false }
    onSubmit = () => { }
    onClose = () => { this.props.close() }
    render() {
        console.log(this.props.row, this.props.maxRow)
        const card = this.props.cardDetail || { title: "사용자 메뉴얼 디자인 등록 01", userName: "진아진아진아" }
        const movablePrev = this.props.row > 0
        const movableNext = this.props.row < this.props.maxRow - 1
        console.log(movableNext, movablePrev)
        return (
            <CardDialog open={this.props.open} onClose={this.onClose}>
                <div onClick={this.onClose} style={{ position: "absolute", left: "100%", marginTop: "-32.07px", marginLeft: "111.85px" }}>
                    <Cross angle={45} color={"#707070"} weight={3} width={22.33} height={22.33} />
                </div>
                {movablePrev && <div style={{ width: "115px", height: "813.28px", position: "absolute", left: "0%", marginLeft: "-195px", marginTop: "75.7px", borderRadius: "0px 10px 10px 0px", backgroundColor: "#FFFFFF" }} />}
                {movablePrev && <div style={{ position: "absolute", left: "0%", marginTop: "409.81px", marginLeft: "-47px", width: "14px", height: "47px", backgroundImage: `url(${arrow})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                {movableNext && <div style={{ width: "115px", height: "813.28px", position: "absolute", left: "100%", marginLeft: "80px", marginTop: "75.7px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#FFFFFF" }} />}
                {movableNext && <div style={{ position: "absolute", left: "100%", marginTop: "409.81px", marginLeft: "33px", width: "14px", height: "47px", backgroundImage: `url(${arrow})`, WebkitTransform: "rotate(180deg)", transform: "rotate(180deg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>}
                <div style={{ width: "1000px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "29.78px" }}>{card.title}</div>
                <div style={{ width: "200px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "300", lineHeight: "29px", marginLeft: "52px", marginTop: "30px" }}>{card.userName}</div>
                <div onMouseOut={() => { this.setState({ scroll: false }) }} onMouseOver={() => { this.setState({ scroll: true }) }} style={{ width: "100%", overflowY: this.state.scroll ? "scroll" : "hidden", overflowX: "hidden" }}>
                    {/* <CardSourceDetailContainer /> */}
                    <div style={{ width: "1492px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "30.5px", paddingRight: "25px" }}><div style={{ borderBottom: "1px solid #707070", width: "1400px" }} /></div>
                    <div style={{ width: "100px", height: "29px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", fontWeight: "500", lineHeight: "29px", marginLeft: "52px", marginTop: "43.5px" }}>comment</div>
                </div>
            </CardDialog>)
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
        card_loading: false, card: false, row: null, col: null,
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
    takeOutCard(row, col, data, maxRow) {
        console.log("DEBUG", maxRow, row, col)
        this.setState({ title: data.title, row: row, col: col, maxRow: maxRow, card: true })
        if (data === null) {
            alert("새로운 카드를 만듭니다. ")
            this.createNewCard(row, col)
            return;
        }
        // request card detail
        // this.props.GetDesignCardDetailRequest
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
            .then(() => { this.props.UpdateDesignTime(this.props.design.uid, this.props.token) })
            .then(() => { this.props.GetDesignBoardRequest(this.props.design.uid) })
            .then(() => { this.props.GetDesignDetailRequest(this.props.design.uid, this.props.token) })
        this.CloseNewStep()
    }
    NewItem = (data) => { }
    render() {
        const { editor, DesignDetailStep } = this.props
        const { w, ws, row, col, maxRow, card, newstep } = this.state
        // temp code //
        // const items = DesignDetailStep.map(step => { return step.cards.length })
        // const maxItems = Math.max.apply(Math, items.map(tem => { return tem }))
        const itemlist = ['BOX1', 'BOX2', 'BOX3']//, 'BOX4', 'BOX5', 'BOX6', 'BOX7', 'BOX8', 'BOX9', 'BOX10']
        // console.log(DesignDetailStep && DesignDetailStep.map(step => { return step.title }), "!")
        console.log("DDSC / GE /> ", this.props.design, DesignDetailStep, editor)
        return (<>
            {/* ------------- card modal component */}
            {card && <CardModal open={card} close={() => this.setState({ card: false })} title={this.state.title || "로딩중"} card={this.props.cardDetail} col={col} row={row} maxRow={maxRow} />}
            {editor && newstep && <NewStepModal {...this.props} open={newstep} newStep={this.NewStep} close={this.CloseNewStep} />}

            {/* ------------- grid editor component */}
            <div style={{ display: "flex", marginBottom: "150px" }}>
                {/* 왼쪽 */}
                <div style={{ display: "flex" }}>
                    <div style={{ marginTop: "290px" }}>
                        {itemlist && itemlist.map(item => {
                            return <StepCard key={item} marginBottom={190} title={item} />
                        })}
                        {editor && <CreateStep onClick={this.OpenNewStep} step={"단계"} />}
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
                        {editor && <CreateStep onClick={this.OpenNewStep} step={"단계"} />}
                    </div>
                    {/* 하 */}
                    <div style={{ overflow: "hidden" }}>
                        {itemlist && itemlist.map((item, item_index) => {
                            return <div key={item_index} style={{ width: "10000px", marginTop: "70.5px", display: "flex" }}>
                                {DesignDetailStep && DesignDetailStep.map((step, step_index) => {
                                    return (step.cards.length > item_index)
                                        ? <ContentCard key={item + item_index + step_index} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => this.takeOutCard(item_index, step_index, step.cards[item_index], step.cards.length)} title={step.cards[item_index].title} />
                                        : editor
                                            ? <CreateCard key={item + item_index + step_index} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => editor && this.takeOutCard(item_index, step_index, null, step.cards.length)} title={""} />
                                            : <ContentCard key={item + item_index + step_index} step={"카드 "} marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} onClick={() => editor && this.takeOutCard(item_index, step_index, null, step.cards.length)} title={""} />
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
