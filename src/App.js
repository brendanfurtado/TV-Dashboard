import React from 'react';
import Home from './Views/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
       <Router>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

