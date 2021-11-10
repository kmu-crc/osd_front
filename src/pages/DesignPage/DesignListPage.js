import React, { Component } from "react";
import DesignListContainer from "containers/Designs/DesignListContainer";
import DesignListContainer_mobile from "containers/Designs/DesignListContainer_mobile";
import ClientTemplate from "templates/ClientTemplate";

class DesignListPage extends Component {
  render() {
    return (
      <ClientTemplate>
        {
          window.innerWidth<500?
          <DesignListContainer_mobile
          sort={this.props.match.params.sorting ? this.props.match.params.sorting : null}
          cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
          cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
          cate3={this.props.match.params.cate3 ? this.props.match.params.cate3 : null}
          history={this.props.history} />
          :
          <DesignListContainer
          sort={this.props.match.params.sorting ? this.props.match.params.sorting : null}
          cate1={this.props.match.params.cate1 ? this.props.match.params.cate1 : null}
          cate2={this.props.match.params.cate2 ? this.props.match.params.cate2 : null}
          cate3={this.props.match.params.cate3 ? this.props.match.params.cate3 : null}
          history={this.props.history} />
        }

      </ClientTemplate>
    );
  }
}

export default DesignListPage;
