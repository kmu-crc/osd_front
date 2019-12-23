import React, { Component } from 'react';
import UserDetailFormContainer from "containers/Registration/UserDetailFormContainer";
import styled from "styled-components";

const PageContent = styled.div`
  width: 100%;
  padding: 20px 0;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

const FormCard = styled.div`
  width: 1000px;
  padding: 50px 20px;
  background-color: #fff;
`;

class InserUserDetailPage extends Component {
  render() {
    return (
      <PageContent>
        <FormCard>
          <UserDetailFormContainer history={this.props.history} />
        </FormCard>
      </PageContent>
    );
  }
}

export default InserUserDetailPage;
