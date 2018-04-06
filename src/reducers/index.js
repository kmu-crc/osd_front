import Authentication from "./Authentication";
import DesignList from "./DesignList";
import DesignDetail from "./DesignDetail";
import GroupList from "./GroupList";
import DesignerList from "./DesignerList";

import { combineReducers } from "redux";

export default combineReducers({
    Authentication,
    DesignList,
    DesignDetail,
    GroupList,
    DesignerList
});
