import Authentication from "./Authentication";
import DesignList from "./DesignList";
import DesignDetail from "./DesignDetail";
import GroupList from "./GroupList";
import GroupDetail from "./GroupDetail";
import DesignerList from "./DesignerList";
import { reducer as formReducer } from 'redux-form';

import { combineReducers } from "redux";

export default combineReducers({
    Authentication,
    DesignList,
    DesignDetail,
    GroupList,
    GroupDetail,
    DesignerList,
    form: formReducer
});
