import React, { Component } from "react";
import "./App.css";

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';


const PLACES = [
  { name: "Vinnytsia" },
  { name: "Kyiv"},
  { name: "Lviv"},
  { name: "Kharkiv"}
];

class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      activePlace : props.activePlace
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activePlace !== nextProps.activePlace) {
      this.setState(() => ({
        activePlace: nextProps.activePlace,
        weatherData: null
      }), () => {
      this.loadPlace()
      });
    }
  }

  componentDidMount() {
    this.loadPlace();
  }

  loadPlace() {
    const place = this.state.activePlace
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
    if (typeof(weatherData.weather) == "undefined") return <div>Loading</div>;
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
      activePlace: ``,
      showWeather: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

    handleChange(event) {
      this.setState( { activePlace: event.target.value} );
    }

     handleClick() {
       this.setState(() => ({ showWeather: true }));
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
        </div>
    );
  }
}

export default App;
