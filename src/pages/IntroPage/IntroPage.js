import React, { Component } from 'react';
import {Intro}  from "components/Commons/About";
import {Intro_mobile}  from "components/Commons/About_mobile";
import ClientTemplate from 'templates/ClientTemplate';

export default class IntroPage extends Component {
  render() {
    return (
      <ClientTemplate>
        {
          window.innerWidth<500?
          <Intro_mobile />
          :
          <Intro />
        }
      </ClientTemplate>
    );
  }
}
