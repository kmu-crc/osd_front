import React, { Component } from "react";
import styled from "styled-components";

const FormBox = styled.div`
    display:flex;
    align-items:center;

    margin-right: 20.5px;

    .last-child {
        margin-right: 0px;
    }

&.middle-border {
    div { 
        width: 10px; 
        height: 31px; 
        position: relative;
    }
    div:before { 
        content: '';
        position: absolute;
        border-bottom: 1px solid #707070;
        height: 100%;
        width: 100%;
        transform: translateY(-50%);
    }
}
`

const FormStyle = styled.input.attrs({ type: "date" })`
    width: 160px;
    height: 31px;
    background: #E9E9E9 0% 0% no-repeat padding-box;
    border-radius: 10px;
    outline: none;
    border: 0px;
    
    padding-left: 20px;

    line-height: 22px;
    // text-align: center;
    font: normal normal normal 15px/22px Noto Sans KR;
    letter-spacing: 0px;
    color: #000000;

    transition: color 0.1s ease, border-color 0.1s ease;
    -webkit-appearance: none;
    position: relative;
    ::-webkit-calendar-picker-indicator {
        color: rgba(0, 0, 0, 0);
        opacity: 1;
        position: absolute;
        right: 20px;
        width: 20px;
        height: 20px;
        border-width: thin;
    }
`;

export class InputCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = { startDate: null, endDate: null, dayDate: null };
        this.onChangeStartDate = this.onChangeStartDate.bind(this)
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeDayDate = this.onChangeDayDate.bind(this);
        this.onClickDayDate = this.onClickDayDate.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.startDate !== this.props.startDate) {
            this.setState({
                startDate: this.props.startDate
            })
        }
        if (prevProps.endDate !== this.props.endDate) {
            // console.log(this.props.startDate, this.props.endDate)
            if (this.props.startDate && this.props.endDate) {
                const end = this.props.endDate.split("-");
                const endDay = new Date(end[0], end[1] - 1, end[2]);

                const start = this.props.startDate.split("-");
                const startDay = new Date(start[0], start[1] - 1, start[2]);
                let timestamp = endDay - startDay;
                const oneDay = 24 * 60 * 60 * 1000;

                const dDay = Math.floor(timestamp / oneDay + 1);
                this.setState({ dayDate: dDay })
            }


            this.setState({
                endDate: this.props.endDate,
            })
        }
    }
    returnData = async e => {
        this.props.getStartDateValue && await this.props.getStartDateValue(this.state.startDate);
        this.props.getEndDateValue && await this.props.getEndDateValue(this.state.endDate);
        this.props.getDayDateValue && await this.props.getDayDateValue(this.state.dayDate);
    }
    init = async () => {
        console.log("init", this.props.startDate, this.props.endDate);
        await this.setState({ startDate: this.props.startDate || new Date().toISOString().substring(0, 10) });
        await this.setState({ endDate: this.props.endDate || new Date().toISOString().substring(0, 10) });
        await this.setState({ dayDate: this.props.dayDate || 0 });
        this.returnData();
    }
    async onChangeStartDate(event) {

        // //일수
        const end = this.state.endDate.split("-");
        const endDay = new Date(end[0], end[1] - 1, end[2]);

        const start = event.target.value.split("-");
        const startDay = new Date(start[0], start[1] - 1, start[2]);

        // console.log("onChangeStartDate:",startDay,endDay);

        let timestamp = endDay - startDay;
        const oneDay = 24 * 60 * 60 * 1000;

        const dDay = Math.floor(timestamp / oneDay + 1);
        console.log(start, end);
        if (dDay < 1) {
            await this.setState({ startDate: this.state.startDate, dayDate: this.state.dayDate });
            return;
        }
        await this.setState({ startDate: event.target.value, dayDate: Math.floor(timestamp / oneDay) });
        this.returnData();
    }
    async onChangeEndDate(event) {
        // const now = new Date();
        const end = event.target.value.split("-");
        const endDay = new Date(end[0], end[1] - 1, end[2]);

        const start = this.state.startDate.split("-");
        const startDay = new Date(start[0], start[1] - 1, start[2]);
        // console.log("onChangeEndDate:",startDay,endDay);
        let timestamp = endDay - startDay;
        const oneDay = 24 * 60 * 60 * 1000;

        const dDay = Math.floor(timestamp / oneDay);

        console.log("end:::", dDay);
        if (dDay < 1) {
            await this.setState({ endDate: this.state.endDate, dayDate: this.state.dayDate });
            return;
        }

        // //일수
        await this.setState({ endDate: event.target.value, dayDate: Math.floor(timestamp / oneDay) });
        this.returnData();
    }
    async onChangeDayDate(event) {
        if (isNaN(parseInt(event.target.value, 10))) {
            return;
        }
        const start = this.state.startDate.split("-");
        const startDay = new Date(start[0], start[1] - 1, start[2]);

        const dday = parseInt(event.target.value, 10);
        // const oneDay = 24* 60* 60* 1000;
        startDay.setDate(startDay.getDate() + dday);
        console.log(event.target.value);
        if (dday < 1) {
            return;
        }

        await this.setState({
            endDate: startDay.toISOString().substring(0, 10),
            dayDate: event.target.value
        });
        this.returnData();

    }
    onClickDayDate(event) {
        document.getElementById(event.target.id).focus();
        document.getElementById(event.target.id).select();

    }
    render() {
        return (
            <React.Fragment>
                <div style={{ display: "flex", alignItems: "center", fontSize: "17px" }}>
                    <FormBox>
                        <FormStyle
                            id="startDate"
                            placeholder={this.props.placeholder}
                            value={this.state.startDate || ""}
                            onChange={this.onChangeStartDate}
                        />
                    </FormBox>
                    <FormBox className="middle-border">
                        <div></div>
                    </FormBox>
                    <FormBox>
                        <FormStyle
                            id="endDate"
                            placeholder={this.props.placeholder}
                            value={this.state.endDate || ""}
                            onChange={this.onChangeEndDate}
                        />
                    </FormBox>
                    {/* <FormText
                    id="dateDate"
                    width={80}
                    value={this.state.dayDate || ""}
                    onChange={this.onChangeDayDate}
                    onClick={this.onClickDayDate}
                />일 */}
                </div>
            </React.Fragment>
        );
    }
}