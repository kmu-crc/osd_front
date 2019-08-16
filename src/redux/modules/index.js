import { reducer as formReducer } from 'redux-form'

<<<<<<< HEAD
// import { reducer as form } from 'redux-form'
import auth from "./auth"
import category from "./category"
import topdesign from "./topdesign"
import designlist from "./designlist"
import designerlist from "./designerlist"
import grouplist from "./grouplist"
//...new reducers import here
=======
import Authentication from "./auth"
import Account from "./account"
import Category from "./category"
import { Design, DesignCard, DesignComment, DesignList } from "./design"
import { Designer } from "./designer"
import { Group, GroupList } from "./group"
import Search from "./search"
import Personal from "./personal"
import Message from "./message"
>>>>>>> 2ae75d027f66cd38569288c506537b69149bf21c

import { combineReducers } from "redux"

export default combineReducers({
<<<<<<< HEAD
    // form,
    auth,
    category,
    designlist,
    topdesign,
    designerlist,
    grouplist,
=======
    form: formReducer,
    Account, Authentication,
    Category,
    Design, DesignCard, DesignComment, DesignList,
    Designer,
    Group, GroupList,
    Search, Personal, Message
>>>>>>> 2ae75d027f66cd38569288c506537b69149bf21c
})
