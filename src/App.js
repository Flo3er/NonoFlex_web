import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Main from "./pages/mainpage/MainPage";
import NoticeList from "./pages/noticeList/NoticeList";
import Company from "./pages/company/CompanyPage";
// import Notice from './pages/notice/NoticePage';
// import storage from './pages/storage/StoragePage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <Route exact path="/" component={Main} /> */}
          <Route exact path="/noticeList" component={NoticeList} />
          <Route path='/company' component={Company} />
          {/* <Route path='/notice' component={Notice} />
          <Route path='/storage' component={storage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
