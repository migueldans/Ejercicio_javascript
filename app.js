let boton = document.getElementById("persona_btn");
if (boton !== null) {
    boton.addEventListener("click", getPerson);
} else {
    console.log("no se ha encontrado el boton")//esto se pone para probar si hay error con el boton, luego lo quitariamos
}

let personaGuardada = JSON.parse(localStorage.getItem("persona"));//de texto a objeto con parse
if (personaGuardada !== null) {
    document.getElementById("mostrar").innerHTML = personaGuardada.nombre + " " + personaGuardada.edad;
}

function getPerson() {
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;

    let persona = { nombre: nombre, edad: edad };

    document.getElementById("mostrar").innerHTML = persona.nombre + " " + persona.edad;
    localStorage.setItem("persona", JSON.stringify(persona));//setItem solo acepta guardar strings
}

function arranca(date) {
    let xhr = new XMLHttpRequest();
    let url = "https://api.nasa.gov/planetary/apod?api_key=&date=" + date;//poner api_key
    xhr.open("GET", url);
    xhr.addEventListener("load", function () {
        let responseObject = JSON.parse(xhr.response);
        showData(responseObject.date, responseObject.title, responseObject.explanation, responseObject.url,personaGuardada);
    });
    xhr.addEventListener("error", function () {
        console.log("Un error");
    });
    xhr.send();
}

function showData(date, title, explanation, image_url,personaGuardada) {
    let result = "<p>" + date + "</p>";
    result += "<p>" + title + "</p>";
    result += "<p>" + explanation + "</p>";
    result += "<img src='" + image_url + "'/>";
    result += "<p>" + personaGuardada.nombre + " " + personaGuardada.edad + "</p>";
    document.getElementById("info").innerHTML = result;
}

function guardarFecha() {
    let date = document.getElementById("date").value;
    arranca(date);
}
