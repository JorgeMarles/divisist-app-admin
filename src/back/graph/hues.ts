
/**
 * Hues aleatoriamente distribuidos en base a la proporción aúrea
 */
const hues: number[] = [266.4061407205984,
    128.89837667056048,
    351.3906126205227,
    213.88284857048484,
    76.37508452044699,
    298.86732047040914,
    161.35955642037132,
    23.851792370333484,
    246.34402832029565,
    108.83626427025781,
    331.32850022022,
    193.82073617018216,
    56.31297212014431,
    278.80520807010646,
    141.29744402006864,
    3.7896799700308037,
    226.28191591999297];


/**
 * Genera n hues aleatorios, igualmente distribuidos y mezclados
 * @param n Cantidad de hues a generar
 * @returns un arreglo de hues con valores entre [0,360)
 */
export const generarHues = (n: number): number[] => {
    let h: number = Math.random();
    const PHI = (1 + Math.sqrt(5)) / 2;
    return Array.from({ length: n }, () => {
        h += PHI;
        h %= 1;
        return h * 360
    });
};

/**
 * Guarda un arreglo de numeros
 * @param hues arreglo de numeros
 * @returns un string representando el arreglo
 */
export const guardarHues = (hues: number[]): string => {
    let ini = "const hues: number[] = [";
    ini = ini + hues.join(",\n")
    return ini + "];"
}

/**
 * Mezcla de manera aleatoria un array de numeros
 * @param array el array a mezclar
 * @returns un array
 */
export const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default hues;