import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollGroupListContainer from "containers/Groups/ScrollGroupListContainer";
import ContentBox from "components/Commons/ContentBox";
import NumberFormat from "modules/NumberFormat";

// css styling

const Wrapper = styled.div`
  width: 100%;

  & .Countgroup{
    padding: 5px 10px 5px 20px;
    font-size:${market_style.font.size.normal3};
  }
`;

const Content = styled(ContentBox)`
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
`;

const MenuContainer = styled(Grid)`

  & .addGroup{
    width: 60%;
    padding: 0px 0px 5px 0px;
    text-align: right;
  }

  & .Sorting{
    text-align: right;
  }
  & .addGroup button{
    padding: 0.75em 2em;
    font-size:${market_style.font.size.small1};
    border: 1px solid #E72327;
    background-color: #E72327;
    border-radius: 2em;
    color: white;
  }

  & .addGroup button:hover{
    background-color: #BF1D1F;
    border: 1px solid #BF1D1F;
  }

  &.ui.grid {
    padding-top: 3rem;
    padding-bottom : 1rem;
  }

`;

class GroupList extends Component {
  state = {
    rendering: true
  }

  componentDidMount(){
    this.props.GetGroupTotalCountRequest();
  }

  changeState = async () => {
    await this.setState({
      rendering: false
    });
    await this.setState({
      rendering: true
    });
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/group/${value}`);
    this.changeState();
  }

  render(){
    const { sort } = this.props;
    return(
      <div>
        <Content>
          <Wrapper>
            <MenuContainer>
              <span className="Countgroup"> 그룹 ({NumberFormat(this.props.Count)}) </span>
              <div className="addGroup">
                <Link to="/createGroup"><button>그룹 등록</button></Link>
              </div>
              <div className="Sorting">
                <Sorting handleClick={this.sortChange} placeholder={sort}/>
              </div>
            </MenuContainer>
          </Wrapper>
        </Content>
        <Content>
          <Wrapper className="listWrap">
            {/*<ScrollTopGroupListContainer/> in this verision we do not use this function FOR NOW*/}
            {this.state.rendering && <ScrollGroupListContainer sort={sort} history={this.props.history}/>}
          </Wrapper>
        </Content>
      </div>
    );
  }
}

export default GroupList;
