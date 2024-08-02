import Clase from "./Clase";

export enum GrupoState {
    NOT_CHANGED, CHANGED, CREATED, DELETED
}

const getEstado = (estado: GrupoState): string => {
    if(estado === GrupoState.DELETED)return "(Grupo Eliminado)";
    else return ""
}

class Grupo{
    nombre?: string;
    profesor?: string;
    maximo?: number;
    disponible?: number;
    clases?: Clase[];
    estado?: GrupoState;

    apply = (data: any) => {
        this.nombre = data.nombre;
        this.profesor = data.profesor;
        this.maximo = data.maximo;
        this.disponible = data.disponible;
        this.clases = [];
        this.estado = data.estado;
        
        for(const claseAny of data.clases){
            const clase = new Clase();
            clase.apply(claseAny);
            this.clases.push(clase);
        }
    }

    toString = (): string => {
        return `${this.nombre} - ${this.profesor} ${getEstado(this.estado!)}`
    }
}

export default Grupo;