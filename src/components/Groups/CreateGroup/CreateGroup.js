import React, { Component } from 'react';
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import Loading from "components/Commons/Loading"

// css styling
const Wrapper = styled(ContentBox)`
  margin-top: -70px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`

class CreateGroup extends Component {
  state = {
    loading: false
  }

  render() {
    return (
      <div>
        <h1>새 그룹 등록</h1>
        <Wrapper>
          <form onSubmit={this.onSubmit}>

          </form>
        </Wrapper>
        {this.state.loading && <Loading />}
      </div>
    )
  }
}

export default CreateGroup
