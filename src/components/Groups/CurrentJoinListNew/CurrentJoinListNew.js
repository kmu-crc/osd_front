import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import DesignInGroupContainer from "containers/Groups/DesignInGroupContainer";
import GroupInGroupContainer from "containers/Groups/GroupInGroupContainer";

// css styling
const TabContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
  & .ui.default.dropdown:not(.button)>.text, .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  & > p {
    text-align: center;
  }
`;

const Head = styled(Grid)`
  position: relative;
  &.ui.grid > .row {
    padding-bottom: 0;
    padding-top: 0;
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

class CurrentJoinListNew extends Component {
  componentDidMount() {
    this.props.GetGroupCountRequest(this.props.id);
  }

  componentWillUnmount() {
    this.props.DesignInGroupClear([]);
    this.props.GroupInGroupClear([]);
  }

  sortChange = (e, { value }) => {
    const url = `/groupDetail/${this.props.id}`;
    this.props.history.replace(`${url}/${value}`);
  }

  render() {
    const { sort } = this.props;
    return (
      <TabContainer>
        <Head devided="vertically" padded={true}>
          <Grid.Row>
            {/* <Grid.Column largescreen={8} computer={8} tablet={8} mobile={8}></Grid.Column> */}
            <Sorting largescreen={16} computer={16} tablet={16} mobile={16} handleClick={this.sortChange} placeholder={sort} />
          </Grid.Row>
        </Head>
        {this.props.Count.design === 0 && this.props.Count.group === 0 && <p>가입된 컨텐츠가 없습니다.</p>}
        <GroupInGroupContainer id={this.props.id} sort={this.props.sort} count={this.props.Count.group} />
        <DesignInGroupContainer id={this.props.id} sort={this.props.sort} count={this.props.Count.design} />
      </TabContainer>
    );
  }
}

export default CurrentJoinListNew;
