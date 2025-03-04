const apiKey = CONFIG.WEATHER_API_KEY; // delete it before pushing!
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeatherData(city);
  }
});

// Allow searching by pressing Enter key
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value;
    if (city) {
      fetchWeatherData(city);
    }
  }
});

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data. Please try again.");
  }
}

// Update UI with weather information
function updateWeatherUI(data) {
  // Location
  document.getElementById("city-name").textContent = data.name;

  // Date
  const currentDate = new Date();
  document.getElementById("current-date").textContent =
    currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Temperature
  const temperature = Math.round(data.main.temp);
  document.getElementById("temperature").textContent = `${temperature}°C`;

  // Weather Description
  const description = data.weather[0].description;
  document.getElementById("description").textContent =
    description.charAt(0).toUpperCase() + description.slice(1);

  // Weather Icon
  const iconCode = data.weather[0].icon;
  document.getElementById(
    "weather-icon"
  ).src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Additional Info
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind-speed").textContent = `${Math.round(
    data.wind.speed
  )} km/h`;
}

//Initial weather data for a default city
fetchWeatherData("London");
