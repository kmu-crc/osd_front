import { TopDesignList } from "reducers/Designs/TopDesignList"

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({ TopDesignList, form: formReducer, })