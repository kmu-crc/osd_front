import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Icon, Form } from "semantic-ui-react";
import { FormField } from "components/Commons/FormField";
import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
import SearchMemberContainer from "containers/Commons/SearchMemberContainer";
import MessageDetailContainer from "containers/Messages/MessageDetailContainer";
import SendingMsgContainer from "containers/Messages/SendingMsgContainer";

// css styling
const Container = styled(ContentBox)`
@media only screen and (max-width: 991px) and (min-width: 768px){
  & .ui.grid>.row{
    margin-left: 6.25% !important;
  }
  }
`;

const Wrapper = styled(Grid)`
  width: 100%;
  &.ui.grid {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`;

const ListContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  padding: 1rem;
  & .heading {
    font-size: ${StyleGuide.font.size.heading4};
    color: ${StyleGuide.color.gey.dark};
  }
  & .listContainer {
    padding: 1rem;
    border: ${StyleGuide.color.gey.basic};
  }
  & label {
    font-size: ${StyleGuide.font.size.heading4};
    color: ${StyleGuide.color.gey.dark};
  }
  & input {
    width: 80%;
    height: 30px;
    margin: 5px 0 10px;
  }
`;

const ContentContainer = styled(Grid.Column)`
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
`;

class MessageList extends Component {
  state = {
    member: null
  }

  componentDidMount() {
    //this.props.GetMyMsgListRequest(this.props.token);
  }

  onChangeMembers = (data) => {
    this.setState({
      member: data
    });
  }

  render(){
    const msgList = this.props.MessageList;
    return(
      <div>
        <Container>
          <Wrapper padded={false} columns={2}>
            <Grid.Row>
              <ListContainer>
                <FormField
                  label="회원 검색"
                  RenderComponent={SearchMemberContainer}
                  validates={["MinLength2"]}
                  onChangeMembers={this.onChangeMembers}
                />
                <div className="heading">내 메시지함</div>
                {msgList.length > 0 ? 
                  msgList.map(msg => (
                    <li key={msg.uid}>

                    </li>
                  ))
                :
                <div>메시지없음</div>
                }
              </ListContainer>
              <ContentContainer>
                <MessageDetailContainer/>
                <SendingMsgContainer/>
              </ContentContainer>
            </Grid.Row>
          </Wrapper>
        </Container>
      </div>
    );
  }
}

export default MessageList;
