import React, { Component } from "react";
import DesignListContainer from "containers/Designs/DesignListContainer";

class DesignListPage extends Component {
  render() {
    return(
        <DesignListContainer sort={this.props.match.params.sorting? this.props.match.params.sorting : null}
                             cate1={this.props.match.params.cate1? this.props.match.params.cate1 : null}
                             cate2={this.props.match.params.cate2? this.props.match.params.cate2 : null}
                             history={this.props.history}/>
    );
  }
}

export default DesignListPage;
