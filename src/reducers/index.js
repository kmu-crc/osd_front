import Authentication from "../redux/modules/auth";
import { DesignList, DesignDetail, DesignDetailView, DesignDetailStep, DesignDetailStepCard, DesignCardComment, DesignIssueList, DesignIssueComment, DesignLike, DeleteDesign, ChangeToProject, UpdateDesign, DesignSourceDetail, DesignWaitingList, DesignDetailComment } from "reducers/Designs";
import { DesignerList, DesignerLike, DesignerDetail } from "reducers/Designers";
import { CreateGroup, GroupLike, GroupList, GroupDetail, GroupWaitingList, MyList, DeleteGroup, GroupIssue, MyExistList } from "reducers/Groups";
import Account from "../redux/modules/account";
import { UserInfo, MyDetail, MyJoin } from "reducers/Users";
import { MessageList, MessageDetail } from "reducers/Messages";
import { Categorys, CategoryAll } from "reducers/Categorys";
import { reducer as formReducer } from 'redux-form';
import { Search, SearchIssue, TopList } from "reducers/Commons"
import { DesignForked } from "reducers/Designs/DesignForked"
import OpenDesign from "reducers/OpenDesign";

import { combineReducers } from "redux";

export default combineReducers({
    Account, Authentication,
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
