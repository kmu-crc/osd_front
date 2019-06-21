import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//pages
import MainPage from "pages/MainPage/MainPage"
import TourPage from "pages/TourPage/TourPage"

import host from "./config"

class DesignListPage extends React.Component { }
class CreateDesignPage extends React.Component { }
class DesignDetailPage extends React.Component { }

function App() {
  console.log("backend:", host)
  console.log("process.env:", process.env)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/tour" component={TourPage} />
        {/*design*/}
        <Route path="/design" component={DesignListPage} />
        <Route path="/createDesign" component={CreateDesignPage} />
        <Route path="/designDetail" component={DesignDetailPage} />
        {/*designer*/}
        {/*group*/}
        {/*mics.*/}
      </Switch>
    </BrowserRouter>
  )
}

export default App
