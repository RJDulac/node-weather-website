const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherLocation = document.getElementById("location");
const weatherForecast = document.getElementById("forecast");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  weatherLocation.textContent = "Loading...";
  weatherForecast.textContent = "";

  fetch(`/weather?address=${search.value}`).then(res => {
    res.json().then(data => {
      if (data.err) {
        return (weatherLocation.textContent = data.err);
      }
      weatherLocation.textContent = data.location;
      weatherForecast.textContent = data.forecast;
    });
  });
  search.value = "";
});
