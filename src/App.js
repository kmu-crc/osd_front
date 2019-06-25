import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//pages
import MainPage from "pages/Main/MainPage"
import TourPage from "pages/Tour/TourPage"
import DesignListPage from "pages/DesignList/DesignListPage"
import GroupListPage from "pages/GroupList/GroupListPage"

import host from "./config"

class CreateDesignPage extends React.Component { }
class DesignDetailPage extends React.Component { }
class DesignerListPage extends React.Component { }
class DesignerDetailPage extends React.Component { }
class CreateGroupPage extends React.Component { }
class GroupDetailPage extends React.Component { }
class MessagesPage extends React.Component { render() { return (<div>a?</div>) } }
class SignUpPage extends React.Component { render() { return (<div>a</div>) } }
class NotFoundPage extends React.Component { render() { return (<div>404</div>) } }

function App() {
  console.log("backend:", host)
  console.log("process.env:", process.env)
  return (
    <BrowserRouter>
      <Switch>
        {/* index */}
        <Route exact path="/" component={MainPage} />
        <Route path="/tour" component={TourPage} />
        {/* design */}
        <Route path="/design" component={DesignListPage} />
        <Route path="/createDesign" component={CreateDesignPage} />
        <Route path="/designDetail" component={DesignDetailPage} />
        {/* designer */}
        <Route path="/designer" component={DesignerListPage} />
        <Route path="/designerDetail" component={DesignerDetailPage} />
        {/* group */}
        <Route path="/group" component={GroupListPage} />
        <Route path="/createGroup" component={CreateGroupPage} />
        <Route path="/groupDetail" component={GroupDetailPage} />
        {/* mics. */}
        <Route path="/messages" component={MessagesPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
