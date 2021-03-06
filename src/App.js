import React from 'react';
// import axios from 'axios';

import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_Key = "f69e073ff93b56b6d62a2ea699864c8c";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`);

      const data = await api_call.json();

      if(city && country) {
        console.log(data);

        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
      } else{
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter the value."
        });
      }
      
  }

  render() {
    return(
      <div>

        <Title />

        <Form getWeather={this.getWeather} />

        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />

      </div>
    );
  }
}

export default App;