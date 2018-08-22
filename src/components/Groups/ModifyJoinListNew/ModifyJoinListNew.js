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
  padding-top: 1rem;
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
  }
`;

const DesignBox = styled.div`
  & .boxTitle {
    padding-bottom: 1rem;
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

  render(){
    return(
      <TabContainer>
        <GroupBox>
          <div className="boxTitle">가입 신청한 그룹</div>
          <WaitingGroupContainer id={this.props.id} sort={this.props.sort}/>
        </GroupBox>
        <DesignBox>
          <div className="boxTitle">가입 신청한 디자인</div>
          <WaitingDesignContainer id={this.props.id} sort={this.props.sort}/>
        </DesignBox>
      </TabContainer>
    );
  }
}

export default ModifyJoinListNew;
