import Dictionary from './Dictionary';
import Materia from './Materia';
import data from './pensum.json';

type MateriaJSONDict = {
    [key: string]: {
        semestre: number;
        codigo: string;
        nombre: string;
        horas: number;
        creditos: number;
        requisitos: string[];
        isElectiva: boolean;
        grupos: {
            [key: string]: {
                nombre: string;
                profesor: string;
                maximo: number;
                disponible: number;
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

    init = () =>{        

        const materias: MateriaJSONDict = data.materias;

        for(const materia in materias){
            
            this.materias[materia] = new Materia();
            this.materias[materia].apply(materias[materia])
        }
                
    }
}

export default Pensum;