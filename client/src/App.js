import React from 'react';
import './App.css';

import Listings from './components/pages/Listings';
import About from './components/pages/About'
import Home from './components/pages/Home'
import Show from './components/pages/Show'
import NewListing from './components/pages/NewListing'

import  NavigationBar  from './components/NavigationBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    //eveything that is between the router tag will have the ability to route
    <Router>
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/listings" exact component={Listings}/>
        <Route path="/about" component={About}/>
        <Route path="/addlisting" component={NewListing} />
        <Route path='/listing/:id' component={Show}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
