import { reducer as formReducer } from 'redux-form'

// import { reducer as form } from 'redux-form'
import Authentication from "./auth"
import Category from "./category"
import Account from "./account"
import { Design, DesignCard, DesignComment, DesignList } from "./design"
import { DesignerList, Designer } from "./designer"
import { Group, GroupList } from "./group"
import Search from "./search"
import Personal from "./personal"
import Message from "./message"

import { combineReducers } from "redux"

export default combineReducers({
    // form,
    DesignerList,
    form: formReducer,
    Account, Authentication,
    Category,
    Design, DesignCard, DesignComment, DesignList,
    Designer,
    Group, GroupList,
    Search, Personal, Message
})
