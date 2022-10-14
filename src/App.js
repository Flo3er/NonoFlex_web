import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/mainpage/MainPage";
import NoticeList from "./pages/noticeList/NoticeList.js";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/noticeList" component={NoticeList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
