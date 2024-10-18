import styled from "styled-components"
import nobg from "source/hero1920.png"
import { Modal } from 'semantic-ui-react'

export const VIDEO_SIZE = 128
export const GAP = 8

export const RoomDiv = styled.div`
	position: relative;
	width: 100%;
	height: ${props => props.h}px;
	// *{border:1px solid white;}
`
export const MenuBarContainer = styled.div`
	width: 100%;
	height: 45px;
  position: relative; 
	display: flex;
  flex-direction: rows;
  justify-content: space-between;
  background-color: #707070; // transparent;
	padding: 5px 25px;
	
	z-index: 150;

  .btn {
    cursor: pointer;
    text-align: center;
		&.peer {
			position: absolute;
			right: 10%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
		&.start {
			position: absolute;
			left: 20%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
		&.stop {
			position: absolute;
			left: 30%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
		&.invite {
			position: absolute;
			left: 10%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);
		}
		&.return {
			position: absolute;
			right: 20%;
			width: max-content;
			padding: 8px 25px;
			border-radius: 36px;
			background: rgba(100,100,100, 0.75);			
		}
    &.chat {
			width: max-content;
      height: 35px;
      border-radius: 36px;
      background: rgba(244, 0, 0, 0.8);
      padding: 8px 25px;
    }
    &.share {
      width: max-content;
      height: 35px;
      border-radius: 36px;
      background: rgba(125, 125, 255, 0.5);
      padding: 8px 25px;
    }
    &.exit {
      width: 64px;
      height: 32px;
      border-radius: 32px;
      background: rgba(255, 0, 0, 1.0);
      padding: 6px 12px;
    }    
  }
  .txt {
    color: rgba(255, 255, 255, 1.0);
    width: max-content;
  }
`
export const ContentContainer = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${props => props.bg || nobg});
	background-size: contain;
	background-position: center center;
	background-repeat: no-repeat;
	z-index: 100;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	
	* {
		border: white;
	}

	.panel {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 101;
		background-color: rgba(0, 0, 0, .5);
	}

`
export const RightVerticalScroll = styled.div`
	padding: 5px 5px 5px 0px; // top, bottom, left, right
	width: 260px;
	display: ${props => props.hidden ? "none" : "flex"};

	z-index: 110;
	background-color: rgba(255,255,255, 0.5);
	flex-direction: column;
	justify-content: flex-start;

  .hand {
		cursor: grab;
	}
	overflow-x: hidden;
	overflow-y: scroll;
	:hover {
	  ::-webkit-scrollbar {
	  	width: 5px;
	  }
	}
	::-webkit-scrollbar {
    position: absolute;
		width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 112, 112, 1) !important;
	}
`
export const MiddleDynamicGrid = styled.div`
	z-index: 110;
	background-color: rgba(255,255,255, 0.5);
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
  .hand {
		cursor: grab;
	}
	.container {
		overflow-x: hidden;
		overflow-y: scroll;
		:hover {
			::-webkit-scrollbar {
				width: 5px;
			}
		}
		::-webkit-scrollbar {
			position: absolute;
			width: 3px;
		}
		::-webkit-scrollbar-thumb {
			background: rgba(255, 112, 112, 1) !important;
		}
		// height: max-content;
		padding: 10px;
		justify-items: center;
		align-items: center;
		margin: 0 auto;
		margin-bottom: 50px;
		display: grid;
		grid-template-rows: repeat(${props => props.grid.row || 1}, 252px);
		grid-template-columns: repeat(${props => props.grid.col || 1}, 252px);
		gap: 10px 10px;
	}
`
export const BigScreenContainer = styled.div`
	min-width: 750px; // ${props => props.scroll ? "max-content" : "100%"};
	width: 85%;
	height: 100%;
	min-height: ${VIDEO_SIZE}px;
	color: white;

	background-color: white;

	display: ${props => props.visible ? "block" : "none"};
	position: relative;
	// margin: auto;

	z-index: 120;

	video {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: contain;
		// object-fit: cover;
		transform: ${props => props.flip ? "scaleX(-1)" : "scaleX(1)"};
	}
`
export const PeersContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(54, 69, 79, 0.25);
	display: flex;
	flex-direction: column;

	.me {
		width: VIDEO_SIZEpx;
		height: VIDEO_SIZEpx;
		// border:1px solid white;
	}
	.peers {
		display: flex;
		flex-direction: row;
		width: 100%;
		// border:1px solid skyblue;

		.count {
			width: max-content;
			margin-left: auto;	
			margin-top: 1rem;
			margin-right: 1rem;
		}
		.v-scroll {

		}
	}
`
export const InviteModal = styled(Modal)`
  margin-top: 50px !important;
  margin-bottom: 50px !important;
	// height: 400px;
	width: 100%;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #000000;
  border: 1px solid #EFEFEF;
  border-radius: 10px;
	opacity: 1;
	padding: 25px;

  ::-webkit-scrollbar {
    position: absolute;
    width: 3.9px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(112, 112, 112, 0.45) !important;
	}
	.close-box {
		cursor: pointer;
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 500;
	}

	.search-bar{
		z-index: 499;
	}
`

// MOBILE //
export const Mobile = styled.div`
	width: ${window.innerWidth}px;
	height: ${window.innerHeight}px;

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: ${window.innerHeight}px;
		background-color: gray;	
		background: url(${prop => prop.bg});
		background-position: cetner center;
		background-size: tile;
		background-repeat: no-repeat;
		opacity: 0.5;
		z-index: 0;
	}

	* {
		opacity: 1;
		z-index: 2;
		font-family: Noto Sans KR;
	}
	.bottom {
		width: 100%;
	}
	.copyright {
		width: 100%;
		color: white;
		text-align: right;
		background-color: rgba(128, 128, 128, 1);
	}
	.top {
		width: 100%;
		background-color: rgba(0, 0, 0, 1);
		position: absolute;
	}
	.bottom {
		bottom: 0;
		position: fixed;
		width: 100%;
		background-color: transparent;
	}
	.chat {
		&.on { display: block; }
		&.off { display: none; }
		button {
			width: 25px;
			height: 25px;
			border: none;
			background-color: blue;
			outline: none;
			color: white;
			margin: 0px;
			padding: 0px;
		}
		input {
			height: 25px;
			outline: none;
			line-height: 22px;
			background-color: white;
			border: 1px solid #707070;
			width: ${window.innerWidth - 25}px;
		}
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	.button-wrapper {
		padding: 5px 15px;
		width: 100%;
	}
	.button {
		width: 25px;
		height: 25px;
		background-color: rgba(255, 30, 0, 1);
		border-radius: 100%;
		border: none;
		color: white;
		font-size: 1rem;
		&.off { 
			background-color: white; 
			color: red; 
		}
	}
	.view {
		margin-top: 0px;
		z-index: 3;
		background-color: red;
	}
`


// NEW LAYOUT //
export const DesktopWrapper = styled.div`
	width: 100%;
	// width: ${window.innerWidth}px;
	// height: ${window.innerHeight}px;
	background-color: rgba(255, 255, 255, 0.5);
`
export const TopMenuContainer = styled.div`
	width: 100%;
	// height: 10%;
	background-color: rgba(0, 0, 0, 0.6);
	ul {
		list-style: none;
	}
	.row {
		display: flex;
		flex-direction: row;	
	}
	.top-menu {
		justify-content: space-between;
		padding: 10px;
	}
	.title {
		position: absolute;
		color: white;
	}
	button {
		background: none;
		border: none;
		outline: none;
		box-shadow: none;
		background-color: rgba(255, 0, 0, 1);
		color: rgba(255, 255, 255, 1);
		width: 35px;
		height: 35px;
		&.on {
			background-color: rgba(255, 255, 255, 1);
			color: rgba(255, 0, 0, 1);
		}
		&.off {
			background-color: rgba(255, 0, 0, 1);
			color: rgba(255, 255, 255, 1);
		}
	}
`
export const ViewContainer = styled.div``
export const ButtomMenuContainer = styled.div` `