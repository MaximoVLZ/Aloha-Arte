const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "c2c74aeb2f8a362613fe0039d4faed8e";

// Detener el envío del formulario, para así evitar volver a cargar la página.
// Recuperar el valor que está contenido en el campo de búsqueda
//verificaremos si hay elementos de lista (ciudades)
form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //ejecutaremos una solicitud a la API
  //parámetros: ciudad (input), clave (la manda la api)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  //Enviar el URL al que queremos acceder al método fetch()
  //devolverá una promesa que contendrá la response
  //obtener los datos de la respuesta en el formato JSON
  //devolverá otra promesa.Cuando se cumpla, los datos estarán disponibles para su manipulación
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      //la API devuelve un código icon que contiene las condiciones climáticas actuales para la ciudad elegida. 
      //En base a este código, podemos construir el URL del icono y mostrarlo en la tarjeta mediante la etiqueta img.
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    //si la solicitud no tiene éxito, aparecerá un mensaje
    .catch(() => {
      msg.textContent = "Busque una ciudad válida";
    });
  //limpiaremos el contenido
  msg.textContent = "";
  form.reset();
  input.focus();
});
