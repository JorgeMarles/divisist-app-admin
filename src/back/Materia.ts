import Dictionary from "./Dictionary";
import Grupo from "./Grupo";
import Pensum from "./Pensum";



export enum MateriaState {
    CREATED, DELETED, NOT_CHANGED
}

export const getEstado = (estado: MateriaState): string => {
    if(estado === MateriaState.NOT_CHANGED)return "Igual";
    if(estado === MateriaState.CREATED)return "Nueva Materia";
    if(estado === MateriaState.DELETED)return "Materia Eliminada";
    else return estado
}

class Materia{
    estado?: MateriaState;
    carrera?: string;
    semestre?: number;
    codigo?: string;
    nombre?: string;
    horas?: number;
    creditos?: number;
    requisitos?: string[];
    isElectiva?: boolean;
    grupos?: Dictionary<Grupo>;
    nombreCodigo?: string;

    apply = (data: any) => {
        
        this.semestre = data.semestre;
        this.codigo = data.codigo;
        this.nombre = data.nombre;
        this.horas = data.horas;
        this.creditos = data.creditos;
        this.requisitos = data.requisitos;
        this.isElectiva = data.isElectiva;
        this.carrera = data.carrera;
        this.estado = data.estado;
        this.grupos = {};
        for(const grupo in data.grupos){
            this.grupos[grupo] = new Grupo();
            this.grupos[grupo].apply(data.grupos[grupo]);
        }
        this.nombreCodigo = `${this.codigo} - ${this.nombre}`;
    }

    hasGrupo = (codigoGrupo: string): boolean => {
        return codigoGrupo in this.grupos!;
    }

    toString = (): string => {
        return `${this.codigo} - ${this.nombre}`
    }

    isValida = (pensum: Pensum): boolean => {
        const reg = /^(\d{7})$/g;
        for(const req of this.requisitos!){
            if(reg.test(req)){
                if(!pensum.buscarMateria(req)){
                    return false;
                }
            }
        }
        return true;
    }

}

export default Materia;