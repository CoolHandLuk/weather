const button = document.querySelector("#search");
const wrapper = document.querySelector(".weather__wrapper");
const newButton = document.createElement("button");
const input = document.querySelector("#city");
const ul = document.querySelector("ul");

button.addEventListener("click", function () {
  
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=dba3cbbbe22de845daba54e9ad2c2c0b&units=metric&lang=pl`
  )
    .then((response) => response.json())
    .then((response) => {

      // zwrocenie popupa ze musi byc wlasciwe miasto w inpucie
      if (response.cod !== 200) {
        input.value = "";
        return alert("wprowadź poprawną nazwę miasta/miejsca");
      }

    

      
      const minTemp = document.createElement("li");
      minTemp.innerText = `Min Temp ${response.main.temp_min} Celsjusz`;
      minTemp.classList.add('active');
      ul.append(minTemp);
      const maxTemp = document.createElement("li");
      maxTemp.innerText = `Max Temp ${response.main.temp_max} Celsjusz`;
      maxTemp.classList.add('active');
      ul.append(maxTemp);
      const feelTemp = document.createElement("li");
      feelTemp.innerText = `Odczuwalna Temp ${response.main.feels_like} Celsjusz`;
      feelTemp.classList.add('active');
      ul.append(feelTemp);
      const weatherDescription = document.createElement("li");
      weatherDescription.innerText = ` ${response.weather[0].description}`;
      weatherDescription.classList.add('active');
      ul.append(weatherDescription);

      const weatherIcon = document.createElement("li");
      const iconImg = document.createElement("img");
      iconImg.src = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;
      weatherIcon.append(iconImg);
      ul.append(weatherIcon);
      
      newButton.innerText = `Wyczyść`;
      newButton.classList.add("weather__btn");
      button.insertAdjacentElement('afterend', newButton);
     button.disabled = true;
    });
});

newButton.addEventListener('click', ()=> {
input.value ='';
ul.innerText = '';
button.disabled = false;
})
