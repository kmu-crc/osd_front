import React, { Component } from "react";
import ModifyMakerContainer from 'containers/Maker/ModifyMakerContainer/ModifyMakerContainer'
class ModifyMakerPage extends Component {
  render() {
    return(
       <React.Fragment>
         <ModifyMakerContainer id={this.props.match.params.id ? this.props.match.params.id : null}/>
       </React.Fragment>
    );
  }
}

export default ModifyMakerPage;
