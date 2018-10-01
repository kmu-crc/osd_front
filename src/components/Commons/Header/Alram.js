import React, { Component } from "react";
import { Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";

const AlarmLabel = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  background-color: red;
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  vertical-align: middle;
  padding-top: 2px;
  transform: scale(0.6);
  -ms-transform: scale(0.6);
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
`;

const AlarmDropDown = styled.ul`
  position: absolute;
  min-height: 50px;
  max-height: 300px;
  overflow-y: scroll;
  top: 60px;
  left: 0;
  background-color: white;
  width: 300px;
  transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
`;

const AlarmItem = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid #181818;
  &:last-child {
    border-bottom: 0;
  }
`;

class Alram extends Component {
  state = {
    active: false
  }
  onAlarmHandler = e => {
    if(e.type === "blur" && !this.alram.contains(
      e.relatedTarget
    )){
      this.setState({ active: false });
    }
  }
  openAlarmHandler = e => {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <button type="button" style={{ height: "60px" }} onClick={this.openAlarmHandler} onBlur={this.onAlarmHandler} ref={ref => this.alram = ref}>
        <Icon name="alarm" />
        {this.props.noti.count > 0 && (
          <AlarmLabel>{this.props.noti.count}</AlarmLabel>
        )}
        {this.state.active && (
          <AlarmDropDown>
            {this.props.noti.count > 0 &&
              this.props.noti.list.map((item, index) => {
                return (
                  <AlarmItem key={index}>
                    {item.title}
                    님께 메시지가 도착했습니다.
                  </AlarmItem>
                );
              })}
          </AlarmDropDown>
        )}
      </button>
    );
  }
}

export default Alram;
