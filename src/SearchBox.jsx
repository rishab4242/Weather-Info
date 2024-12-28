import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./SearchBox.css"; // Assuming external styles

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "15dcb621d9680e6d5a84d6ee32542847";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempmin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      return result;
    } catch (err) {
      throw err;
    }
  };

  let HandleChange = (evt) => {
    setCity(evt.target.value);
  };

  let HandleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      setCity("");
      let info = await getWeatherInfo();
      updateInfo(info);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="search-box-container">
      <form onSubmit={HandleSubmit}>
        <TextField
          id="City"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={HandleChange}
          sx={{
            width: "100%",
            marginBottom: 2,
            '& .MuiInputLabel-root': {
              color: '#333', 
            },
            '& .MuiOutlinedInput-root': {
              borderColor: '#4a90e2',
              '&:hover fieldset': {
                borderColor: '#2c3e50',
              },
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: '#4a90e2',
            '&:hover': {
              backgroundColor: '#357ab7',
            },
            marginBottom: "20px",
          }}
        >
          Search
        </Button>
        {error && (
          <p className="error-message">
            This city does not exist!!
          </p>
        )}
      </form>
    </div>
  );
}
