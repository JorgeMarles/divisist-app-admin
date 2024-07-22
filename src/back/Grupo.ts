import Clase from "./Clase";

class Grupo{
    nombre?: string;
    profesor?: string;
    maximo?: number;
    disponible?: number;
    clases?: Clase[];

    apply = (data: any) => {
        this.nombre = data.nombre;
        this.profesor = data.profesor;
        this.maximo = data.maximo;
        this.disponible = data.disponible;
        this.clases = [];
        for(const claseAny of data.clases){
            const clase = new Clase();
            clase.apply(claseAny);
            this.clases.push(clase);
        }
    }

    toString = (): string => {
        return `${this.nombre} - ${this.profesor}`
    }
}

export default Grupo;