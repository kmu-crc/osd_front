import React, { Component } from 'react';
import DesignerBoardListContainer from 'containers/Designer/DesignerBoardListContainer';

class DesignerBoardListPage extends Component {
  render() {
    return (
      <DesignerBoardListContainer
        sort={this.props.match.params.sorting ? this.props.match.params.sorting : "update"}
        cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
        cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
        history={this.props.history} />
    );
  }
}

export default DesignerBoardListPage;
