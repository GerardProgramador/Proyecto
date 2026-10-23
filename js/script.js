const preguntas = [
    {
        pregunta: "¿En qué año nació el Beato José Ferrer Esteve?",
        opciones: ["1904", "1917", "1936"],
        correcta: "1904"
    },
    {
        pregunta: "¿En qué país nació?",
        opciones: ["Italia", "España", "Francia"],
        correcta: "España"
    },
    {
        pregunta: "¿A qué orden religiosa perteneció?",
        opciones: ["Escuelas Pías", "Franciscanos", "Jesuitas"],
        correcta: "Escuelas Pías"
    },
    {
        pregunta: "¿En qué año fue asesinado por su fe?",
        opciones: ["1904", "1936", "1995"],
        correcta: "1936"
    },
    {
        pregunta: "¿En qué año fue beatificado?",
        opciones: ["1917", "1936", "1995"],
        correcta: "1995"
    }
];

let indice = 0;
let puntos = 0;
let respondida = false;

const pregunta = document.getElementById("pregunta");
const resultado = document.getElementById("resultado");
const puntuacion = document.getElementById("puntuacion");
const comprobar = document.getElementById("comprobar");
const siguiente = document.getElementById("siguiente");

function mostrarPregunta() {
    let actual = preguntas[indice];

    pregunta.textContent = actual.pregunta;

    document.querySelectorAll('input[name="respuesta"]').forEach(function(radio, i) {
        radio.value = actual.opciones[i];
        radio.checked = false;
        radio.disabled = false;
        radio.nextSibling.textContent = " " + actual.opciones[i];
    });

    resultado.textContent = "";
    puntuacion.textContent = "Puntuación: " + puntos + " de " + preguntas.length;

    comprobar.hidden = false;
    siguiente.hidden = true;
    respondida = false;
}

comprobar.addEventListener("click", function() {
    if (respondida) {
        return;
    }

    let seleccionada = document.querySelector('input[name="respuesta"]:checked');

    if (!seleccionada) {
        resultado.textContent = "Seleccioná una respuesta antes de continuar.";
        return;
    }

    respondida = true;

    if (seleccionada.value === preguntas[indice].correcta) {
        resultado.textContent = "¡Correcto!";
        puntos++;
    } else {
        resultado.textContent = "Incorrecto. La respuesta correcta era: " + preguntas[indice].correcta + ".";
    }

    puntuacion.textContent = "Puntuación: " + puntos + " de " + preguntas.length;

    document.querySelectorAll('input[name="respuesta"]').forEach(function(radio) {
        radio.disabled = true;
    });

    comprobar.hidden = true;

    if (indice < preguntas.length - 1) {
        siguiente.hidden = false;
    } else {
        resultado.textContent += " Desafío terminado.";
        puntuacion.textContent = "Resultado final: " + puntos + " de " + preguntas.length;
    }
});

siguiente.addEventListener("click", function() {
    if (indice < preguntas.length - 1) {
        indice++;
        mostrarPregunta();
    }
});

mostrarPregunta();