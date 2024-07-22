import Dictionary from "./Dictionary";
import Grupo from "./Grupo";
import Pensum from "./Pensum";

class Materia{
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

    isValida = (): boolean => {
        const reg = /^(\d{7})$/g;
        const pensum: Pensum = new Pensum();
        pensum.init();
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