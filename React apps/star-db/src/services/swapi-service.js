export default class SwapiService{
    _apiBase = "https://swapi.co/api";
    _imageBase = `https://starwars-visualguide.com/assets/img/`;

     getAllPeople = async()=>  {
        const result = await this.getResource('/people/');
        return result.results.map(person => this._transoformPerson(person));
    }

     getAllPlanets = async () => {
        const result = await this.getResource(`/planets/`);
        return result.results.map(planet => this._transoformPlanet(planet));
    }

     getAllStarships = async () =>{
        const result = await this.getResource(`/starships/`);
        return result.results.map(starship => this._transoformStarship(starship));
    }

     getPerson = async (id) =>{
        const person = await this.getResource(`/people/${id}`);
        return this._transoformPerson(person);
    }

     getPlanet = async (id) =>{
       const planet = await this.getResource(`/planets/${id}`);
       return this._transoformPlanet(planet);
    } 

    getStarship = async (id) =>{
        const starship = await  this.getResource(`/starships/${id}`);
        return this._transoformStarship(starship);
    }

    getPersonImage = ({id}) =>{
        return (`${this._imageBase}/characters/${id}.jpg`)
    }

    getStarshipImage = ({id}) =>{
        return (`${this._imageBase}/starships/${id}.jpg`)
    }

    getPlanetImage = ({id}) =>{
        return (`${this._imageBase}/planets/${id}.jpg`)
    }    

     getResource = async (url) =>{
        const result = await fetch(`${this._apiBase}${url}`);
        if (!result.ok){
            throw Error(`Could not fetch ${url}` + `, received ${result.status}`);
        }
     
        const body = await result.json();
        return body;
    }

    _extractId= (item)=>{
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transoformPlanet = (planet) =>{
        return {  
            id: this._extractId(planet),
            name: planet.name,
            population : planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    }

    _transoformStarship = (starship) =>{
        return {  
            id: this._extractId(starship),
            name: starship.name,
            model : starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        };
    }

    _transoformPerson = (person) =>{
        return {  
            id: this._extractId(person),
            name: person.name,
            gender : person.gender,
            birthYear: person.birth_year,
            eyeColor : person.eye_color
        };
    }
}