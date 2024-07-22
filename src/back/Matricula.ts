import Materia from "./Materia";

class Matricula {
    materia?: Materia;
    codigoGrupo?: string;

    apply = (data: any): void => {
        this.materia = new Materia();
        this.materia.apply(data.materia!);
        this.codigoGrupo = data.codigoGrupo;
    }
}

export default Matricula;