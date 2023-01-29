import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import ErrorBoundry from "../error-boundry";
import ErrorIndicator from "../error-indicator";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";

import "./app.css";

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        hasError: false,
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

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        const { hasError, swapiService } = this.state;

        if (hasError) {
            return <ErrorIndicator />;
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet swapiService={swapiService} /> :
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={swapiService}>
                    <div>
                        <Header onServiceChange={this.onServiceChange} />
                        { planet }

                        <div className="row mb2 button-row">
                            <button
                                className="toggle-planet btn btn-warning btn-lg"
                                onClick={this.toggleRandomPlanet}
                            >
                                Toggle Random Planet
                            </button>
                            <ErrorButton />
                        </div>

                        <PeoplePage />
                        <StarshipsPage />
                        <PlanetsPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};
