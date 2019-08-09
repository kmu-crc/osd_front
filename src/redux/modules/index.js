import Authentication from "./auth"
import Account from "./account"
import { DesignList, DesignDetail, DesignDetailView, DesignDetailStep, DesignDetailStepCard, DesignCardComment, DesignIssueList, DesignIssueComment, DesignLike, DeleteDesign, ChangeToProject, UpdateDesign, DesignSourceDetail, DesignWaitingList, DesignDetailComment } from "reducers/Designs";
import { DesignerList, DesignerLike, DesignerDetail } from "reducers/Designers";
import { CreateGroup, GroupLike, GroupList, GroupDetail, GroupWaitingList, MyList, DeleteGroup, GroupIssue, MyExistList } from "reducers/Groups";
import { SignIn, SignUp, FindPw } from "reducers/Registration";
import { UserInfo, MyDetail, MyJoin } from "reducers/Users";
import { MessageList, MessageDetail } from "reducers/Messages";
import { Categorys, CategoryAll } from "reducers/Categorys";
import { reducer as formReducer } from 'redux-form';
import { Search, SearchIssue, TopList } from "reducers/Commons"
import { DesignForked } from "reducers/Designs/DesignForked"
import OpenDesign from "reducers/OpenDesign";

import { combineReducers } from "redux";

export default combineReducers({
    Authentication, Account,
    DesignList,
    DesignDetail,
    DesignDetailView,
    DesignDetailStep,
    DesignDetailStepCard,
    DesignForked,
    DesignSourceDetail,
    DesignCardComment,
    DesignDetailComment,
    DesignIssueList,
    DesignIssueComment,
    DesignLike,
    DeleteDesign,
    ChangeToProject,
    UpdateDesign,
    DesignWaitingList,
    CreateGroup,
    GroupLike,
    GroupList,
    GroupDetail,
    GroupWaitingList,
    MyList,
    DeleteGroup,
    GroupIssue,
    MyExistList,
    DesignerList,
    DesignerLike,
    DesignerDetail,
    SignIn,
    SignUp,
    FindPw,
    UserInfo,
    Categorys,
    CategoryAll,
    form: formReducer,
    MyDetail,
    MyJoin,
    Search,
    SearchIssue,
    TopList,
    OpenDesign,
    MessageList,
    MessageDetail
});
