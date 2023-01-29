import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";

import "./app.css";

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
                    <div>
                        <Header onServiceChange={this.onServiceChange} />

                        <RandomPlanet swapiService={swapiService} />

                        <PeoplePage />
                        <StarshipsPage />
                        <PlanetsPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};
