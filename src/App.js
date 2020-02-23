import React from 'react';
import reducers from "./redux/index";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import './assets/styles.scss';
import Home from './pages/Home';
import Test from './pages/Test';
import Navbar from './components/Navbar';

const store = createStore(reducers, applyMiddleware(thunk));

const Layout = props => {
  return (
    <>
      <Navbar></Navbar>
      <div className="container pt-5">
        {props.children}
      </div>
    </>
  )
}

function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <div>Hello world</div>
      </header>
    </div> */

    <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Layout>
                <Home/>
              </Layout>
            </Route>
            <Route path="/test">
              <Layout>
                <Test/>
              </Layout>
            </Route>
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
