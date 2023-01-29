import React from 'react';
import ItemList from '../item-list';
import {compose, withChildFunction, withData, withSwapiService} from '../hoc-helpers';

const createList = (props, label) => (
    compose(
        withSwapiService(props),
        withData,
        withChildFunction(label)
    )(ItemList)
);

const mapMethodsToProps = (data) => ({ getData: data });

const renderPersonLabel = ({ name, gender }) => <span>{name} ({gender})</span>;
const renderPlanetLabel = ({ name }) => <span>{name}</span>;
const renderStarshipLabel = ({ name, model }) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => mapMethodsToProps(swapiService.getAllPeople);

const mapPlanetMethodsToProps = (swapiService) => mapMethodsToProps(swapiService.getAllPlanets);

const mapStarshipMethodsToProps = (swapiService) => mapMethodsToProps(swapiService.getAllStarships);

const PersonList = createList(mapPersonMethodsToProps, renderPersonLabel);
const PlanetList = createList(mapPlanetMethodsToProps, renderPlanetLabel);
const StarshipList = createList(mapStarshipMethodsToProps, renderStarshipLabel);

export {PersonList, PlanetList, StarshipList};
