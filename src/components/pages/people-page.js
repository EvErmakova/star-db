import React, { Component } from 'react';
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import {PersonDetails, PersonList} from "../sw-components";

export default class PeoplePage extends Component {
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
            <PersonList onItemSelected={ this.onItemSelected }>
                { (i) => (`${i.name} (${i.birthYear})`) }
            </PersonList>
        );

        const itemDetails = (
            <ErrorBoundry>
                <PersonDetails itemId={selectedItem}></PersonDetails>
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
