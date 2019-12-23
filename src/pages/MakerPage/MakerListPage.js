import React, { Component } from 'react';
import MakerListContainer from 'containers/Maker/MakerListContainer';

class MakerListPage extends Component {
  render() {
    return (
      <MakerListContainer
        sort={this.props.match.params.sorting ? this.props.match.params.sorting : "update"}
        cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
        cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
        history={this.props.history} />
    );
  }
}

export default MakerListPage;
