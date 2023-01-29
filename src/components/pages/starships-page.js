import React, { Component } from 'react';
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import {StarshipDetails, StarshipList} from "../sw-components";

export default class StarshipsPage extends Component {
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
            <StarshipList onItemSelected={ this.onItemSelected }></StarshipList>
        );

        const itemDetails = (
            <ErrorBoundry>
                <StarshipDetails itemId={selectedItem}></StarshipDetails>
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
