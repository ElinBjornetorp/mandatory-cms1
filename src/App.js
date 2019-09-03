import React, {useState} from 'react';
//import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import {MainPage} from './MainPage.js';
import {ArticlePage} from './ArticlePage.js';
import {AuthorsPage} from './AuthorsPage.js';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route path="/articles/:id" component={ArticlePage} />
        <Route path="/authors" component={AuthorsPage} />
      </Router>
    </div>
  );
}

export default App;
