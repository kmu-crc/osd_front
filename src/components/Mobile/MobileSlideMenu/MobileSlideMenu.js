import React from "react";
import styled, { keyframes } from 'styled-components';
import NavigationContainerMobile from "containers/Nav/NavigationContainer/NavigationContainerMobile";
import { SLIDE_MENU_WIDTH } from "constant";
import cookie from 'react-cookies';
import { Back } from "components/Mobile/MobileSlideMenu";

const MobileOpenAni = keyframes`
  0% { left: ${-1 * SLIDE_MENU_WIDTH}px; }
  100% { left: 0px; }
`;
const MobileCloseAni = keyframes`
  0% { left: 0px; }
  100% { left: ${-1 * SLIDE_MENU_WIDTH}px; }
`;
const MobileNavigationAni = styled.div`
  position: fixed;
  height: 100%;
  z-index: 902;
  animation-name: ${props => props.sidemenu ? MobileOpenAni : MobileCloseAni};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;  

  .container-wrapper {
    position: absolute;
    height: 100%;
    width: 160px;
  }
`;

export default class MobileSlideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sidemenu: true, }
    };
    componentDidMount() {
        const sidemenu = cookie.load("side-menu");
        if (sidemenu === undefined) {
            cookie.save("side-menu", "true");
            this.setState({ sidemenu: true });
            this.props.setSideMenu(true);
        } else {
            this.setState({ sidemenu: sidemenu === "true" });
            this.props.setSideMenu(sidemenu === "true");
        }
    };
    onClickFoldingSideMenu = async () => {
        await this.setState({ sidemenu: this.state.sidemenu === true ? false : true });
        this.props.setSideMenu(this.state.sidemenu);
        await cookie.save("side-menu", this.state.sidemenu ? "true" : "false", { path: "/" });
    };

    render() {
        return (
            <React.Fragment>
            <Back onClick={this.onClickFoldingSideMenu} visible={this.state.sidemenu} /> 
            <MobileNavigationAni sidemenu={this.state.sidemenu} >
                <div className="container-wrapper">
                    <NavigationContainerMobile
                        sidemenu={this.state.sidemenu}
                        onClickFolding={this.onClickFoldingSideMenu}
                    />
                </div>
            </MobileNavigationAni>
            </React.Fragment>
        );
    };
};
