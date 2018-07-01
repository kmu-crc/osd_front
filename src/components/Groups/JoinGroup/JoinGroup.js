import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import Button from "components/Commons/Button";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import MyDesignListContainer from "containers/Groups/MyDesignListContainer";
import MyGroupListContainer from "containers/Groups/MyGroupListContainer";

const ModalContent = styled.div`
  padding: 20px;
`

const ModalBtn = styled(Button)`
  background-color: ${StyleGuide.color.main.basic};
  border: none;
  &:hover {
    background-color: ${StyleGuide.color.main.dark};
    border: none;
  }
`

const JoinGroupWrap = styled.div`
  display: inline-block;
`

const Title = styled.h2`
  margin-bottom: 2rem;
`

const JoinTab = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  &::after{
    display: block;
    content: "";
    clear: both;
  }
`

const TabItem = styled.button`
  padding: 7px 18px;
  border: 0;
  background-color: transparent;
  &.active{
    color: #EB3324;
  }
`

class JoinGroup extends Component {
  state = {
    open: false,
    active: "design"
  }

  handleModal = () => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    } else {
      this.setState({ open: true });
    }
  }

  handleCloseModal = () => {
    this.setState({ open: false, active: "design" });
  }

  handleChangeTab = (tab) => {
    this.setState({ active: tab });
  }
  render() {
    const { open, active } = this.state;
    return (
      <JoinGroupWrap>
        <ModalBtn onClick={this.handleModal}>가입 신청</ModalBtn>
        <Modal open={open}
          closeOnEscape={false}
          closeOnRootNodeClick={false}
          onClose={this.handleCloseModal}>
          <Modal.Content>
            <ModalContent>
              <Title>그룹 가입신청</Title>
              <JoinTab>
                <TabItem className={active === "design" && "active"} onClick={() => this.handleChangeTab("design")} >디자인</TabItem>
                <TabItem className={active === "group" && "active"} onClick={() => this.handleChangeTab("group")} >그룹</TabItem>
              </JoinTab>
              { active === "design"
                ? <MyDesignListContainer handleCloseModal={this.handleCloseModal}/>
                : active === "group"
                ? <MyGroupListContainer handleCloseModal={this.handleCloseModal} />
                : null }
            </ModalContent>
          </Modal.Content>
        </Modal>
      </JoinGroupWrap>
    );
  }
}

export default JoinGroup;
