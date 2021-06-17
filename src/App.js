import "./styles.css";
import Main from "./main";
import Converter from "./components/converter";
import About from "./components/about";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
      <Router>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/converter' component={Converter} />
          <Route path='/about' component={About} />
        </Switch>
      </Router>
  );
};

export default App;
