import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import WaitingDesignContainer from "containers/Groups/WaitingDesignContainer";
import WaitingGroupContainer from "containers/Groups/WaitingGroupContainer";
import StyleGuide from 'StyleGuide';

// css styling
const TabContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
`;

const Head = styled(Grid)`
  &.ui.grid > .row {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  &.ui.grid > .row > .column.sorting {
    line-height: 2.5;
  }
`;

const GroupBox = styled.div`
  margin-bottom: 1rem;
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

const DesignBox = styled.div`
  & .boxTitle {
    padding-bottom: 1rem;
    font-size: ${StyleGuide.font.size.heading4};
  }
`;

class ModifyJoinListNew extends Component {
  componentWillUnmount() {
    this.props.DesignInGroupClear([]);
  }

  sortChange = (e, {value}) => {
    const url = `/groupDetail/${this.props.id}`;
    this.props.history.replace(`${url}/${value}`);
  }

  getCountGroup = (count) => {
    const html = "가입 신청중인 그룹 (" + count + ")";
    document.getElementById("joinGroup").innerHTML = html;
  }

  getCountDesign = (count) => {
    const html = "가입 신청중인 디자인 (" + count + ")";
    document.getElementById("joinDesign").innerHTML = html;
  }

  render(){
    return(
      <TabContainer>
        <GroupBox>
          <div className="boxTitle" id="joinGroup">가입 신청중인 그룹</div>
          <WaitingGroupContainer id={this.props.id} sort={this.props.sort} getCount={this.getCountGroup}/>
        </GroupBox>
        <DesignBox>
          <div className="boxTitle" id="joinDesign">가입 신청중인 디자인</div>
          <WaitingDesignContainer id={this.props.id} sort={this.props.sort} getCount={this.getCountDesign}/>
        </DesignBox>
      </TabContainer>
    );
  }
}

export default ModifyJoinListNew;
