const API_KEY = "81ac918aa23152bf149f04715e873101";

async function getForecast() {
    const city = document.querySelector("#city").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
    const apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  
    const response = await Promise.all([fetch(apiUrl), fetch(apiCurrentUrl)]);
    const [forecastData, currentData] = await Promise.all(
      response.map((res) => res.json())
    );
  
    let forecast = `
    <div id=currentconditions>
      <h2>Current Conditions</h2>
      <img src="http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png"/>
      <p>Temperature: ${currentData.main.temp}°C</p>
      <p>Humidity: ${currentData.main.humidity}%</p>
      <p>Wind Speed: ${currentData.wind.speed}m/s</p>
      <p>Description: ${currentData.weather[0].description}</p>
      </div>
    `;
  
    for (let i = 0; i < forecastData.list.length; i += 8) {
      forecast += `
      <div id=currentconditions>
        <h2>${new Date(forecastData.list[i].dt * 1000).toLocaleDateString()}</h2>
        <img src="http://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png"/>
        <p>Temperature: ${forecastData.list[i].main.temp}°C</p>
        <p>Humidity: ${forecastData.list[i].main.humidity}%</p>
        <p>Wind Speed: ${forecastData.list[i].wind.speed}m/s</p>
        <p>Description: ${forecastData.list[i].weather[0].description}</p>
        </div>
      `;
    }
  
    document.querySelector("#forecast").innerHTML = forecast;
//if i have more time ill come back and finish the buttons. i couldnt manage to do it with the time i had left.
  let searchHistory = localStorage.getItem("searchHistory");
  if (!searchHistory) {
    searchHistory = [];
  } else {
    searchHistory = JSON.parse(searchHistory);
  }

  searchHistory.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  let history = "";
  for (let i = 0; i < searchHistory.length; i++) {
    history += `<button onclick="getForecast('${searchHistory[i]}')">${searchHistory[i]}</button>`;
  }
  document.querySelector("#history").innerHTML = history;
  }
