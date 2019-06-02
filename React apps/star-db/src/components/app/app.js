import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator/error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../ErrorBoundry';
import {SwapiServiceProvider} from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import {PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage} from '../pages';
import './app.css';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {StarshipDetails, PersonDetails, PlanetDetails} from '../sw-components/';

export default class App extends Component{

 

state = {
  selectedPersonId : 1,
  personLoading : false,
  hasError: false,
  swapiService: new SwapiService(),
  isLoggedIn: false
}

onLogin =()=>{
  this.setState({isLoggedIn: true});
}
componentDidCatch() {
  this.setState({ hasError: true });
}

onServiceChange=()=>{
  this.setState(({swapiService}) =>{
    const service = swapiService instanceof SwapiService? new DummySwapiService() : new SwapiService();
    return ({swapiService: service})
  });
}


render() {
  const {isLoggedIn} = this.state;
  if (this.state.hasError) {
    return <ErrorIndicator />
  }


  return (
    <ErrorBoundry>
      <SwapiServiceProvider value ={this.state.swapiService}>
      <Router>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            <Switch>
              <Route path="/" exact render={()=><h2>Welcome to StarDB</h2>}/>
              <Route path="/people/:id?"   component={PeoplePage}/>
              <Route path="/planets" exact  component={PlanetsPage}/>
              <Route path="/starships" exact  component={StarshipsPage}/>
              <Route path="/starships/:id" render={({match})=>{
                const {id} = match.params;
              return (<StarshipDetails itemId={id}/>);
              }}/>
               <Route path="/login" exact  render={()=> <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>}/>
               <Route path="/secret" exact  render={()=><SecretPage isLoggedIn={isLoggedIn}/>}/>
               <Route render={()=><h2>Page not found</h2>}></Route>
              </Switch>
          </div>
        </Router>
      </SwapiServiceProvider>
    </ErrorBoundry>
  );
  }
}
