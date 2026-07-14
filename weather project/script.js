// Select HTML Elements
const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location p:nth-child(2)");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

// Your WeatherAPI Key
const API_KEY = "0b893061e5244334995123929263105";

// Fetch Weather Data
async function fetchResults(targetLocation) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${targetLocation}&aqi=no`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    // Extract Data
    const locationName = data.location.name;
    const time = data.location.localtime;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    // Update UI
    updateDetails(temp, locationName, time, condition);

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data. Please check your internet connection or city name.");
  }
}

// Update HTML
function updateDetails(temp, locationName, time, condition) {
  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = time;
  conditionField.innerText = condition;
}

// Search Form Submit
function searchForLocation(e) {
  e.preventDefault();

  const target = searchField.value.trim();

  if (target === "") {
    alert("Please enter a city name.");
    return;
  }

  fetchResults(target);

  // Clear input field
  searchField.value = "";
}

// Add Event Listener
form.addEventListener("submit", searchForLocation);

// Show default weather when page loads
fetchResults("Peshawar");