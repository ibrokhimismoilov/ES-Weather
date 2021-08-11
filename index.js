let loading = document.querySelector(".loadingio-outer");
let form = document.querySelector("#get-location");
let locName = document.querySelector(".location-name");
let temp = document.querySelector(".temp");
let icon = document.querySelector(".icon");
let iconDesc = document.querySelector(".icon-desc");
let code = document.querySelector("code");

const API_KEYS = "6eeef9f38d65ae49a5576f98e83b24f0";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  code.classList.add("show");
  loading.classList.add("show");
  let city = e.target[0].value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEYS}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      loading.classList.remove("show");
      icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      iconDesc.innerHTML = data.weather[0].description;
      locName.innerHTML = data.name + ". " + data.sys.country;
      temp.innerHTML = (data.main.temp * 0.1).toFixed(2) + " °C";
      code.classList.remove("error");
      code.classList.add("success");
      code.innerHTML = JSON.stringify(data);
    })
    .catch((err) => {
      loading.classList.remove("show");
      console.log(err);
      icon.src = "01d.png";
      iconDesc.innerHTML = "";
      locName.innerHTML = e.target[0].value;
      temp.innerHTML = "";
      code.classList.remove("success");
      code.classList.add("error");
      code.innerHTML = `<h1>404 Error: ${e.target[0].value}</h1> ${err.message}`;
    });
});
