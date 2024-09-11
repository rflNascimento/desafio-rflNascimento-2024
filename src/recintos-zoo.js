let recintos = [
    { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "MACACO", quantidade: 3 }] },
    { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "GAZELA", quantidade: 1 }] },
    { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "LEAO", quantidade: 1 }] }
];

let especies = {
    "LEAO": { tamanho: 3, bioma: ["savana"] },
    "LEOPARDO": { tamanho: 2, bioma: ["savana"] },
    "CROCODILO": { tamanho: 3, bioma: ["rio"] },
    "MACACO": { tamanho: 1, bioma: ["savana", "floresta"] },
    "GAZELA": { tamanho: 2, bioma: ["savana"] },
    "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"] }
};

function analisaRecintos(animal, quantidade) {
    if (!especies[animal]) return { erro: "Animal inválido", recintosViaveis: null };
    if (quantidade <= 0) return { erro: "Quantidade inválida", recintosViaveis: null };

    let tamanhoAnimal = especies[animal].tamanho;

    let recintosViaveis = recintos
        .filter(r => especies[animal].bioma.some(b => r.bioma.includes(b)))
        .map(r => {
            let espacoOcupado = r.animaisExistentes.reduce((total, { especie, quantidade }) => total + especies[especie].tamanho * quantidade, 0);
            let espacoLivre = r.tamanhoTotal - espacoOcupado - (r.animaisExistentes.length ? 1 : 0);
            return { ...r, espacoLivre };
        })
        .filter(r => verificaEspaco(r, tamanhoAnimal, quantidade, animal))
        .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre - tamanhoAnimal * quantidade} total: ${r.tamanhoTotal})`);

    return recintosViaveis.length ? { erro: null, recintosViaveis } : { erro: "Não há recinto viável", recintosViaveis: null };
}

function verificaEspaco(r, tamanhoAnimal, quantidade, animal) {
    let ehCarnivoro = ["LEAO", "LEOPARDO", "CROCODILO"].includes(animal);
    let macacoSozinho = animal === "MACACO" && quantidade < 2 && r.animaisExistentes.length === 0;
    if (ehCarnivoro && r.animaisExistentes.length > 0) return false;
    if (macacoSozinho) return false;
    return r.espacoLivre >= tamanhoAnimal * quantidade;
}

function RecintosZoo() {
    this.analisaRecintos = analisaRecintos;
}

export { RecintosZoo as RecintosZoo };

