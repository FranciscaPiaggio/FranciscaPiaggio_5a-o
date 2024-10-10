const tribus = [
    { nombre: "Tribu Roja", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } },
    { nombre: "Tribu Negra", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } }
];

const competencia = {
    agregarPuntos(equipo, disciplina, puntos) {
        const tribu = tribus.find(t => t.nombre === equipo);
        if (tribu) tribu.puntos[disciplina] += puntos;
    },
    obtenerTotalPuntos(equipo) {
        const tribu = tribus.find(t => t.nombre === equipo);
        return tribu ? Object.values(tribu.puntos).reduce((a, b) => a + b, 0) : 0;
    },
    equipoConMasPuntos() {
        return tribus.reduce((prev, curr) => this.obtenerTotalPuntos(prev.nombre) > this.obtenerTotalPuntos(curr.nombre) ? prev : curr).nombre;
    },
     disciplinaConMayorPuntuacion() {
        return tribus.reduce((prev, curr) => {
            for (const d in curr.puntos) {
                if (curr.puntos[d] > (prev.puntos || 0)) {
                    prev = { disciplina: d, puntos: curr.puntos[d] };
                }
            }
            return prev;
        }, { disciplina: '', puntos: 0 });
    }
};

document.getElementById('puntosForm')!.addEventListener('submit', (event) => {
    event.preventDefault();
    const equipo = (document.getElementById('equipo') as HTMLSelectElement).value;
    const disciplina = (document.getElementById('disciplina') as HTMLSelectElement).value;
    const puntos = parseInt((document.getElementById('puntos') as HTMLInputElement).value);

    if (!isNaN(puntos)) {
        competencia.agregarPuntos(equipo, disciplina, puntos);
        const totalRoja = competencia.obtenerTotalPuntos("Tribu Roja");
        const totalNegra = competencia.obtenerTotalPuntos("Tribu Negra");
        const equipoMayor = competencia.equipoConMasPuntos();
        const { disciplina: d, puntos: mp } = competencia.disciplinaConMayorPuntuacion();

        document.getElementById('resultadoEquipoA')!.innerText = `Tribu Roja: ${totalRoja} puntos`;
        document.getElementById('resultadoEquipoB')!.innerText = `Tribu Negra: ${totalNegra} puntos`;
        document.getElementById('equipoMayor')!.innerText = `El equipo con más puntos es: ${equipoMayor}`;
        document.getElementById('disciplinaMayor')!.innerText = `La disciplina con más puntos es: ${d} con ${mp} puntos.`;
    } else {
        alert("Por favor, introduce un número válido.");
    }
});
