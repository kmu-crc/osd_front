import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import { CardImageUpdate, CardSourcUpdate } from "components/Designs/DesignBoardCard";

const InfoWrapper = styled.div`
  background-color: white;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  border-top-left-radius: 0;
  width: 100%;
  padding: 70px;
  margin-bottom: 30px;
  @media only screen and (min-width: 1200px) {
    padding: 70px 100px 70px 100px;
  }
`;

class ModifyDesignFile extends Component {
  state = {
    open: false,
    active: "INIT"
  };

  componentDidMount() {
    this.props.GetDesignDetailViewRequest(this.props.match.params.id);
  }

  changeActive = async value => {
    this.setState({ 
      active: value 
    });
    this.props.GetDesignDetailViewRequest(this.props.match.params.id);
  };

  render() {
    const view = this.props.DesignDetailView;
    
    return (
      <InfoWrapper>
        {view.length === 0 ?
        <div></div>
        :
        <div>
          <CardImageUpdate
            uid={view.uid}
            token={this.props.token}
            images={view.images}
            request={this.props.UpdateCardImagesRequest}
            active={this.state.active}
            changeActive={this.changeActive}
            isTeam={1}
          />
          <CardSourcUpdate
            uid={view.uid}
            token={this.props.token}
            sourcesLink={view.sources}
            request={this.props.UpdateCardSourcesRequest}
            active={this.state.active}
            changeActive={this.changeActive}
            isTeam={1}
          />
        </div>
        }
        </InfoWrapper>
    );
  }
}
export default ModifyDesignFile;
