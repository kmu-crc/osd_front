import Authentication from "./Authentication";
import DesignList from "./DesignList";
import DesignDetail from "./DesignDetail";
import DesignDetailView from "./DesignDetailView";
import GroupList from "./GroupList";
import GroupDetail from "./GroupDetail";
import DesignerList from "./DesignerList";

import { combineReducers } from "redux";

export default combineReducers({
    Authentication,
    DesignList,
    DesignDetail,
    DesignDetailView,
    GroupList,
    GroupDetail,
    DesignerList
});
