import React, { Component } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";

import "./app.css";
import {StarshipDetails} from "../sw-components";

export default class App extends Component {
    state = {
        swapiService: new SwapiService()
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            };
        });
    };

    render() {
        const { swapiService } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange} />
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
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};
