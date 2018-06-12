import Authentication from "./Authentication";
import { DesignList, DesignDetail, DesignDetailView, DesignDetailStep, DesignDetailStepCard, DesignIssueList } from "reducers/Designs";
import { DesignerList, DesignerDetail } from "reducers/Designers";
import { GroupList, GroupDetail, GroupWaitingList, MyList } from "reducers/Groups";
import { SignIn, SignUp } from "reducers/Registration";
import { UserInfo, MyDetail } from "reducers/Users";
import { Categorys } from "reducers/Categorys";
import { reducer as formReducer } from 'redux-form';
import { Search } from "reducers/Commons";

import { combineReducers } from "redux";

export default combineReducers({
    Authentication,
    DesignList,
    DesignDetail,
    DesignDetailView,
    DesignDetailStep,
    DesignDetailStepCard,
    DesignIssueList,
    GroupList,
    GroupDetail,
    GroupWaitingList,
    MyList,
    DesignerList,
    DesignerDetail,
    SignIn,
    SignUp,
    UserInfo,
    Categorys,
    form: formReducer,
    MyDetail,
    Search
});
