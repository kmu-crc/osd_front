import { combineReducers } from 'redux';
import room from './room';
import me from './me';
import producers from './producers';
import dataProducers from './dataProducers';
import peers from './peers';
import consumers from './consumers';
import dataConsumers from './dataConsumers';
import notifications from './notifications';
import searchpeer from './searchpeer';

const reducers = combineReducers(
	{
		room,
		me,
		producers,
		dataProducers,
		consumers,
		dataConsumers,
		notifications,
		peers,
		searchpeer,
	});

export default reducers;
