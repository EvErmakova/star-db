export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';

    _extractId(url) {
        const idRegExp = /\/([0-9]*)\/$/;
        return url.match(idRegExp)[1];
    }

    getResource = async (url) =>  {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

     getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

     getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    getPersonImage = ({ id }) => {
        return `${this._imageBase}/characters/${id}.jpg`;
    }

    _transformPerson = ({ url, name, gender, birth_year, eye_color }) => {
        return {
            id: this._extractId(url),
            name,
            gender,
            birthYear: birth_year,
            eyeColor: eye_color
        };
    }

    getAllPlanets = async () =>  {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    }

    getPlanet = async (id) =>  {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    }

    getPlanetImage = ({ id }) => {
        return `${this._imageBase}/planets/${id}.jpg`;
    }

    _transformPlanet = ({ url, name, population, rotation_period, diameter }) => {
        return {
            id: this._extractId(url),
            name,
            population,
            rotationPeriod: rotation_period,
            diameter
        };
    }

    getAllStarships = async () =>  {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    }

    getStarship = async (id) =>  {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    }

    getStarshipImage = ({ id }) => {
        return `${this._imageBase}/starships/${id}.jpg`;
    }

    _transformStarship = ({ url, name, model, manufacturer, cost_in_credits, length, crew, passengers, cargo_capacity }) => {
        return {
            id: this._extractId(url),
            name,
            model,
            manufacturer,
            costInCredits: cost_in_credits,
            length,
            crew,
            passengers,
            cargoCapacity: cargo_capacity
        };
    }
};
