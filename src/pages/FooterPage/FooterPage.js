import React, { Component } from "react";
import FooterTerm from "components/Commons/FooterTerm";
import FooterPrivacy from "components/Commons/FooterPrivacy";
import FooterInfo from "components/Commons/FooterInfo";

class FooterPage extends Component {
  render() {
    const page = this.props.match.params.page;
    return (
      page === "term" ? <FooterTerm />
        : page === "privacy" ? <FooterPrivacy />
          // : page === "contact" ? <FooterContact/>
          : <FooterInfo />
    );
  }
}

export default FooterPage;
