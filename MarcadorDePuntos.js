// Almacenar la competencia
var TribuRoja = { nombre: "Tribu Roja", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } };
var TribuNegra = { nombre: "Tribu Negra", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } };
var competencia = new competencia(TribuRoja, TribuNegra);
// Manejar el envío del formulario
var form = document.getElementById('puntosForm');
if (!form) {
    throw new Error("El formulario no se encontró.");
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var equipoSeleccionado = document.getElementById('equipo').value;
    var disciplinaSeleccionada = document.getElementById('disciplina').value;
    var puntosInput = document.getElementById('puntos').value;
    var puntos = parseInt(puntosInput);
    if (isNaN(puntos)) {
        alert("Por favor, introduce un número válido.");
        return;
    }
    // Agregar puntos al equipo
    competencia.agregarPuntos(equipoSeleccionado, disciplinaSeleccionada, puntos);
    // Actualizar los resultados en la interfaz
    var totalTribuRoja = competencia.obtenerTotalPuntos("Tribu Roja");
    var totalTribuNegra = competencia.obtenerTotalPuntos("Tribu Negra");
    var equipoMayorPuntos = competencia.equipoConMasPuntos();
    var _a = competencia.disciplinaConMayorPuntuacion(), disciplina = _a.disciplina, mayorPuntos = _a.puntos;
    var resultadoEquipoA = document.getElementById('resultadoEquipoA');
    var resultadoEquipoB = document.getElementById('resultadoEquipoB');
    var equipoMayor = document.getElementById('equipoMayor');
    var disciplinaMayor = document.getElementById('disciplinaMayor');
    if (resultadoEquipoA && resultadoEquipoB && equipoMayor && disciplinaMayor) {
        resultadoEquipoA.innerText = "Tribu Roja: ".concat(totalTribuRoja, " puntos");
        resultadoEquipoB.innerText = "Tribu Negra ".concat(totalTribuNegra, " puntos");
        equipoMayor.innerText = "El equipo con m\u00E1s puntos en total es: ".concat(equipoMayorPuntos);
        disciplinaMayor.innerText = "La disciplina con la mayor puntuaci\u00F3n individual es: ".concat(disciplina, " con ").concat(mayorPuntos, " puntos.");
    }
});
