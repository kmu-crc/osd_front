import React, { Component } from "react";
// import { Modal, Icon } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";
// import Button from "components/Commons/Button";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import MyDesignListContainer from "containers/Groups/MyDesignListContainer";
import MyGroupListContainer from "containers/Groups/MyGroupListContainer";
import Cross from "components/Commons/Cross";


const ModalContent = styled.div`
  & .icon.close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${opendesign_style.color.grayScale.scale9};
    cursor: pointer;
  }
`;

//const ModalBtn = styled(Button)``;

const JoinGroupWrap = styled.div`
  display: inline-block;
`;

const Title = styled.h2`
  padding-left:20px;
  width:100%;
  height:30px;
`;

const JoinTab = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const TabItem = styled.button`
  padding:20px;
  border: 0;
  font-size:20px;
  background-color: transparent;
  &.active {
    color: #eb3324;
  }
`;

class JoinGroup extends Component {
  state = {
    open: false,
    active: "design"
  };

  handleModal = () => {
    if (!this.props.token) {
      alert("로그인을 해주세요.");
      return;
    } else {
      this.setState({ open: true });
    }
  };

  handleCloseModal = () => {
    this.setState({ open: false, active: "design" });
    // alert(this.props.handleReload())
    // this.props.handleReload()
  };

  handleChangeTab = tab => {
    this.setState({ active: tab });
  };
  render() {
    const { open, active } = this.state;
    return (
      <JoinGroupWrap>
        <div onClick={this.handleModal}>
          가입 신청
        </div>
        <Modal
          open={open}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.handleCloseModal}
        >
          <Modal.Content>
            <ModalContent>
              <div onClick={this.handleCloseModal} style={{position:"absolute",top:"20px",right:"20px"}}>
                <Cross angle={45} color={"#707070"} weight={3} width={25} height={25} />
              </div>
              <Title>그룹 가입 신청</Title>
              <JoinTab>
                <TabItem
                  className={active === "design" && "active"}
                  style={{}}
                  onClick={() => this.handleChangeTab("design")}
                >
                  디자인
                </TabItem>
                <TabItem
                  className={active === "group" && "active"}
                  onClick={() => this.handleChangeTab("group")}
                >
                  그룹
                </TabItem>
              </JoinTab>
              {active === "design" ? (
                <MyDesignListContainer
                  handleCloseModal={this.handleCloseModal}
                />
              ) : active === "group" ? (
                <MyGroupListContainer
                  handleCloseModal={this.handleCloseModal}
                />
              ) : null}
            </ModalContent>
          </Modal.Content>
        </Modal>
      </JoinGroupWrap>
    );
  }
}

export default JoinGroup;
