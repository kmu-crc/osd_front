import { combineReducers } from 'redux'

// import { reducer as form } from 'redux-form'

import category from "./category"
import topdesign from "./topdesign"
import designlist from "./designlist"
import designerlist from "./designerlist"
//...new reducers import here


export default combineReducers({
    // form,
    category,
    designlist,
    topdesign,
    designerlist,

})

//import { TopDesignList } from "reducers/Designs/TopDesignList"
//import { DesignList } from "reducers/Designs/DesignList"
//import { Category } from "reducers/Category/Category"
//import { combineReducers } from 'redux'
//import { reducer as formReducer } from 'redux-form'
//
//export default combineReducers({ Category, DesignList, TopDesignList, form: formReducer, })