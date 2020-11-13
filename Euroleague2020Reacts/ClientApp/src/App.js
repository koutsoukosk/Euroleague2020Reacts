import React, { Component } from 'react';
//import FirstComponents from './FirstComponent'
import PaginationExample from './PaginationExample'

import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchTeams } from './components/FetchTeams';
import { AddTeam } from './components/AddTeam';
import { FetchMatches } from './components/FetchMatches';
import { AddMatch } from './components/AddMatch';
import { FetchStandings } from './components/FetchStandings';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/fetch-teams' component={FetchTeams} />
            <Route path='/addteam' component={AddTeam} />
            <Route path='/teams/edit/:TeamID' component={AddTeam} />
            <Route path='/fetch-matches' component={FetchMatches} />
            <Route path='/addmatch' component={AddMatch} />
            <Route path='/matches/edit/:MatchID' component={AddMatch} />
            <Route path='/fetch-standings' component={FetchStandings} />
      </Layout>
    );
  }
}

//function App() {
//    return (
//        <div className="App">
//            <FirstComponents/>
//            </div>
//        );
//}

//export default App;
