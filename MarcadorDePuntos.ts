// Almacenar la competencia
const equipoA: Equipo = { nombre: "Equipo A", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } };
const equipoB: Equipo = { nombre: "Equipo B", puntos: { handball: 0, resistencia: 0, ajedrez: 0 } };

const competencia = new Competencia(equipoA, equipoB);

// Manejar el envío del formulario
const form = document.getElementById('puntosForm') as HTMLFormElement | null;
if (!form) {
    throw new Error("El formulario no se encontró.");
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const equipoSeleccionado = (document.getElementById('equipo') as HTMLSelectElement).value;
    const disciplinaSeleccionada = (document.getElementById('disciplina') as HTMLSelectElement).value as keyof Equipo['puntos'];
    
    const puntosInput = (document.getElementById('puntos') as HTMLInputElement).value;
    const puntos = parseInt(puntosInput);
    if (isNaN(puntos)) {
        alert("Por favor, introduce un número válido.");
        return;
    }

    // Agregar puntos al equipo
    competencia.agregarPuntos(equipoSeleccionado, disciplinaSeleccionada, puntos);

    // Actualizar los resultados en la interfaz
    const totalA = competencia.obtenerTotalPuntos("Equipo A");
    const totalB = competencia.obtenerTotalPuntos("Equipo B");
    const equipoMayorPuntos = competencia.equipoConMasPuntos();
    const { disciplina, puntos: mayorPuntos } = competencia.disciplinaConMayorPuntuacion();

    const resultadoEquipoA = document.getElementById('resultadoEquipoA');
    const resultadoEquipoB = document.getElementById('resultadoEquipoB');
    const equipoMayor = document.getElementById('equipoMayor');
    const disciplinaMayor = document.getElementById('disciplinaMayor');

    if (resultadoEquipoA && resultadoEquipoB && equipoMayor && disciplinaMayor) {
        resultadoEquipoA.innerText = `Equipo A: ${totalA} puntos`;
        resultadoEquipoB.innerText = `Equipo B: ${totalB} puntos`;
        equipoMayor.innerText = `El equipo con más puntos en total es: ${equipoMayorPuntos}`;
        disciplinaMayor.innerText = `La disciplina con la mayor puntuación individual es: ${disciplina} con ${mayorPuntos} puntos.`;
    }
});
