import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Sample from './pages/pageSample/SamplePage';
import Notice from './pages/notice/NoticePage';

function App() {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Sample} />
          <Route path='/notice' component={Notice} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
