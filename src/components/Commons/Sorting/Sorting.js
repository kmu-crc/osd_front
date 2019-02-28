import React, { Component } from "react";
import { Grid, Dropdown, Button } from "semantic-ui-react";
import styled from "styled-components";

const SortingButton=styled.div`
  & .ui.button{
    width: 80px;
    height: 32px;
    box-sizing: border-box;
    border: 1px solid #E72327;
    font-size: 11px;
    color: #444444;
    border-radius: 5px 5px 5px 5px;
    background-color: #fff;
    margin-left: 15px;
  }

  & .ui.button:hover{
    background-color: #E72327;
    color: white;
  }


  & .ui.button.btn-on{
    background-color: #E72327;
    color: white;
  }

`

class Sorting extends Component {
  render() {
    return (
      <Grid.Column
        className="sorting"
        widescreen={this.props.widescreen ? this.props.widescreen : null}
        largeScreen={this.props.largeScreen ? this.props.largeScreen : null}
        computer={this.props.computer ? this.props.computer : null}
        tablet={this.props.tablet ? this.props.tablet : null}
        mobile={this.props.mobile ? this.props.mobile : null}
        textAlign={this.props.textAlign ? this.props.textAlign : "right"}
      >
        <SortingButton>
          <Button
            key={"update"}
            value={"update"}
            text={"최신순"}
            onClick={this.props.handleClick}
            placeholder="update"
            className={this.props.placeholder===null?"btn-on":this.props.placeholder==="update"?"btn-on":null}
          >최신순</Button>
          <Button
            key={"create"}
            value={"create"}
            text={"등록순"}
            onClick={this.props.handleClick}
            className={this.props.placeholder==="create"?"btn-on":null}
          >등록순</Button>
          <Button
            key={"like"}
            value={"like"}
            text={"인기순"}
            onClick={this.props.handleClick}
            className={this.props.placeholder==="like"?"btn-on":null}
          >인기순</Button>
        </SortingButton>
      </Grid.Column>
    );
  }
}

export default Sorting;
