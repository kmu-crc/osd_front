import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import EditGroupListContainer from "containers/Groups/EditGroupListContainer";
import EditDesignListContainer from "containers/Groups/EditDesignListContainer";

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

class ModifyExistListNew extends Component {
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
          <div className="boxTitle">등록된 그룹</div>
          <EditGroupListContainer id={this.props.id} sort={this.props.sort}/>
        </GroupBox>
        <DesignBox>
          <div className="boxTitle">등록된 디자인</div>
          <EditDesignListContainer id={this.props.id} sort={this.props.sort}/>
        </DesignBox>
      </TabContainer>
    );
  }
}

export default ModifyExistListNew;
