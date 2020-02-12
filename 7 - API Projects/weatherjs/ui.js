class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelslike = document.getElementById('w-feels-like');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    const celsius = (+weather.main.temp - 273).toFixed(1);
    const feelsLikeCelsius = (+weather.main.feels_like - 273).toFixed(1);
    this.location.textContent = weather.name;
    this.desc.textContent = `${weather.main.temp}K (${celsius} C)`;
    this.string.textContent = weather.weather[0].main;
    this.icon.setAttribute(
      'src',
      `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
    this.feelslike.textContent = `Feels Like: ${weather.main.feels_like}K (${feelsLikeCelsius} C)`;
    this.dewpoint.textContent = `DewPoint: ${weather.weather[0].description}`;
    this.wind.textContent = `Wind: ${weather.wind.speed} MPH`;
  }
}
