import React, {Component} from 'react'
import Navbar from './components/Navbar.js'
import UserLocation from './components/UserLocation.js'
import './App.css'




class App extends Component{

  constructor(){
    super();
    this.state = {
      weather_current: [],
      weather_location: [],
      region: '',
      name: '',
      timezone: '',
      localtime: '',  
      temperature: '',
      humidity: '', 
      is_day:  '',
      wind_dir: '', 
      wind_speed: '', 
      cloudcover: '', 
      feelslike: '',
      pressure: '',
      weather_descriptions: '',
      weather_icons: [],
      wind_degree: '',     
      precip: '', 
      observation_time: '', 
      country: '' ,
      img: ''
    }  
  }

  async getWeather(){
  await fetch('https://api.weatherstack.com/current?access_key=50277e7afa77c3a10e2909babc252a0c&query={Ghana}',{
      method: 'GET'
    }).then(response => response.json())   
    .then(data => {
      this.setState({
        weather_current: data['current'],
        weather_location: data['location'],
        region : data['location'].region,
        country : data['location'].country,
        name : data['location'].name,
        localtime : data['location'].localtime,
        is_day : data['current'].is_day,
        precip: data['current'].precip,
        wind_degree: data['current'].wind_degree,
        weather_descriptions: data['current'].weather_descriptions,
        temperature: data['current'].temperature,
        pressure: data['current'].pressure,
        feelslike: data['current'].feelslike,
        cloudcover: data['current'].cloudcover,
        wind_speed: data['current'].wind_speed,
        wind_dir: data['current'].wind_dir,
        obs_time: data['current'].observation_time,
        img: data['current'].weather_icons
       
      })
    })
    console.log(this.state.country)
    console.log(this.state.region)
    console.log(this.state.localtime)
    console.log(this.state.weather_current)
    console.log(this.state.obs_time)
    console.log(this.state.is_day)
    console.log(this.state.temperature)
    console.log(this.state.precip)
    console.log(this.state.pressure)
    console.log(this.state.feelslike)
    console.log(this.state.cloudcover)
    console.log(this.state.wind_speed)
    console.log(this.state.wind_dir)


  }

render(){
  return(
  <div className="App">
    <div className="container">

        <Navbar/>
        <UserLocation country = {this.state.country }city = {this.state.name }
         region = {this.state.region}  time = {this.state.localtime}
          temperature = {this.state.temperature} obs_time = {this.state.obs_time }
          localtime= {this.state.localtime } is_day = {this.state.is_day } temperature = {this.state.temperature } 
          precip = {this.state.precip } obs_time = {this.state.obs_time } pressure = {this.state.pressure }
            feelslike = {this.state.feelslike } cloudcover = {this.state.cloudcover }
            wind_speed = {this.state.wind_speed }wind_degree = {this.state.wind_degree }
            wind_dir = {this.state.wind_dir } img={this.state.img}
       />
        
    </div>
  </div>
    ) 
  }
}

export default App;    
  