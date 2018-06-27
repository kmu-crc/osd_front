import React, { Component } from "react";
import styled from "styled-components";
import { Header, Grid, Form } from "semantic-ui-react";
import ModifyDesignInfo from "components/Designs/ModifyDesignInfo";

class ModifyDesignFormContent extends Component {
  render() {
    return (
      <ModifyDesignInfo {...this.props}/>
    );
  }
}
export default ModifyDesignFormContent;
