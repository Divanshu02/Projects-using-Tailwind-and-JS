// https://api.weatherapi.com/v1/current.json?key=199fb48ecd4642548b6135505231508&q=rajpura&aqi=no

let current_location = document.querySelector(".location");
let current_weather = document.querySelector(".current-weather");
let temprature = document.querySelector(".temprature");
let windSpeed = document.querySelector(".wind-speed");
let Humidity = document.querySelector(".humidity");
let clouds = document.querySelector(".clouds");
let otherWeather = document.querySelector(".other-weather");
let display1 = document.querySelector(".display1");
let display2 = document.querySelector(".display2");
let searchBar = document.querySelector(".search-input");
let searchDiv = document.querySelector(".search-div");
let weatherCondition = document.querySelector(".condition");
let found=document.querySelector('.not-found')
let getData = async (city) => {
  try {
    let response = await fetch(
      ` https://api.weatherapi.com/v1/current.json?key=199fb48ecd4642548b6135505231508&q=${city}&aqi=no`
    );
    let data = await response.json();
    return data;
  } catch (e) {
    throw new Error("error occured");
  }
};

getData("Rajpura").then((data) => {
  console.log(data);
  weatherCondition.textContent = data.current.condition.text;
  temprature.textContent = `${data.current.temp_c}°C`;
  windSpeed.textContent = `${data.current.wind_kph} kp/h`;
  Humidity.textContent = `${data.current.humidity}%`;
  clouds.textContent = `${data.current.cloud}%`;
});

current_weather.addEventListener("click", (e) => {
    found.classList.add('hid')  
  searchDiv.style.cssText = "display:hidden";
  current_location.textContent = "Rajpura";
  current_weather.classList.add("bg");
  otherWeather.classList.remove("bg");
  display1.classList.remove("active");
  display2.classList.remove("active");
  getData("Rajpura").then((data) => {
    console.log(data);
    weatherCondition.textContent = data.current.condition.text;
    temprature.textContent = `${data.current.temp_c}°C`;
    windSpeed.textContent = `${data.current.wind_kph} kp/h`;
    Humidity.textContent = `${data.current.humidity}%`;
    clouds.textContent = `${data.current.cloud}%`;
  });
});

otherWeather.addEventListener("click", (e) => {
      found.classList.add('hid')  
    searchDiv.style.cssText = "display:block";
    current_weather.classList.remove("bg");

    otherWeather.classList.add("bg");
    display1.classList.add("active");
    display2.classList.add("active");
});

searchBar.addEventListener("change", (e) => {
  
    found.classList.add('hid')  

  const location = e.target.value;
  console.log(location);

  getData(location).then(
    (data) => {
        display1.classList.remove("active");
        display2.classList.remove("active");
       current_location.textContent = e.target.value;
       weatherCondition.textContent = data.current.condition.text;
      console.log(data);
      temprature.textContent = `${data.current.temp_c}°C`;
      windSpeed.textContent = `${data.current.wind_kph} kp/h`;
      Humidity.textContent = `${data.current.humidity}%`;
      clouds.textContent = `${data.current.cloud}%`;
     
      searchBar.value = "";
    }
  )
  .catch(()=>{
    searchBar.value = "";
    console.log('Error Found')
    display1.classList.add("active");
    display2.classList.add("active"); 
    found.classList.remove('hid')  
  })
});
