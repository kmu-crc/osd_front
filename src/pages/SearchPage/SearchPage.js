import React, { Component } from "react";
import SearchContainer from "containers/Commons/SearchContainer";
import ClientTemplate from "templates/ClientTemplate"

class SearchPage extends Component {
  render() {
    // console.log(this.props.match.params.type, this.props.match.params.sort, this.props.match.params.keyword);
    return (
      <ClientTemplate>
        <SearchContainer
          history={this.props.history}
          // type={this.props.match.params.type ? this.props.match.params.type : null}
          sort={this.props.match.params.sort ? this.props.match.params.sort : null}
          keyword={this.props.match.params.keyword ? this.props.match.params.keyword : null} />
      </ClientTemplate>
    );
  }
}

export default SearchPage;