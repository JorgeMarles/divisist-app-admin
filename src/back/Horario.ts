import Dictionary from "./Dictionary";
import Grupo from "./Grupo";
import HoraClase from "./HoraClase";
import Materia from "./Materia";
import Matricula from "./Matricula";

const colors: string[] = [
    "#FFB6C1", //Rosa Suave
    "#ADD8E6", //Celeste Claro
    "#98FB98", //Verde Menta
    "#E6E6FA", //Lila Pálido
    "#FFFFE0", //Amarillo Pálido
    "#FFE4B5", //Melocotón Claro
    "#B0E0E6", //Azul Bebé
    "#DCD0FF", //Lavanda Suave
    "#9ACD32", //Verde Pistacho
    "#FDFD96" //Amarillo Vainilla
];

class Horario {
    horario: string[][];
    horarioClase: HoraClase[][]; 
    materiasMatriculadas?: Dictionary<Matricula>;
    coloresMateriasUsed?: boolean[];
    coloresMaterias?: Dictionary<number>;
    sumaCreditos: number = 0;

    constructor() {
        this.horario = [];
        for(let i = 0; i < 6; ++i){
            const x: string[] = []
            for(let j = 0; j < 16; ++j){
                x.push('')
            }
            this.horario.push(x)
        }        
        this.horarioClase = [];
        for(let i = 0; i < 16; ++i){
            const x: HoraClase[] = [];
            for(let j = 0; j < 6; ++j){
                x.push({});
            }
            this.horarioClase.push(x);
        }
        this.coloresMateriasUsed = Array<boolean>(10).fill(false);
        this.coloresMaterias = {};
        this.materiasMatriculadas = {}        
    }

    apply = (data: any): void =>{
        this.horario = data.horario;
        this.horarioClase = data.horarioClase;
        this.coloresMaterias = data.coloresMaterias;
        this.coloresMateriasUsed = data.coloresMateriasUsed;
        this.sumaCreditos = data.sumaCreditos;
        for(const materia in data.materiasMatriculadas){
            this.materiasMatriculadas![materia] = new Matricula();
            this.materiasMatriculadas![materia].apply(data.materiasMatriculadas![materia])
        }
    }

    from = (horario: Horario): void => {        
        this.horario = horario.horario;
        this.materiasMatriculadas = horario.materiasMatriculadas
        this.horarioClase = horario.horarioClase;
        this.coloresMaterias = horario.coloresMaterias;
        this.coloresMateriasUsed = horario.coloresMateriasUsed;
        this.sumaCreditos = horario.sumaCreditos;
    }

    getMatriculas = (): Dictionary<Matricula> => {        
        return this.materiasMatriculadas!;
    }

    grupoValido = (grupo: Grupo, materia: Materia): string => {
        for (const clase of grupo.clases!) {
            for (let i = clase.horaInicio!; i < clase.horaFin!; ++i) {
                if (this.horario[clase.dia!][i] !== '' && this.horario[clase.dia!][i] !== materia.codigo){                    
                    return this.horario[clase.dia!][i];
                }
            }
        }
        return '';
    }

    asignarGrupo = (grupo: Grupo, materia: Materia): void => {
        for (const clase of grupo.clases!) {  
            for (let i = clase.horaInicio!; i < clase.horaFin!; ++i) {                
                this.horario[clase.dia!][i] = materia.codigo!;
                this.horarioClase[i][clase.dia!] = {grupo: grupo, materia: materia, salon: clase.salon, color: colors[this.coloresMaterias![materia.codigo!]]}
            }
        }        
    }

    getNewColor = (codMateria: string): void => {
        for(let i = 0; i < colors.length; ++i){
            if(!this.coloresMateriasUsed![i]){
                this.coloresMateriasUsed![i] = true;
                this.coloresMaterias![codMateria] = i;
                return;
            }
        }
        throw "Todos los colores ocupados"
    }

    liberarColor = (codMateria: string): void => {
        const idx: number = this.coloresMaterias![codMateria]!;
        this.coloresMateriasUsed![idx] = false;
    }

    desAsignarGrupo = (grupo: Grupo): void => {
        for (const clase of grupo.clases!) {
            for (let i = clase.horaInicio!; i < clase.horaFin!; ++i) {
                this.horario[clase.dia!][i] = '';
                this.horarioClase[i][clase.dia!] = {};
            }
        }
    }

    eliminarMateria = (materia: Materia): void => {
        if (materia.codigo! in this.materiasMatriculadas!) {
            const materiaObj: Materia = this.materiasMatriculadas![materia.codigo!].materia!;
            this.liberarColor(materia.codigo!);
            this.desAsignarGrupo(materiaObj.grupos![this.materiasMatriculadas![materia.codigo!].codigoGrupo!])
            this.sumaCreditos -= materia.creditos!;
            delete this.materiasMatriculadas![materia.codigo!];
        }
    }

    asignarMatricula = (matricula: Matricula): void => {
         
        if(!(matricula.materia!.codigo! in this.materiasMatriculadas!)){
            throw `La materia ${matricula.materia!.codigo!} no está matriculada`
        }
        if(!(matricula.codigoGrupo! in matricula.materia!.grupos!)){
            throw `El grupo ${matricula.codigoGrupo!} no pertenece a la materia ${matricula.materia!.codigo!}`
        }

        const codigoMateria: string = matricula.materia!.codigo!;
        const codigoGrupoViejo: string = this.materiasMatriculadas![codigoMateria].codigoGrupo!;
        const codigoGrupoNuevo: string = matricula.codigoGrupo!;
        
        if(this.grupoValido(this.materiasMatriculadas![codigoMateria].materia!.grupos![codigoGrupoNuevo], this.materiasMatriculadas![codigoMateria].materia!) !== ''){
            throw `El grupo ${matricula.codigoGrupo!} esta en conflicto con , no se puede matricular`
        }

        this.desAsignarGrupo(this.materiasMatriculadas![codigoMateria].materia!.grupos![codigoGrupoViejo]);
        this.asignarGrupo(this.materiasMatriculadas![codigoMateria].materia!.grupos![codigoGrupoNuevo], this.materiasMatriculadas![codigoMateria].materia!)
        this.materiasMatriculadas![codigoMateria] = matricula;        
    }

    asignarMateria = (materia: Materia): void => {        
        if(materia.codigo! in this.materiasMatriculadas!){
            throw "Materia ya matriculada"
        }
        for (const grupoCodigo in materia.grupos!) {
            const grupo = materia.grupos[grupoCodigo];
            console.log("Intentando grupo "+grupo.nombre);
            
            if (this.grupoValido(grupo, materia) === '') {
                this.getNewColor(materia.codigo!);
                this.asignarGrupo(grupo, materia);
                const matri = new Matricula();
                matri.codigoGrupo = grupo.nombre;
                matri.materia = materia;
                this.materiasMatriculadas![materia.codigo!] = matri;
                this.sumaCreditos += materia.creditos!;
                //console.log(this.horario.map(el => el.map(el2 => el2 ? "1" : "0").join("")).join("\n"));
                return;
            }
        }
        throw "No se encontraron grupos validos para la materia "+materia.codigo
    }

    toString= (): string => {
        return Object.entries(this.materiasMatriculadas!).map(el => el[1].codigoGrupo).join(",")
    }

    getMateriasListAsString = (): string => {
        const listaMaterias: string[] = []
        for(const matriculaCod in this.materiasMatriculadas){
            const matricula: Matricula = this.materiasMatriculadas[matriculaCod];
            listaMaterias.push(matricula.materia!.codigo!+"->"+matricula.codigoGrupo!)
        }
        return listaMaterias.join("\n")
    }

}

export default Horario;