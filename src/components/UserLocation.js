import React, { Component } from 'react'
import axios from 'axios'
let searchHistory = ''
class UserLocation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            city: props.city,
            region: props.region,
            local: props.localtime,
            temperature:  props.temperature,
            obs_time:  props.observation_time,
            is_day: props.is_day,
            precip: props.precip,
            pressure: props.pressure,
            feelslike: props.feelslike,
            wind_speed: props.wind_speed,
            wind_degree: props.wind_degree,
            wind_dir: props.wind_dir,
            cloudcover: props.cloudcover,
            country: props.country,
            img:  props.img          
            
        }
  
        console.log(this.state)
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
              img: data['current'].weather_icons,
              search_array: []
            })
          })
        }
        componentDidMount(){
            this.getWeather();
            
        }
    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)

    const {search} =this.state
    axios.get(`https://api.weatherstack.com/current?access_key=50277e7afa77c3a10e2909babc252a0c&query=${this.state.search}`,this.state)
    .then(res =>{
        console.log(res)
        if(res.data['current'] == null){
            alert('Please check your spelling')
        }else{

            this.setState({
                weather_current: res.data['current'],
                  weather_location: res.data['location'],
                  region : res.data['location'].region,
                  country : res.data['location'].country,
                  name : res.data['location'].name,
                  localtime : res.data['location'].localtime,
                  is_day : res.data['current'].is_day,
                  precip: res.data['current'].precip,
                  wind_degree: res.data['current'].wind_degree,
                  weather_descriptions: res.data['current'].weather_descriptions,
                  temperature: res.data['current'].temperature,
                  pressure: res.data['current'].pressure,
                  feelslike: res.data['current'].feelslike,
                  cloudcover: res.data['current'].cloudcover,
                  wind_speed: res.data['current'].wind_speed,
                  wind_dir: res.data['current'].wind_dir,
                  obs_time: res.data['current'].observation_time,
                  img: res.data['current'].weather_icons,

                  search_array: [...this.state.search_array, this.state.search]
            })
        }
     
        searchHistory =   this.state.search_array.map(item =>( <li key={item}>{item}</li>)  )

        console.log(searchHistory)
        
        
    })
    .catch(error =>{
        console.log(error)
    })
    
}
    render() {
        return (
            <div>
                
                <div className='input-group-mb-3'>
                     <form onSubmit={this.submitHandler}>
					    <div className="search-card">
						    <input className="form-control" placeholder="Search" 
							type="text"
							placeholder="Search Country /City here"
							name="search"
							value={this.state.search}
							onChange={this.changeHandler}
						    />
				        </div>
				        <div className="input-group-append">
                        <button  className="btn btn-primary" type="submit" value='SEARCH'>Go</button>  
                        </div>
				</form>
        <div>
            <h3>Recent Search</h3>
            <h5>{searchHistory}</h5>
            </div>
                </div> 
            <div className="user-weather">
                <div className="row">
            <div className="col-md-3 weather-temp">
                <h1>{this.state.country}</h1>
                <h2>{this.state.region} {this.state.name}, {this.state.temperature}<sup>o</sup>C</h2>
                <p>{this.state.local}</p>
                <h4></h4>
            </div>
                <div className="col-md-9">
                    <img className="mainImg" src={this.state.img} alt="weather-img" />
                </div>
            </div>
            <div className="row border border-warning rounded">
                <div className="col-md-3 weather-info">
                <p><b>Wind Speed</b>(km/hr)</p>
                <h2>{this.state.wind_speed}</h2>
            </div>

            <div className="col-md-3 weather-info ">
                <p><b>Preassure</b>(millibar)</p>
                <h2>{this.state.pressure}</h2>
            </div>
            <div className="col-md-3 weather-info">
                <p><b>Precipitation</b>(mm)</p>
                <h2>{this.state.precip}</h2>
            </div>
            <div className="col-md-3 weather-info">
                <p><b>Feels Like<sup>o</sup>C</b></p>
                <h2>{this.state.feelslike}</h2>
            </div>
            <div className="col-md-3 weather-info">
                <p><b>Wind Direction<sup>o</sup>C</b></p>
                <h2>{this.state.wind_dir}</h2>
            </div>
            <div className="col-md-3 weather-info">
                <p><b>Wind Degree<sup>o</sup>C</b></p>
                <h2>{this.state.wind_degree}</h2>
            </div>

        </div>
            
    </div>
     
</div>


          
        )
    }
}

export default UserLocation