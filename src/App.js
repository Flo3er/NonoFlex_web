import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './pages/mainpage/MainPage';
import NoticeList from './pages/noticeList/NoticeList.js'
import Toolkit from './pages/toolkit/Toolkitpage';
// import Notice from './pages/notice/NoticePage';
// import storage from './pages/storage/StoragePage';

function App() {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/noticeList' component={NoticeList} />
          <Route path='/toolkit' component={Toolkit} />
          {/* <Route path='/notice' component={Notice} />
          <Route path='/storage' component={storage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
