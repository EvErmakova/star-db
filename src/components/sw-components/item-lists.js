import React from 'react';
import ItemList from '../item-list';
import {withData, withSwapiService} from '../hoc-helper';

const withChildFunction = (Wrapped, fn) => {
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

const PersonList = withSwapiService(
    withData(withChildFunction(ItemList, renderPersonLabel)),
    mapPersonMethodsToProps
);

const PlanetList = withSwapiService(
    withData(withChildFunction(ItemList, renderPlanetLabel)),
    mapPlanetMethodsToProps
);

const StarshipList = withSwapiService(
    withData(withChildFunction(ItemList, renderStarshipLabel)),
    mapStarshipMethodsToProps
);

export {
    PersonList,
    PlanetList,
    StarshipList
};
