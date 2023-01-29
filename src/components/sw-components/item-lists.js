import React from 'react';
import ItemList from '../item-list';
import {withData, withSwapiService} from '../hoc-helpers';

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

const renderPersonLabel = ({ name, gender }) => <span>{name} ({gender})</span>;
const renderPlanetLabel = ({ name }) => <span>{name}</span>;
const renderStarshipLabel = ({ name, model }) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};

const createList = (props, label) => {
    return withSwapiService(props)(
        withData(withChildFunction(label)(ItemList))
    );
};

const PersonList = createList(mapPersonMethodsToProps, renderPersonLabel);
const PlanetList = createList(mapPlanetMethodsToProps, renderPlanetLabel);
const StarshipList = createList(mapStarshipMethodsToProps, renderStarshipLabel);

export {
    PersonList,
    PlanetList,
    StarshipList
};
