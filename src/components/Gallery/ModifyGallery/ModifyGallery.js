import React, { Component } from 'react';
import styled from 'styled-components';
// import Star from "components/Commons/Star";
// import NumberFormat from "modules/NumberFormat";
// import PointFormat from "modules/PointFormat";

import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
// import { geturl } from 'config';
// import { NavLink } from "react-router-dom";
import ModifyGroupInfoContainer from "containers/Groups/ModifyGroupInfoContainer/ModifyGroupInfoContainer"

const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  box-shadow: 5px 5px 10px #00000029;
  
  width: 247px;
  height: 247px;
//   height: 335px;
  background: transparent;//#FFFFFF;
  border-radius:20px;
  overflow:hidden;
  font-family: Noto Sans KR;
  cursor: pointer;
`;
const ItemPic = styled.div`
  width: 247px;
  height: 206px;
  background: transparent;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top: 8px;
  width: 100%;
  padding-left:10px;
  .title {
    font-weight: 500;
    font-size: 17px;
    text-align: left;
    line-height: 25px;
  }
  .author {
    margin-top: 8px;
    font-weight: 300;
    font-size: 12px;
    text-align: left;
    line-height: 18px;
  }
`;
const empty = { thumbnail: '', group_id: null, user_id: null, nick_name: "", title: '로딩중...', description: '로딩중...' };
class ModifyGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.onClickCard = this.onClickCard.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }
  onClickCard(event) {
    console.log(this.state.open);
    this.setState({ open: true })
  }
  handleShowModal(value) {
    this.setState({ open: false })
  }

  render() {
    // console.log(this.props.handler);
    const item = this.props.data || empty;
    return (
      <React.Fragment>
        {this.state.open ? <ModifyGroupInfoContainer handlerIsGalleryModify={this.props.handler} handleShowModal={this.handleShowModal} id={this.props.data.uid} open={this.state.open} /> : null}
        <Wrapper onClick={this.onClickCard}>
          {/* picture */}
          <ItemPic img={(item && item.thumbnail) || noimg} />
          {/* text */}
          <TextWrapper>
            <div className="title"><TextFormat txt={item.title || "...로딩중"} /></div>
          </TextWrapper>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default ModifyGallery;
