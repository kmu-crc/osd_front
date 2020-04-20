import React, { Component } from "react";
import styled from "styled-components";
import StyleGuide from "StyleGuide";
import group_bg from "source/group_bg.jpg";
import NumberFormat from "modules/NumberFormat";
import ContentBox from "components/Commons/ContentBox";
import ScrollGroupListContainer from "../../containers/ScrollGroupListContainer";

// css styling

const Wrapper = styled.div`
  width: 100%;

  & .Countgroup{
    padding: 5px 10px 5px 20px;
    font-size: 20px;
  }
`;

const Content = styled(ContentBox)`
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  color: white;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 0;
  z-index: 2;
  transform: translateY(-50%);
  h1{
    color: ${StyleGuide.color.geyScale.scale0};
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const ImgWrapper = styled.div`
  background-image: url(${group_bg});
  background-position: center 15%;
  background-size: cover;
  width: 100%;
  height: 200px;
  position: relative;
  &::after{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const MenuWrap = styled.div`
  background-color: white;
  border-top: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 1px 1px ${StyleGuide.color.geyScale.scale3};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 3;
`;

const Head = styled.div`
  padding-top: 100px;
  padding-bottom: 2rem;
  font-size: ${StyleGuide.font.size.paragraph};
`;

class GroupList extends Component {
  componentDidMount(){
    this.props.GetGroupTotalCountRequest();
  }

  render(){
    const { sort } = this.props;
    return(
      <div>
        <Content>
          <Wrapper>
              <span className="Countgroup"> 그룹 ({NumberFormat(this.props.Count)}) </span>
          </Wrapper>
        </Content>
        <Content>
          <Wrapper className="listWrap">
            <ScrollGroupListContainer sort={sort} history={this.props.history}/>}
          </Wrapper>
        </Content>
      </div>
    );
  }
}

export default GroupList;
