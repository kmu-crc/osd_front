import React, { Component } from 'react'
import styled from 'styled-components'
import Cross from "components/Commons/Cross"
import { Modal } from 'semantic-ui-react'


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
        let data = this.state;
        const step = this.props.DesignDetailStep;
        console.log("STEP:", step);
        if (step == null || step.order == null) {
            data.order = 0;
        } else {
            data.order = step[step.length - 1].order + 1
        }
        this.props.newStep(data)

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
                <div style={{ width: "62px", height: "29px", lineHeight: "29px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left", marginTop: "43.5px", marginLeft: "109.5px" }}>새 단계</div>
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

export default NewStepModal;