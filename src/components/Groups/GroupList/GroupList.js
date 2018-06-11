import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollGroupListContainer from "containers/Groups/ScrollGroupListContainer";
import ContentBox from "components/Commons/ContentBox";

// css styling

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 5rem;
  min-width: 660px;
`;

const MenuContainer = styled(Grid)`
  font-size: 13px;
  & .sorting {
    text-align: right;
  }
  & .addGroup button{
    padding: 5px 18px;
    font-size: 14px;
    border: 1px solid rgba(25,25,25,0.2);
    font-weight: 400;
    background-color: #fff;
    border-radius: 5px;
  }
  & .addGroup button:hover {
    background-color: #f2f2f2;
  }
  & .ui.default.dropdown:not(.button)>.text,
  & .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  &.ui.grid > .row {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;


class GroupList extends Component {
  state = {
    rendering: true
  }

  changeState = () => {
    this.setState({
      rendering: false
    });
    setTimeout(()=>{
      this.setState({
        rendering: true
      });
    }, 200);
  }

  // shouldComponentUpdate(){
  //   return false;
  // }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/group/${value}`);
    this.changeState();
  }

  render(){
    let userValid = this.props.valid;
    const { sort } = this.props;
    return(
      <ContentBox>
        <Wrapper>
          <MenuContainer devided="vertically" padded={true} columns={2}>
            <Grid.Row stretched={false}>
              <Grid.Column className="addGroup">
                <Link to="/createGroup"><button>새 그룹 추가 +</button></Link>
              </Grid.Column>
              <Sorting handleChange={this.sortChange} placeholder={sort}/>
            </Grid.Row>
          </MenuContainer>
          {this.state.rendering && <ScrollGroupListContainer sort={sort}/>}
        </Wrapper>
      </ContentBox>
    );
  }
}

export default GroupList;
