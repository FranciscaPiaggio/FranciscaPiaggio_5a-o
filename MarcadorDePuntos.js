var _a;
var tribuRoja = {
    puntos: 0
};
var tribuNegra = {
    puntos: 0
};
var tribuSelect = document.getElementById('tribu');
var disciplinaSelect = document.getElementById('disciplina');
var puntosInput = document.getElementById('puntos');
var resultadoTribuRoja = document.getElementById('resultadoTribuRoja');
var resultadoTribuNegra = document.getElementById('resultadoTribuNegra');
var tribuMayorOutput = document.getElementById('tribuMayor');
var disciplinaMayorOutput = document.getElementById('disciplinaMayor');
var puntuacionesDisciplina = {
    handball: 0,
    resistencia: 0,
    ajedrez: 0
};
(_a = document.getElementById('puntosForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    agregarPuntos();
    mostrarResultados();
});
function agregarPuntos() {
    var tribu = tribuSelect.value;
    var disciplina = disciplinaSelect.value;
    var puntos = parseInt(puntosInput.value);
    if (tribu === 'Roja') {
        tribuRoja.puntos += puntos;
    }
    else if (tribu === 'Negra') {
        tribuNegra.puntos += puntos;
    }
    if (disciplina in puntuacionesDisciplina) {
        puntuacionesDisciplina[disciplina] += puntos;
    }
    else {
        console.error("Disciplina \"".concat(disciplina, "\" no v\u00E1lida."));
    }
}
function mostrarResultados() {
    // Actualizar resultados de las tribus en el HTML
    resultadoTribuRoja.textContent = "Tribu Roja: ".concat(tribuRoja.puntos, " puntos");
    resultadoTribuNegra.textContent = "Tribu Negra: ".concat(tribuNegra.puntos, " puntos");
    // Determinar la tribu con más puntos
    if (tribuRoja.puntos > tribuNegra.puntos) {
        tribuMayorOutput.textContent = 'La tribu con más puntos es: Roja';
    }
    else if (tribuNegra.puntos > tribuRoja.puntos) {
        tribuMayorOutput.textContent = 'La tribu con más puntos es: Negra';
    }
    else {
        tribuMayorOutput.textContent = 'Ambas tribus tienen la misma cantidad de puntos';
    }
    // Mostrar las puntuaciones por disciplina (opcional)
    var disciplinaMayor = Object.keys(puntuacionesDisciplina).reduce(function (a, b) {
        return puntuacionesDisciplina[a] > puntuacionesDisciplina[b] ? a : b;
    });
    disciplinaMayorOutput.textContent = "Disciplina con m\u00E1s puntos: ".concat(disciplinaMayor);
}
