import React, {Component} from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Music from './components/Music';
import Favorite from './components/Favorite';


class App extends Component {
  render(){
    return (
      <Router >
        <Home/>
        <div>
          <nav>
            <ul>
              <li>
                <Link className="word" to={'/'}>Home</Link>
              </li>
              <li>
                <Link className="word"  to={'/Music'}>Music</Link>
              </li>
              <li>
                <Link className="word" to={'/Favorite'}>Favorites</Link>
              </li>
            </ul>
          </nav>
          <Switch>
          <Route path='/Home' component={Home}/>
            <Route path='/Music' component={Music}/>
            <Route path='/Favorite' component={Favorite}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
