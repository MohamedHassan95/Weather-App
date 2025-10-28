const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");



const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon");

const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");



const apiKey = "977c55b970a0296b44acac57795f5742" ; 


//Iconmap to change Icons 
const iconMap = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-alt-cloudy",
  "03d": "wi-cloud",
  "04d": "wi-cloudy",
  "09d": "wi-showers",
  "10d": "wi-day-rain",
  "11d": "wi-thunderstorm",
  "13d": "wi-snow",
  "50d": "wi-fog"
};

searchBtn.addEventListener("click" , () => {
    const city = searchBox.value;

    

    if (city === ""){
        alert("Please Enter a city name!")
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if(data.cod === 404){
            alert("City not found");
            return;
        }


        //Change the data when selecting a city
        cityName.textContent = data.name;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        wind.textContent = `${data.wind.speed} km/h`;
        humidity.textContent = `${data.main.humidity}%`;
        pressure.textContent = `${data.main.pressure} hPa`;
        visibility.textContent = `${data.visibility / 1000} km`;


        //Change the icon according to the weather condition
        const iconCode = data.weather[0].icon;
        weatherIcon.className = `wi ${iconMap[iconCode] || 'wi-day-sunny'}`;
    }).catch(error => {
        alert("Something went wrong. please try again later!");
        console.error(error);
    });

    
    searchBox.value = "";
});

//Enter key search
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

//Cairo as a default city
window.addEventListener("load", () => {
  searchBox.value = "Cairo";
  searchBtn.click();
});