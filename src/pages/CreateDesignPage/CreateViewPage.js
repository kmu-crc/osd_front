import React, { Component } from "react";
import ClientTemplate from "../../templates/ClientTemplate";
import CreateView from "../../components/CreateView";

export class CreateViewPage extends Component {
  render() {
    return(
      <ClientTemplate>
        <CreateView />
     </ClientTemplate>
    );
  }
}
