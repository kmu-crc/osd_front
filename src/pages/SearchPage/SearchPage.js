import React, { Component } from "react";
import SearchContainer from "containers/Commons/SearchContainer";

class SearchPage extends Component {
  render() {
    console.log(this.props);
    return (
      <SearchContainer
        history={this.props.history}
        type={this.props.match.params.type ? this.props.match.params.type : null}
        sort={this.props.match.params.sort ? this.props.match.params.sort : "update"}
        keyword={this.props.match.params.keyword ? this.props.match.params.keyword : null} />
    );
  }
}

export default SearchPage;