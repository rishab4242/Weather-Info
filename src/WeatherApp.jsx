import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
import './WeatherApp.css'; // Assuming you create a separate CSS file for styles

export default function WeatherApp() {
  let [weatherInfo, setWeatherInfo] = useState({
    city: "Vasai",
    feelsLike: 17.35,
    humidity: 55,
    temp: 18.05,
    tempMax: 18.05,
    tempMin: 18.05,
    weather: "smoke",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="weather-app">
      <h1 className="weather-header">Weather App by Delta</h1>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
