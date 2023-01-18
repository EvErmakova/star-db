export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';

    _extractId(url) {
        const idRegExp = /\/([0-9]*)\/$/;
        return url.match(idRegExp)[1];
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    async getAllPeople() {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    _transformPerson = ({ url, name, gender, birthYear, eyeColor }) => {
        return {
            id: this._extractId(url),
            name,
            gender,
            birthYear,
            eyeColor
        };
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
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

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship);
    }

    async getStarship(id) {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    }

    _transformStarship = ({ url, name, model, manufacturer, costInCredits, length, crew, passengers, cargoCapacity }) => {
        return {
            id: this._extractId(url),
            name,
            model,
            manufacturer,
            costInCredits,
            length,
            crew,
            passengers,
            cargoCapacity
        };
    }
};
