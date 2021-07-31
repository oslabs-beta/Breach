import React, { Component } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import '../assets/css/App.css';
import PermanentDrawerLeft from './material/SideNav';
import About from './pages/About';
import History from './pages/History';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab,fas,faCheckSquare, faCoffee)

function App() {
  let location = useLocation();

  const RedirectToHome = () => {
    return <Redirect to='/home' />;
  };

  return (
    <div className='router'>
      <PermanentDrawerLeft />
      {/* <TransitionGroup>
        <CSSTransition timeout={0} classNames='fade' key={location.key}> */}
      {/* <div> */}
      <Switch location={location}>
        {/* <Route render={() => <Redirect to="/" />} /> */}
        <Route exact path='/home' component={Home} />
        <Route exact path='/history' component={History} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/about' component={About} />

        <Route path='/index.html' component={RedirectToHome} />
      </Switch>
      {/* </div> */}
      {/* </CSSTransition>
      </TransitionGroup> */}
    </div>
  );
}

export default App;
