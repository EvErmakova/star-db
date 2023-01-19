import React, { Component } from 'react';
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import {PlanetDetails, PlanetList} from "../sw-components";

export default class PlanetsPage extends Component {
    state = {
        selectedItem: null,
    };

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    render() {
        const { selectedItem } = this.state;

        const itemList = (
            <PlanetList onItemSelected={ this.onItemSelected }>
                { (i) => i.name }
            </PlanetList>
        );

        const itemDetails = (
            <ErrorBoundry>
                <PlanetDetails itemId={selectedItem}></PlanetDetails>
            </ErrorBoundry>
        );

        return (
            <ErrorBoundry>
                <Row
                    left={itemList}
                    right={itemDetails}
                />
            </ErrorBoundry>
        );
    }
}
