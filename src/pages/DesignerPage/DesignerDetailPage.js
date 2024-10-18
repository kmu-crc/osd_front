import React, { Component } from "react";
import DesignerDetailContainer from "containers/Designer/DesignerDetailContainer";
import ClientTemplate from "templates/ClientTemplate";

export class DesignerDetailPage extends Component {
    render() {
        return (
            <ClientTemplate>
                <DesignerDetailContainer
                    id={this.props.match.params.id ? this.props.match.params.id : null}
                    history={this.props.history ? this.props.match.params.history : null}
                    name={this.props.match.params.name ? this.props.match.props.name : null}
                />
            </ClientTemplate>
        );
    }
}
