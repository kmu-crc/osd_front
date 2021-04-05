import React, { Component } from 'react';
import RequestListContainer from 'containers/Request/RequestListContainer';

class RequestListPage extends Component {
  render() {
    return (
      <RequestListContainer
        type={this.props.match.params.type || "designer"}
        sort={this.props.match.params.sort ? this.props.match.params.sort : "update"}
        cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
        cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
        cate3={this.props.match.params.cate3 ? this.props.match.params.cate3 : null}
        keyword={this.props.match.params.keyword ? this.props.match.params.keyword : null}
        history={this.props.history}
      />
    );
  }
}

export default RequestListPage;
