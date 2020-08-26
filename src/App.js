import React, { useState } from 'react';
import './App.css';

const dateMaker = (d) =>{
    let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `
        ${day} ${date} ${month} ${year} 
    `
    
}
const api = {
    key: "328011a8a13e4743b68202003201008",
    base: "https://api.weatherapi.com/v1/"
}
function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt =>{
        if(evt.key === "Enter"){
            fetch(`${api.base}forecast.json?key=${api.key}&q=${query}`)
            .then(res => res.json())
            .then(result =>{
                setWeather(result)
                setQuery('');
                console.log(result);
            });
        }
    }
    return(
        <div className={(typeof weather.current != "undefined" ? ((weather.current.feelslike_c > 16) ? 'app warm' :
         'app') : 'app' )}>
           <main>
           <div className="searchbar">
                <input type="text" className="searchbox" 
                placeholder="search any city..."
                onChange={e=> setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                />
            
            </div>
                {(typeof weather.current != "undefined") ? (
                     <div>
                     <div className="location-weather">
                         <div className="location"> {weather.location.name}, {weather.location.country} </div>
                     </div>
                     <div className="timeframe">
                          <div className="date">{dateMaker(new Date())}</div>
                     </div>
                     <div className="weatherbox">
                         <div className="weather">{weather.current.feelslike_c}°C</div>
                         <img src={weather.current.condition.icon} alt="icon"/>
                     </div>
                     
                     <div className="weather-description">
                          <div className="description">{weather.current.condition.text} </div>
                     </div>
             
                 </div>
                ) : ('')}
               
           
           </main>
            
        </div>
    );
}
export default App;