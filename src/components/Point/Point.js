import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";

const Wrapper = styled.div`
  border: 1px dashed gray;
  width: 100%;
  font-family: Noto Sans KR;
`;
const PointContainer = styled.div`
  width: 1200px;
  margin-right: auto;
  margin-left: auto;
`;
const Title = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 36px;
  line-height: 36px;
  width: max-content;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
  &.smaller {
    font-size: 28px;
    margin-bottom: 25px;
  }
`;
const PointWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: 75px;
  margin-top: 40px;
  line-height: 20px;
  width: 500px;
 
  .text {
    margin-left: auto;
    font-size: 20px;
    font-weight: 300;
  }
  .point {
    margin-left: 50px;
    margin-right: 5px;
    font-size: 26px;
    font-weight: 500;
  }
  .unit {
    font-weight: 500;
    margin-right: 30px;
    width: 25px;
    height: 25px;
    padding: 5px;
    text-align: center;
    background-color: #6A0DAD;
    border-radius: 50%;
    color: #FFFFFF;
  }
`;
const Charge = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .flex{
    display:flex;
  }
  .item { 
    width: max-content;
    margin: 10px;
    .charge {
      cursor: default;
      width: max-content;
      padding: 35px;
      text-align: center;
      border-radius: 25px;
      background-color: orange;
      color: white;
      font-weight: 500;
    }

    .not-yet {
      background-color: gray;
    }
  }
`;
const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  .history-element {
    display: flex;
    flex-direction row;
    justify-content: space-between;
    border: 1px solid gray;
  }
`;
const FormStyle = styled.input.attrs({ type: "number" })`
    width: ${props => props.width}px;
    margin: 0;
    -webkit-appearance: none;
    padding: 0.67857143em 1em;
    height:43px;
    border-radius:20px;
    font-family:Noto Sans KR;
    font-size:20px;
    background-color:#E9E9E9;
    outline:none;
    border:0px;
    margin-right:5px;
    transition: color 0.1s ease, border-color 0.1s ease;

`;
const Button = styled.div`
  height:43px;
  width:max-content;
  padding:10px;
  background-color:#707070;
  display:flex;
  justify-content:center;
  border-radius:20px;
  align-items:center;
  .text{
    color:white;
  }
`

const Won = N => N.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

class Point extends Component {
  constructor(props){
    super(props);
    this.state = {
      point:null,
    }
    this.PointUp = this.PointUp.bind(this);
    this.PointToMoney = this.PointToMoney.bind(this);
    this.onChangePoint = this.onChangePoint.bind(this);
  }

  PointUp = (type) => {
    this.props.PointUpRequest(
      { id: this.props.userInfo.uid, token: this.props.token },
      { point: 1000, type: type }
    ).then(() => {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid, this.props.token);
    })
  };
  PointToMoney(type){
    if(this.props.Point<this.state.point){
      alert("금액이 부족합니다.");
      return;
    }
    this.props.PointUpRequest(
      { id: this.props.userInfo.uid, token: this.props.token },
      { point: this.state.point*-1, type: type }
    ).then(() => {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid, this.props.token);
    }).then(()=>{
      alert("현금 전환이 완료되었습니다!");
      this.setState({point:null});
    })
  }
  onChangePoint(event){
    this.setState({
      point:event.target.value,
    })
    
  }
  render() {
    const { Point, History, HistoryCount } = this.props;
    return (<Wrapper>
      <PointContainer>

        <Title>현금 충전</Title>
        <PointWrapper>
          <div className="text">사용가능한 금액:</div>
          <div className="point">{Won(Point || 0)}</div>
          <div className="unit">OD</div>
        </PointWrapper>

        <Title className="smaller">충전수단</Title>
        <Charge>
          <div className="item"><button onClick={() => this.PointUp("CLICK")} className="charge">클릭으로 충전!</button></div>
          <div className="item"><button onClick={() => alert("찬호가 안하고 입해했데요...")} className="charge not-yet">ㅇㅇㅇ으로 충전</button></div>
          <div className="item"><button onClick={() => alert("찬호가 안하고 입해했데요...")} className="charge not-yet">ㅇㅇㅇ으로 충전</button></div>
        </Charge>
{
        this.props.userInfo.isDesigner==1||this.props.userInfo.isMaker==1?
        <React.Fragment>
        <Title className="smaller">현금전환</Title>
        <Charge>
          <div className="item flex"><FormStyle value={this.state.point} onChange={this.onChangePoint} type="number"/>
          <Button onClick={()=>this.PointToMoney("CLICK")}><div className="text">클릭으로 전환</div></Button></div>
        </Charge>
        </React.Fragment>:null
}
        <Title className="smaller">충전내역</Title>
        <HistoryContainer>
          <div className="history-element">
            <div>변동내역</div>
            <div>날짜</div>
            <div>결제수단</div>
          </div>
          {HistoryCount ? (
            History.map(histo =>
              <div className="history-element" key={histo.uid + "history"}>
                <div>{histo.point_variation}</div>
                <div>{DateFormat(histo.create_time)}</div>
                <div>{histo.charge_type}</div>
              </div>
            )) : (<div>?????</div>)}
        </HistoryContainer>

      </PointContainer>
    </Wrapper>)
  }
}
export default Point;
