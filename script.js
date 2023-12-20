document.addEventListener("DOMContentLoaded", () => {
  let searchBtn = document.getElementById("search-btn");
  let countryInp = document.getElementById("country-inp");
  let result = document.getElementById("result");

  searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    let weatherAPIKey = "4dde58aa2830157379a849c08ece81f8";
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${weatherAPIKey}`;

    fetch(finalURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 404 || data.status === 500) {
          result.innerHTML = `<h3>No country found for '${countryName}'</h3>`;
        } else {
          const countryData = data[0];
          let detailsBtnHTML = `<button class="btn btn-info details-btn" data-country="${countryName}">More Details</button>`;
          result.innerHTML = `
              <img src="${countryData.flags.svg}" class="flag-img">
              <h2>${countryData.name.common}</h2>
              <div class="wrapper">
                  <div class="data-wrapper">
                      <h4>Capital:</h4>
                      <span>${countryData.capital[0]}</span>
                  </div>
              </div>
              <div class="wrapper">
                  <div class="data-wrapper">
                      <h4>Continent:</h4>
                      <span>${countryData.continents[0]}</span>
                  </div>
              </div>
              <div class="wrapper">
                  <div class="data-wrapper">
                      <h4>Population:</h4>
                      <span>${countryData.population}</span>
                  </div>
              </div>
              <div class="wrapper">
                  <div class="data-wrapper">
                      <h4>Currency:</h4>
                      <span>${
                        countryData.currencies[
                          Object.keys(countryData.currencies)[0]
                        ].name
                      } - ${Object.keys(countryData.currencies)[0]}</span>
                  </div>
              </div>
              <div class="wrapper">
                  <div class="data-wrapper">
                      <h4>Common Languages:</h4>
                      <span>${Object.values(countryData.languages).join(
                        ", "
                      )}</span>
                  </div>
              </div>
              <div class="details-section">
                  ${detailsBtnHTML}
              </div>
            `;
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        result.innerHTML = `<h3>Error fetching data. Please try again later.</h3>`;
      });
  });

  result.addEventListener("click", (event) => {
    if (event.target.classList.contains("details-btn")) {
      let countryName = event.target.getAttribute("data-country");
      let weatherAPIKey = "4dde58aa2830157379a849c08ece81f8";
      let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${weatherAPIKey}`;

      fetch(weatherURL)
        .then((weatherResponse) => weatherResponse.json())
        .then((weatherData) => {
          let weatherHTML = `
              <div class="wrapper">
                  <div class="data-wrapper">
                      <h4>Weather:</h4>
                      <span>${weatherData.weather[0].description}</span>
                  </div>
              </div>
            `;
          event.target.parentNode.innerHTML += weatherHTML;
        })
        .catch((weatherError) => {
          console.error("Error fetching weather data:", weatherError);
          event.target.parentNode.innerHTML += `<h3>Error . Please try again later.</h3>`;
        });
    }
  });
});
