var tribus = [
    { nombre: "Tribu Roja", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } },
    { nombre: "Tribu Negra", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } }
];
var competencia = {
    agregarPuntos: function (equipo, disciplina, puntos) {
        var tribu = tribus.find(function (t) { return t.nombre === equipo; });
        if (tribu)
            tribu.puntos[disciplina] += puntos;
    },
    obtenerTotalPuntos: function (equipo) {
        var tribu = tribus.find(function (t) { return t.nombre === equipo; });
        return tribu ? Object.values(tribu.puntos).reduce(function (a, b) { return a + b; }, 0) : 0;
    },
    equipoConMasPuntos: function () {
        var _this = this;
        return tribus.reduce(function (prev, curr) { return _this.obtenerTotalPuntos(prev.nombre) > _this.obtenerTotalPuntos(curr.nombre) ? prev : curr; }).nombre;
    },
    disciplinaConMayorPuntuacion: function () {
        return tribus.reduce(function (prev, curr) {
            for (var d in curr.puntos) {
                if (curr.puntos[d] > (prev.puntos || 0)) {
                    prev = { disciplina: d, puntos: curr.puntos[d] };
                }
            }
            return prev;
        }, { disciplina: '', puntos: 0 });
    }
};
document.getElementById('puntosForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var equipo = document.getElementById('equipo').value;
    var disciplina = document.getElementById('disciplina').value;
    var puntos = parseInt(document.getElementById('puntos').value);
    if (!isNaN(puntos)) {
        competencia.agregarPuntos(equipo, disciplina, puntos);
        var totalRoja = competencia.obtenerTotalPuntos("Tribu Roja");
        var totalNegra = competencia.obtenerTotalPuntos("Tribu Negra");
        var equipoMayor = competencia.equipoConMasPuntos();
        var _a = competencia.disciplinaConMayorPuntuacion(), d = _a.disciplina, mp = _a.puntos;
        document.getElementById('resultadoEquipoA').innerText = "Tribu Roja: ".concat(totalRoja, " puntos");
        document.getElementById('resultadoEquipoB').innerText = "Tribu Negra: ".concat(totalNegra, " puntos");
        document.getElementById('equipoMayor').innerText = "El equipo con m\u00E1s puntos es: ".concat(equipoMayor);
        document.getElementById('disciplinaMayor').innerText = "La disciplina con m\u00E1s puntos es: ".concat(d, " con ").concat(mp, " puntos.");
    }
    else {
        alert("Por favor, introduce un número válido.");
    }
});
