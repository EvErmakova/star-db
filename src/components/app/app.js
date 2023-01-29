import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import {LoginPage, PeoplePage, PlanetsPage, SecretPage, StarshipsPage} from "../pages";
import {StarshipDetails} from "../sw-components";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";

import "./app.css";

export default class App extends Component {
    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    }

    render() {
        const { swapiService, isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header />
                            <RandomPlanet swapiService={swapiService} />

                            <Route path="/" exact render={() => <h2 className="text-center">Welcome to StarDB</h2>} />
                            <Route path="/people/:id?" component={PeoplePage} />
                            <Route path="/planets/:id?" component={PlanetsPage} />
                            <Route path="/starships" exact component={StarshipsPage} />
                            <Route path="/starships/:id"
                                   render={({match}) => {
                                       const { id } = match.params;
                                       return <StarshipDetails itemId={id} />;
                                   }}
                            />
                            <Route path="/login"
                                   render={() => (
                                       <LoginPage
                                           isLoggedIn={isLoggedIn}
                                           onLogin={this.onLogin}
                                       />
                                   )}
                            />
                            <Route path="/secret"
                                   render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                            />
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};
