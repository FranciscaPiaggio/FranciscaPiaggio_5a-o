interface Puntos {
    handball: number;
    resistencia: number;
    ajedrez: number;
}

interface Tribu {
    nombre: string;
    puntos: Puntos;
}

const TribuRoja: Tribu = { nombre: "Tribu Roja", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } };
const TribuNegra: Tribu = { nombre: "Tribu Negra", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } };

const competencia = {
    tribus: [TribuRoja, TribuNegra],
    
    agregarPuntos(equipo: string, disciplina: keyof Puntos, puntos: number) {
        const tribu = this.tribus.find(t => t.nombre === equipo);
        if (tribu) {
            tribu.puntos[disciplina] += puntos;
        }
    },
    
     
    obtenerTotalPuntos(equipo: string): number {
        const tribu = this.tribus.find(t => t.nombre === equipo);
        if (tribu) {
            return Object.values(tribu.puntos).reduce((total, puntos) => total + puntos, 0);
        }
        return 0;
    },

    equipoConMasPuntos(): string {
        return this.tribus.reduce((prev, curr) => {
            return this.obtenerTotalPuntos(prev.nombre) > this.obtenerTotalPuntos(curr.nombre) ? prev : curr;
        }).nombre;
    },

    disciplinaConMayorPuntuacion() {
        return this.tribus.reduce((prev, curr) => {
            for (const disciplina in curr.puntos) {
                if (curr.puntos[disciplina] > (prev.puntos[disciplina] || 0)) {
                    prev = { disciplina, puntos: curr.puntos[disciplina] };
                }
            }
            return prev;
        }, { disciplina: '', puntos: 0 });
    }
};

const form = document.getElementById('puntosForm') as HTMLFormElement | null;
if (!form) {
    throw new Error("El formulario no se encontró.");
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const equipoSeleccionado = (document.getElementById('equipo') as HTMLSelectElement).value;
    const disciplinaSeleccionada = (document.getElementById('disciplina') as HTMLSelectElement).value as keyof Puntos;
    
    const puntosInput = (document.getElementById('puntos') as HTMLInputElement).value;
    const puntos = parseInt(puntosInput);
    if (isNaN(puntos)) {
        alert("Por favor, introduce un número válido.");
        return;
    }

    // Agregar puntos al equipo
    competencia.agregarPuntos(equipoSeleccionado, disciplinaSeleccionada, puntos);

    // Actualizar los resultados en la interfaz
    const totalTribuRoja = competencia.obtenerTotalPuntos("Tribu Roja");
    const totalTribuNegra = competencia.obtenerTotalPuntos("Tribu Negra");
    const equipoMayorPuntos = competencia.equipoConMasPuntos();
    const { disciplina, puntos: mayorPuntos } = competencia.disciplinaConMayorPuntuacion();

    const resultadoEquipoA = document.getElementById('resultadoEquipoA');
    const resultadoEquipoB = document.getElementById('resultadoEquipoB');
    const equipoMayor = document.getElementById('equipoMayor');
    const disciplinaMayor = document.getElementById('disciplinaMayor');

    if (resultadoEquipoA && resultadoEquipoB && equipoMayor && disciplinaMayor) {
        resultadoEquipoA.innerText = `Tribu Roja: ${totalTribuRoja} puntos`;
        resultadoEquipoB.innerText = `Tribu Negra: ${totalTribuNegra} puntos`;
        equipoMayor.innerText = `El equipo con más puntos en total es: ${equipoMayorPuntos}`;
        disciplinaMayor.innerText = `La disciplina con la mayor puntuación individual es: ${disciplina} con ${mayorPuntos} puntos.`;
    }
});
