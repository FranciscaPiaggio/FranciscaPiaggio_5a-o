interface Puntuacion {
    puntos: number;
}

let tribuRoja: Puntuacion = { puntos: 0 };
let tribuNegra: Puntuacion = { puntos: 0 };

const tribuSelect = document.getElementById('tribu') as HTMLSelectElement;
const disciplinaSelect = document.getElementById('disciplina') as HTMLSelectElement;
const puntosInput = document.getElementById('puntos') as HTMLInputElement;

const resultadoTribuRoja = document.getElementById('resultadoTribuRoja') as HTMLElement;
const resultadoTribuNegra = document.getElementById('resultadoTribuNegra') as HTMLElement;
const tribuMayorOutput = document.getElementById('TribuMayor') as HTMLElement;
const disciplinaMayorOutput = document.getElementById('disciplinaMayor') as HTMLElement;
const de = 0;
let puntuacionesDisciplina = {
    handball: 0,
    resistencia: 0,
    ajedrez: 0
};

document.getElementById('puntosForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    agregarPuntos();
    mostrarResultados();
});

function agregarPuntos() {
    const tribu = tribuSelect.value;
    const disciplina = disciplinaSelect.value;
    const puntos = parseInt(puntosInput.value);

    if (tribu === 'Tribu Roja') {
        tribuRoja.puntos += puntos;
    } else if (tribu === 'Tribu Negra') {
        tribuNegra.puntos += puntos;
    }

    if (disciplina in puntuacionesDisciplina) {  
        puntuacionesDisciplina[disciplina as keyof typeof puntuacionesDisciplina] += puntos;
    } else {
        console.error('Disciplina ' + disciplina + ' no válida.');
    }
}

function mostrarResultados() {
    resultadoTribuRoja.textContent = `Tribu Roja: ${tribuRoja.puntos} puntos`;
    resultadoTribuNegra.textContent = `Tribu Negra: ${tribuNegra.puntos} puntos`;

    if (tribuRoja.puntos > tribuNegra.puntos) {
        tribuMayorOutput.textContent = 'La tribu con más puntos es: Roja';
    } else if (tribuNegra.puntos > tribuRoja.puntos) {
        tribuMayorOutput.textContent = 'La tribu con más puntos es: Negra';
    } else {
        tribuMayorOutput.textContent = 'Ambas tribus tienen la misma cantidad de puntos';
    }

    let disciplinaMayor = Object.keys(puntuacionesDisciplina).reduce((a, b) =>
        puntuacionesDisciplina[a as keyof typeof puntuacionesDisciplina] > puntuacionesDisciplina[b as keyof typeof puntuacionesDisciplina] ? a : b
    );
    disciplinaMayorOutput.textContent = 'Disciplina con más puntos: ' + disciplinaMayor;
}
