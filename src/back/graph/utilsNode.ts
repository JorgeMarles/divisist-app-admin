import { Edge, MarkerType, Node } from "@xyflow/react";
import Pensum from "../Pensum";
import Materia from "../Materia";
import Dictionary from "../Dictionary";
import hues from "./hues";

export type MateriaDesbloqueo = Materia & {
    desbloqueos: string[];
}

const procesarPensum = (materias: Dictionary<Materia>): Dictionary<MateriaDesbloqueo> => {
    const materiasDesb: Dictionary<MateriaDesbloqueo> = {};
    for (const codigoMateria in materias) {
        materiasDesb[codigoMateria] = { ...materias[codigoMateria], desbloqueos: [] };
    }
    for (const codigoMateria in materias) {
        const materia: Materia = materias[codigoMateria];

        for (const requi of materia.requisitos!) {
            if (requi in materias) {
                materiasDesb[requi].desbloqueos.push(codigoMateria);
            }
        }
    }
    return materiasDesb;
}

export type MateriaNode = Node<{
    materia: MateriaDesbloqueo
}, 'materia'>

type ContextoEjecucion = {
    materiasDesb: Dictionary<MateriaDesbloqueo>,
    materiasProcesadas: Set<string>,
    matrizSemestre: MateriaDesbloqueo[][],
    aristas: EdgeGrafo[],
    colores: MapaColor,
}

type EdgeGrafo = {
    inicio: string,
    final: string,
    color: number
}

class MapaColor {
    colores: number = 0;
    nuevo(): number {
        return this.colores++;
    }
}

type ReturnNodesOfPensum = {
    matrizSemestre: MateriaDesbloqueo[][];
    colores: MapaColor;
    aristas: EdgeGrafo[]
}

export const nodesOfPensum = (pensum: Pensum): ReturnNodesOfPensum => {
    const materiasDesb: Dictionary<MateriaDesbloqueo> = procesarPensum(pensum.materias);
    const materiasPorSemestre: Materia[][] = pensum.getMateriasPorSemestre();
    const materiasProcesadas: Set<string> = new Set();
    const matrizSemestre: MateriaDesbloqueo[][] = Array<MateriaDesbloqueo[]>(10).map(() => [])
    const aristas: EdgeGrafo[] = [];
    const colores: MapaColor = new MapaColor();

    const context: ContextoEjecucion = {
        materiasDesb: materiasDesb,
        materiasProcesadas: materiasProcesadas,
        matrizSemestre: matrizSemestre,
        aristas: aristas,
        colores: colores
    }

    for (const semestre of materiasPorSemestre) {
        for (const materia of semestre) {
            const codigo: string = materia.codigo!;
            procesarMateria(materiasDesb[codigo], context, 0, context.colores.nuevo());
        }
    }

    return {
        aristas: aristas,
        colores: colores,
        matrizSemestre: matrizSemestre
    }
}

const procesarMateria = (materia: MateriaDesbloqueo, contexto: ContextoEjecucion, depth: number, colorPadre: number): void => {
    if (contexto.materiasProcesadas.has(materia.codigo!)) return;
    contexto.materiasProcesadas.add(materia.codigo!)
    if (!contexto.matrizSemestre[materia.semestre! - 1]) {
        contexto.matrizSemestre[materia.semestre! - 1] = []
    }
    if (Object.keys(materia.grupos!).length === 0) return;
    contexto.matrizSemestre[materia.semestre! - 1].push(materia);
    let primerColor: number = 0;
    for (const desbloqueo of materia.desbloqueos) {
        const materiaDesbloqueada: MateriaDesbloqueo = contexto.materiasDesb[desbloqueo];
        const esFin = esFinDeLinea(materiaDesbloqueada, contexto);
        //console.log("   ".repeat(depth),desbloqueo,"es fin?",esFin);
        if (true) {
            primerColor++;
        }
        const color = esFin ? colorPadre : (primerColor === 1 ? colorPadre : contexto.colores.nuevo())
        contexto.aristas.push({
            color: color,
            final: desbloqueo,
            inicio: materia.codigo!
        });
        procesarMateria(materiaDesbloqueada, contexto, depth + 1, color);
    }
}

const esFinDeLinea = (materia: MateriaDesbloqueo, contexto: ContextoEjecucion): boolean => {
    if (materia.isElectiva!) return true;
    let ok: boolean = true;
    for (const materiaD of materia.desbloqueos) {
        ok = ok && contexto.materiasDesb[materiaD].isElectiva!;
    }
    return ok;
}

type ReactFlowReturn = {
    nodes: MateriaNode[],
    edges: Edge[]
}

export const getNodeList = (pensum: Pensum): ReactFlowReturn => {

    const nodosProcesados: ReturnNodesOfPensum = nodesOfPensum(pensum);
    const nodos: MateriaNode[] = [];
    const aristas: Edge[] = [];
    let posX: number = 0;
    let posY: number = 0;
    let even: boolean = true;
    let even2: boolean = true;
    console.log(nodosProcesados.aristas, nodosProcesados.colores);

    for (const semestre of nodosProcesados.matrizSemestre) {
        for (const materia of semestre) {
            nodos.push({
                id: materia.codigo!,
                position: {
                    x: posX + (even2 ? 0 : 0),
                    y: posY
                },
                data: {
                    materia: materia
                },
                draggable: true,
                selectable: true,
                connectable: false,
                type: 'materia'
            })
            even2 = !even2;
            posY += 60;
        }

        even = !even;


        posX += 150;
        posY = even ? 0 : 0;
    }

    const ids: Map<number, string> = new Map();

    for (const arista of nodosProcesados.aristas) {
        ids.set(arista.color, '');
    }

    console.log(ids.size, "diferentes colores");


    
    const s: number = 99;
    const v: number = 50;
    
    let i: number = 0;
    /*
    const hues = generarHues(ids.size);
    console.log(guardarHues(hues));
    */
    for (const color of ids) {
        const colorHSL = `hsl(${hues[i++]} ${s}% ${v}%)`;
        ids.set(color[0], colorHSL)
        console.log(colorHSL);
    }

    for (const arista of nodosProcesados.aristas) {
        aristas.push(
            {
                id: `${arista.inicio}-${arista.final}`,
                source: arista.inicio,
                target: arista.final,
                type: 'straight',
                style: { stroke: ids.get(arista.color) },
                markerEnd: { type: MarkerType.ArrowClosed, color: ids.get(arista.color) }
            }
        )
    }
    return {
        nodes: nodos,
        edges: aristas
    }
}

