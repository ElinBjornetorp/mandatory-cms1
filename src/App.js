import React, {useState} from 'react';
import './App.css';
import {MainPage} from './MainPage.js';
import {ArticlePage} from './ArticlePage.js';
import {AuthorsPage} from './AuthorsPage.js';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
//import MDReactComponent from 'markdown-react-js';
//<MDReactComponent text='Some text **with emphasis**.' />

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
