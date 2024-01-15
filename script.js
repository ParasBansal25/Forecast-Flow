let weather = {
  apiKey: "b373872332d94ebff94037feb04c3bb7",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like, pressure } = data.main;
    const { speed } = data.wind;
    const { all } = data.clouds;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".feels_like").innerText =
      "Feels Like: " + Math.round(feels_like) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + Math.round(speed * 3.6) + " km/h";
    document.querySelector(".clouds").innerText =
      "Cloudiness: " + all + "%";
    document.querySelector(".pressure").innerText =
      "Pressure: " + pressure + " hPa";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
    }
});

weather.fetchWeather("New York");
