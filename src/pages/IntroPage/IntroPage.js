import React, { Component } from 'react';
import { Intro } from "components/Commons/About";
import ClientTemplate from 'templates/ClientTemplate';

export default class IntroPage extends Component {
  render() {
    return (
      <ClientTemplate>
        <Intro />
      </ClientTemplate>
    );
  }
}
