import { useEffect, useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import searchIcon from './assets/search.png'
import clearIcon from './assets/clear.png'
import coludIcon from './assets/colud.png'
import drizzleIcon from './assets/drizzle.png'
import rainIcon from './assets/rain.png'
import windIcon from './assets/wind.png'
import snowIcon from './assets/snow.png'
import humidityIcon from './assets/humidity.png'
import clearsky from './assets/01d@2x.png'
import clearskynight from './assets/01n@2x.png'
import fewcoluds from './assets/02d@2x.png'
import fewcoludsnight from './assets/02n@2x.png'
import scatteredclouds from './assets/03d@2x.png'
import brokencoluds from './assets/04d@2x.png'
import showerrain from './assets/09d@2x.png'
import rain from './assets/10d@2x.png'
import rainnight from './assets/10n@2x.png'
import thunderstorm from './assets/11d@2x.png'
import snow from './assets/13d@2x.png'
import mist from './assets/50d@2x.png'


const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt="Image" />
    </div>
    <div className="temp">{temp}'C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='lat'>longitude</span>
      <span>{log}</span>
    </div>
    </div>
    <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className='icon'/>
          <div className="data">
          <div className='humidity-percent'>{humidity}%</div>
          <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className='icon'/>
          <div className="data">
          <div className='wind-percent'>{wind} km/h</div>
          <div className="text">Wind</div>
          </div>
        </div>
      </div>

    </>
  );
}

WeatherDetails.propTypes = {
  icon : PropTypes.string.isRequired,
  temp : PropTypes.number.isRequired,
  city : PropTypes.string.isRequired,
  country : PropTypes.string.isRequired,
  humidity : PropTypes.number.isRequired,
  wind : PropTypes.number.isRequired,
  lat : PropTypes.number.isRequired,
  log : PropTypes.number.isRequired,

}


function App() {
  let api_key="42e1310f5070fc4cf98bfd1a79182532";
  const[text,setText] = useState("Chennai");
  const[icon,setIcon] = useState(clearsky);
  const[temp,setTemp] = useState(0);
  const[city,setCity] = useState("");
  const[country,setCountry] = useState("");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[cityNotFound, setCityNotFound]= useState(false);
  const[loading, setLoading]=useState(false);
  const[error,setError]=useState(null);
  const weatherIconMap ={
    "01d" : clearsky,
    "01n" : clearskynight,
    "02d" : fewcoluds,
    "02n" : fewcoludsnight,
    "03d" : scatteredclouds,
    "03n" : scatteredclouds,
    "04d" : brokencoluds,
    "04n" : brokencoluds,
    "09d" : showerrain,
    "09n" : showerrain,
    "10d" : rain,
    "10n" : rainnight,
    "11d" : thunderstorm,
    "11n" : thunderstorm,
    "13d" : snow,
    "13n" : snow,
    "50d" : mist,
    "50n" : mist,
  };
  const search=async()=>{
 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      setLoading(true);
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if(data.cod==="404")
        {
          console.error("City not found");
          setCityNotFound(true);
          setLoading(false);
          return;
        }
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        const weatherIconCode = data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearsky);
        setCityNotFound(false);
        // console.log(weatherIconMap[weatherIconCode]);
        
    }
    catch(error){
      console.error("An error occurred:",error.message);
      setError("An error occured while fetching weather data.");
    }
    finally{
      setLoading(false);
    }
  };
  
  const handleCity=(e)=>{
    setText(e.target.value);
  };
  const handleKeyDown=(e)=>{
    if(e.key==="Enter")
      {
        search();
      }
  }
  useEffect(function(){
    search();
  },[]);
  return (
    
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' placeholder='Search City' onChange={handleCity} onKeyDown={handleKeyDown} onClick={()=>search()}/>
          <div className='search-icon'>
            <img src = {searchIcon} style={{height:"22px", padding:"4px 10px 0px 3px"}} alt='Search'/>
          </div>
        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found...</div>}
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}
        <div className="copyright">
          Designed by <span>Maheshkumar</span>
        </div>
      </div>
      
    </>
  )
}

export default App
