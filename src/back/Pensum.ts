import Dictionary from './Dictionary';
import { GrupoState } from './Grupo';
import Materia, { MateriaState } from './Materia';

type MateriaJSONDict = {
    [key: string]: {
        semestre: number;
        codigo: string;
        nombre: string;
        horas: number;
        creditos: number;
        requisitos: string[];
        isElectiva: boolean;
        carrera: string;
        estado: MateriaState;
        grupos: {
            [key: string]: {
                nombre: string;
                profesor: string;
                maximo: number;
                disponible: number;
                estado: GrupoState;
                clases: {
                    dia: number;
                    horaInicio: number;
                    horaFin: number;
                    salon: string;
                }[];
            }
        };
    }
}


class Pensum {
    materias: Dictionary<Materia>;
    codigo: string = "";
    fechaCaptura: Date = new Date();
    nombre: string = "";

    constructor(){
        this.materias = {};
    }

    buscarMateria = (codigo: string) => {
        if(codigo in this.materias){
            return this.materias[codigo];
        }
        return undefined;
    }

    getMateriasPorSemestre = (): Materia[][] => {
        const arreglo: Materia[] = Object.entries(this.materias).sort(([_, materia1], [__, materia2])=>{
            return materia1.semestre! - materia2.semestre!;
        }).map(el => el[1]);        
        const matriz: Materia[][] = [];
        let semestre: Materia[] = [];
        let anteriorSem: number = 0;
        for(const materia of arreglo){
            if(materia.semestre !== anteriorSem && semestre.length > 0){
                matriz.push([...semestre]);
                semestre = [];
            }
            semestre.push(materia);
            anteriorSem = materia.semestre!;
        }
        matriz.push([...semestre]);
        return matriz;
    }

    static getPensum = async(): Promise<Pensum> => {
        const pensum: Pensum = new Pensum();
        await pensum.init();
        return pensum;
    }

    init = async (): Promise<void> =>{        

        //const materias: MateriaJSONDict = data.materias;

        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/materias/pensum/115`, {
            method: "GET"
        })

        const data = await response.json();

        const materias: MateriaJSONDict = data.materias;

        this.codigo = data.codigo;
        this.nombre = data.nombre;
        this.fechaCaptura = new Date(data.fechaCaptura);        

        for(const materia in materias){
            
            this.materias[materia] = new Materia();
            this.materias[materia].apply(materias[materia])
        }
                
    }
}

export default Pensum;