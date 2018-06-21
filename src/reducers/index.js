import Authentication from "./Authentication";
import { DesignList, DesignDetail, DesignDetailView, DesignDetailStep, DesignDetailStepCard, DesignIssueList, DesignLike } from "reducers/Designs";
import { DesignerList, DesignerLike, DesignerDetail } from "reducers/Designers";
import { CreateGroup, GroupLike, GroupList, GroupDetail, GroupWaitingList, MyList } from "reducers/Groups";
import { SignIn, SignUp } from "reducers/Registration";
import { UserInfo, MyDetail } from "reducers/Users";
import { Categorys } from "reducers/Categorys";
import { reducer as formReducer } from 'redux-form';
import { Search } from "reducers/Commons";
import OpenDesign from "reducers/OpenDesign";

import { combineReducers } from "redux";

export default combineReducers({
    Authentication,
    DesignList,
    DesignDetail,
    DesignDetailView,
    DesignDetailStep,
    DesignDetailStepCard,
    DesignIssueList,
    DesignLike,
    CreateGroup,
    GroupLike,
    GroupList,
    GroupDetail,
    GroupWaitingList,
    MyList,
    DesignerList,
    DesignerLike,
    DesignerDetail,
    SignIn,
    SignUp,
    UserInfo,
    Categorys,
    form: formReducer,
    MyDetail,
    Search,
    OpenDesign
});
