import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as appPropTypes from './appPropTypes';
import * as stateActions from '../redux/stateActions';
// import { Appear } from './transitions';

// > .notification {
// 	pointer-events: auto;
// 	margin-top: 4px;
// 	border-radius: 4px;
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: flex-start;
// 	align-items: center;
// 	+desktop() {
// 		min-width: 75%;
// 	}
// 	+mobile() {
// 		width: 100%;
// 	}
// 	&.Appear-appear {
// 		visibility: hidden;
// 		opacity: 0;
// 		transition: all 0.15s ease-in-out 0s, visibility 0s linear 0.25s;
// 		transform: translateX(200px);
// 	}
// 	&.Appear-appear.Appear-appear-active {
// 		visibility: visible;
// 		pointer-events: auto;
// 		opacity: 1;
// 		transform: translateY(0%);
// 		transition-delay: 0s, 0s;
// 	}
// 	+desktop() {
// 		padding: 16px 24px 16px 12px;
// 	}
// 	+mobile() {
// 		padding: 6px 16px 6px 12px;
// 	}
// 	> .icon {
// 		flex: 0 0 auto;
// 		height: 24px;
// 		width: 24px;
// 		margin-right: 12px;
// 		background-position: center;
// 		background-size: 100%;
// 		background-repeat: no-repeat;
// 	}
// 	> .body {
// 		> .title {
// 			font-weight: 500;
// 			user-select: none;
// 			cursor: default;
// 			line-height: 1.35em;
// 			margin-bottom: 10px;
// 			+desktop() {
// 				font-size: 14px;
// 			}
// 			+mobile() {
// 				font-size: 12px;
// 			}
// 		}
// 		> .text {
// 			user-select: none;
// 			cursor: default;
// 			line-height: 1.35em;
// 			+desktop() {
// 				font-size: 13px;
// 			}
// 			+mobile() {
// 				font-size: 12px;
// 			}
// 		}
// 	}
// 	&.info {
// 		background-color: $COLOR_BG_2;
// 		color: rgba(#fff, 0.75);
// 		>.icon {
// 			opacity: 0.65;
// 			background-image: url('/resources/images/icon_notification_info_white.svg');
// 		}
// 	}
// 	&.error {
// 		background-color: rgba(#ff1914, 0.75);
// 		color: #fff;
// 		>.icon {
// 			opacity: 0.85;
// 			background-image: url('/resources/images/icon_notification_error_white.svg');
// 		}
// 	}
// }

const Notifications = ({ notifications, onClick }) => {
	console.log(notifications)
	return (
		<div data-component='Notifications'>
			{notifications.map((notification) => {
				return (
					// <Appear  duration={250}>
					<div
						key={notification.id}
						className={classnames('notification', notification.type)}
						onClick={() => onClick(notification.id)}
					>
						<div className='icon' />

						<div className='body'>
							{notification.title &&
								<p className='title'>{notification.title}</p>}
							<p className='text'>{notification.text}</p>
						</div>
					</div>
					// </Appear>
				);
			})}
		</div>);
};

Notifications.propTypes = {
	notifications: PropTypes.arrayOf(appPropTypes.Notification).isRequired,
	onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	const { notifications } = state;
	return { notifications };
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: (notificationId) => {
			dispatch(stateActions.removeNotification(notificationId));
		}
	};
};

const NotificationsContainer = connect(
	mapStateToProps, mapDispatchToProps
)(Notifications);

export default NotificationsContainer;
