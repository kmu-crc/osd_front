import React, { Component } from "react";
// import { Modal, Icon } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";
// import Button from "components/Commons/Button";
import styled from "styled-components";
import opendesign_style from "opendesign_style";
import MyDesignListContainer from "containers/Groups/MyDesignListContainer";
import MyGroupListContainer from "containers/Groups/MyGroupListContainer";
import Cross from "components/Commons/Cross";
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import { Icon } from 'semantic-ui-react'

const ModalContent = styled.div`
  border:1px solid black;
  max-width:632px;
  width:100%;
  padding:22px 64px 42px 64px;
  position:relative;
  .close-box{
    width:60px;
    height:60px;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0px;
    right:0px;
  }
  .title_ {
    width:100%;
    height:52px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    cursor: default;
    font-family:Spoqa Han Sans Neo;
    font-weight:500;
    font-size:37px;
  }
  & .icon.close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${opendesign_style.color.grayScale.scale9};
    cursor: pointer;
  }
`;

//const ModalBtn = styled(Button)``;
const JoinModal = styled(Modal)`
  max-width:632px;
  width:100%;
`
const JoinGroupWrap = styled.div`
  display: inline-block;
  width:max-content;
  .header{
  }
  .font_small{width:max-content;font-size:12px;}
  .icon-wrapper{
    width:20%;
    min-width:50px;
    height:100%;  
    }
    .icon-piece{
        cursor:pointer;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width:95%;
        height:95%;
        border-radius:5px;
        background-color:#DEDEDE;
    }
`;


const JoinTab = styled.div`
  width:100%;
  display:flex;
  margin-top:14px;
  margin-bottom:67px;
  justify-content:center;
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
  font-family:Spoqa Han Sans Neo;
  font-weight:Medium;
  background-color: transparent;
  cursor:pointer;
  &.active {
    color: #1E9B79;
  }
`;

const JoinButton = styled.div`
  width:142px;
  height:41px;
  display:flex;
  font-size:20px;
  font-family:Spoqa Han Sans Neo;
  font-weight:400;
  justify-content:center;
  align-items:center;
  color:white;
  box-shadow: 8px 8px 8px #0000002B;
  cursor:pointer;

`

class JoinGroup extends Component {
  state = {
    open: false,
    active: "design"
  };

  handleModal = async () => {
    if (!this.props.token) {
      await alert("로그인 해주세요.","확인");
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
    console.log(this.props);
    const { open, active } = this.state;
    return (
      <JoinGroupWrap>
        {this.props.isIcon==null?
          <JoinButton style={{backgroundColor:"black"}} onClick={this.handleModal}>
          그룹 가입 신청
          </JoinButton>
          :
          <JoinButton style={{backgroundColor:"#1E9B79"}} onClick={this.handleModal}>
            그룹 가입
          </JoinButton>
        }
        <JoinModal
          open={open}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.handleCloseModal}
        >
          {/* <Modal.Content> */}
            <ModalContent>
              <div className="close-box" onClick={this.handleCloseModal} >
                <Cross angle={45} color={"#707070"} weight={3} width={35} height={35} />
              </div>
              <div className="title_">그룹 가입 신청</div>
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
          {/* </Modal.Content> */}
        </JoinModal>
      </JoinGroupWrap>
    );
  }
}

export default JoinGroup;
