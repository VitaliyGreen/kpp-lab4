import React, { Component } from "react";
import "./App.css";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


const PLACES = [
  { name: "Vinnytsia" },
  { name: "Kyiv"},
  { name: "Lviv"},
  { name: "Kharkiv"}
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  componentDidMount() {
    const place = this.props.activePlace
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=1b5ee5a1a74d624a74750350327ea372`;
    fetch(URL)
    .then(res => res.json())
    .then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;

    return (
      <div>
        <h1>
          {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: ``
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

    handleChange(event) {
      this.setState( { activePlace: event.target.value} );
    }

     handleClick() {
       this.setState(() => ({ showWeather: true }));
    }

    forceUpdateHandler() {
      this.forceUpdate();
    }

  render() {
    return (
      <div className="App">
        {PLACES.map((place) => (
          <Button
            key={place.name}
            onClick={() => {
              this.setState({ activePlace: place.name });
            }}
          >
            {place.name}
          </Button>
        ))}
        <div>
          <Input
            autoFocus = 'true'
            placeholder = 'Enter the city'
            value = {this.state.activePlace}
            onChange = {this.handleChange}
          >
          </Input>
          <Button
            variant="raised"
            color="inherit"
            onClick={this.handleClick}
          > Search
          </Button>
          </div>
          {this.state.showWeather && <WeatherDisplay activePlace={this.state.activePlace} />}
          {this.forceUpdateHandler}
        </div>
    );
  }
}

export default App;
