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
import market_style from "market_style";


const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  box-shadow: 3px 3px 5px #4141411A;
  border:1px solid #eaeaea;
  width: 294px;
  height: 300px;
  background: transparent;
  border-radius:20px;
  overflow:hidden;
  font-family: Noto Sans KR;
  cursor: pointer;
  padding:20px 14px 10px 14px;
`;
const ItemPic = styled.div`
  width: 100%;
  height: 236px;
  background: transparent;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  .title {
    font-weight: 500;
    font-size:${market_style.font.size.small1};
    text-align: left;
  }
  .author {
    margin-top: 8px;
    font-weight: 300;
    font-size:${market_style.font.size.small1};
    text-align: left;
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
