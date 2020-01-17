import React, { Component } from 'react';
import RequestListContainer from 'containers/Request/RequestListContainer';

class RequestListPage extends Component {
  render() {
    return (
      <RequestListContainer
        sort={this.props.match.params.sorting ? this.props.match.params.sorting : "update"}
        cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
        cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
        history={this.props.history} />
    );
  }
}

export default RequestListPage;
