// escuchador de eventos q se ejecuta cuando se produce el evento 
// "DOMContentLoaded" (todo el contenido html se cargó)
document.addEventListener("DOMContentLoaded", function () {

// seleccinamos el primer elemento form y lo almacenamos en form
    const form = document.querySelector("form");

// seleccionamos el elemento de entrada de texto con el atributo id
// y lo almacenamos en una var
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

// seleccionamos el primer elemento con la clase "checkbox", lo almacenamos en var checkbox
    const checkbox = document.querySelector(".checkbox");

// escuchador de eventos que escucha el evento de envío del form,
// se desencadena al hacer clic en el botón.addEventListener
// La función (function (event) se ejecutará cuando se envíe el formulario,
// event es el objeto del evento que contiene información sobre el evento de envío del formulario.
// let isValid = true, se iniciazila isValid como true
    form.addEventListener("submit", function (event) {
        let isValid = true;

// Validar el campo de nombre
// firstNameInput.value.trim() === "" verifica si el valor del campo
// está vacío después de eliminar los espacios en blanco iniciales y finales con trim()
        if (firstNameInput.value.trim() === "") {
            showError(firstNameInput, "Debe completar el nombre."); //se esta vacio, llama a la funcion swowError
            isValid = false; // no es válido
        } else {
            clearError(firstNameInput); //no esta vacio, elimina msj de error
        }

        // Validar el campo de apellido
        if (lastNameInput.value.trim() === "") {
            showError(lastNameInput, "Debe completar el apellido.");
            isValid = false;
        } else {
            clearError(lastNameInput);
        }

        // Validar el campo de correo electrónico
        //emailPattern, expresión regular para verificar el campo (formato de correo válido)
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(emailInput.value)) {
            showError(emailInput, "Debe ingresar un email válido.");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validar el campo de contraseña
        if (passwordInput.value.length < 6) {
            showError(passwordInput, "La contraseña debe tener al menos 6 caracteres.");
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        // Validar la aceptación de términos y condiciones
        if (!checkbox.checked) {
            showError(checkbox, "Debe aceptar los Términos y Condiciones.");
            isValid = false;
        } else {
            clearError(checkbox);
        }

        if (!isValid) {
            event.preventDefault(); // Evitar que se envíe el formulario si hay errores
        }
    });

    // Función para mostrar un mensaje de error debajo del campo
    function showError(inputElement, errorMessage) {
        const errorElement = document.createElement("span");
        errorElement.className = "error-message";
        errorElement.innerText = errorMessage;

        const parentElement = inputElement.parentElement;
        parentElement.appendChild(errorElement);
    }

    // Función para eliminar el mensaje de error si existe
    function clearError(inputElement) {
        const parentElement = inputElement.parentElement;
        const errorElement = parentElement.querySelector(".error-message");
        if (errorElement) {
            parentElement.removeChild(errorElement);
        }
    }
});


