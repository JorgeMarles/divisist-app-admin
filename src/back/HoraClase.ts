import Grupo from "./Grupo";
import Materia from "./Materia"

type HoraClase = {
    materia?: Materia;
    grupo?: Grupo;
    salon?: string;
    color?: string;
}

export default HoraClase;