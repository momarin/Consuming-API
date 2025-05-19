const apiKey = "c69bde5c8450e8dbc8e9ec73791c743e";

const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");

// EVENTS
weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid city");
  }
});

// FUNCTION
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp.toFixed(1)} °C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("city-display");
  tempDisplay.classList.add("temp-display");
  humidityDisplay.classList.add("humidity-display");
  descDisplay.classList.add("description-display");
  weatherEmoji.classList.add("weather-emoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case (weatherId >= 200 && weatherId < 300):
      return "⛈️";
    case (weatherId >= 300 && weatherId < 400):
      return "🌦️";
    case (weatherId >= 400 && weatherId < 500):
      return "🌧️";
    case (weatherId >= 500 && weatherId < 600):
      return "❄️";
    case (weatherId >= 600 && weatherId < 700):
      return "🌨️";
    case (weatherId >= 700 && weatherId < 800):
      return "🌫️";
    case (weatherId === 800):
      return "☀️";
    case (weatherId >= 801 && weatherId < 810):
      return "☁️";
    default:
        return "❔";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error-display");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
