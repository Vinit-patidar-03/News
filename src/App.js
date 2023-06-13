import './App.css';
 import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
 export default class App extends Component {
  pagesize=6;
  apiKey= process.env.REACT_APP_NEWS_API;

  state=
  {
    progress:0
  }

  setProgress =(progress)=>
  {
    this.setState({progress: progress})
  }
   render() {
     return ( 
      <>
      <Router>
      <Navbar color='#FC2947'/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pagesize={this.pagesize} country="in" category="general"/>}>
            </Route>
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pagesize={this.pagesize} country="in" category="business"/>}>
          </Route>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pagesize={this.pagesize} country="in" category="entertainment"/>}>
          </Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pagesize={this.pagesize} country="in" category="sports"/>}>
          </Route>
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pagesize={this.pagesize} country="in" category="health"/>}>
          </Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pagesize={this.pagesize} country="in" category="technology"/>}>
          </Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pagesize={this.pagesize} country="in" category="science"/>}>
          </Route>
        </Routes>
      </Router>
      </>
     )
   }
 }