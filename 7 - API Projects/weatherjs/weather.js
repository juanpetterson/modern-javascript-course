class Weather {
  constructor(city, state) {
    this.apiKey = '62038064c6dfcc3622969f848c24e38a';
    this.city = city;
    this.state = state;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}`
    );
    // const response = await fetch(
    //   `http://dataservice.accuweather.com/locations/v1/adminareas/{countryCode}`,
    //   { mode: 'no-cors' }
    // );

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
