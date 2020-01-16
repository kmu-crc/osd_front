import Authentication from "./Authentication";
import { DesignList, DesignDetail, DesignDetailView, DesignDetailStep, DesignDetailStepCard, DesignCardComment, DesignIssueList, DesignIssueComment, DesignLike, DeleteDesign, ChangeToProject, UpdateDesign, DesignSourceDetail, DesignWaitingList, DesignDetailComment } from "reducers/Designs";
import {
    ProductDetail, ProductLike, ProductList,
    CartList,OrderList,
    //ProductDetailView, ProductDetailStep,
    // ProductDetailStepCard, ProductCardComment, ProductIssueList, ProductIssueComment,
    // ProductLike, DeleteProduct, ChangeToProject, UpdateProduct, ProductSourceDetail,
    // ProductWaitingList, ProductDetailComment
} from "reducers/Products";
import { DesignerList, DesignerLike, DesignerDetail, DesignerBoardList, DesignerBoardDetail } from "reducers/Designers";
import { CreateGroup, GroupLike, GroupList, GroupDetail, GroupWaitingList, MyList, DeleteGroup, GroupIssue, MyExistList } from "reducers/Groups";
import { SignIn, SignUp, FindPw } from "reducers/Registration";
import { UserInfo, MyDetail, MyJoin } from "reducers/Users";
import { MessageList, MessageDetail } from "reducers/Messages";
import { CategoryAll } from "reducers/Categorys";
import { reducer as formReducer } from 'redux-form';
import { Search, SearchIssue, TopList } from "reducers/Commons"
import { DesignForked } from "reducers/Designs/DesignForked"
import OpenDesign from "reducers/OpenDesign";

import { combineReducers } from "redux";

export default combineReducers({
    // PRODUCT
    ProductDetail, ProductLike, ProductList,
    CartList,OrderList,
    // DESIGN
    DesignList, DesignDetail,
    DesignDetailView, DesignDetailStep, DesignDetailStepCard, DesignForked, DesignSourceDetail, DesignCardComment, DesignDetailComment, DesignIssueList,
    DesignIssueComment, DesignLike, DeleteDesign,
    ChangeToProject, UpdateDesign, DesignWaitingList,
    // GROUP
    CreateGroup, GroupLike, GroupList, GroupDetail, GroupWaitingList,
    MyList, DeleteGroup, GroupIssue, MyExistList,
    // DESIGNER 
    DesignerList, DesignerLike, DesignerDetail, DesignerBoardList, DesignerBoardDetail,
    // MY
    SignIn, SignUp, FindPw, UserInfo, CategoryAll, form: formReducer,
    MyDetail, MyJoin,
    // ETC
    Authentication,
    Search, SearchIssue, TopList, OpenDesign, MessageList, MessageDetail
});
