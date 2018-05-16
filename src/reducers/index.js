import Authentication from "./Authentication";
import DesignList from "./DesignList";
import DesignDetail from "./DesignDetail";
import DesignDetailView from "./DesignDetailView";
import DesignDetailStep from "./DesignDetailStep";
import DesignDetailStepCard from "./DesignDetailStepCard";
import DesignDetailIssue from "./DesignDetailIssue";
import GroupList from "./GroupList";
import GroupDetail from "./GroupDetail";
import DesignerList from "./DesignerList";
import { SignIn, SignUp } from "./Registration";
import { UserInfo } from "./Users";
import { Categorys } from "./Categorys";
import { reducer as formReducer } from 'redux-form';
import MyDetail from "./MyDetail";

import { combineReducers } from "redux";

export default combineReducers({
    Authentication,
    DesignList,
    DesignDetail,
    DesignDetailView,
    DesignDetailStep,
    DesignDetailStepCard,
    DesignDetailIssue,
    GroupList,
    GroupDetail,
    DesignerList,
    SignIn,
    SignUp,
    UserInfo,
    Categorys,
    form: formReducer,
    MyDetail
});
