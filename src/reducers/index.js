import Authentication from "./Authentication";
import { reducer as formReducer } from 'redux-form';
import OpenDesign from "reducers/OpenDesign";

import { combineReducers } from "redux";

export default combineReducers({ Authentication, form: formReducer, OpenDesign })
