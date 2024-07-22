import { FC } from "react";
import MateriaInfoSelect from "./MateriaInfoSelect";
import { List } from "flowbite-react";
import Horario from "../back/Horario";
import Matricula from "../back/Matricula";


type ListaMateriasType = {
    horario: Horario,
    eliminarMateria: Function,
    asignarMatricula: Function
}

const ListaMaterias: FC<ListaMateriasType> = ({ horario, eliminarMateria, asignarMatricula }) => {   
     

    return <>
        <div className="p-2 overflow-auto h-full">
            <List unstyled className="max-w-full divide-y divide-gray-200 text-black mb-2">
                {
                    Object.entries(horario.getMatriculas()).map((entry: [string, Matricula]) => {
                        return <MateriaInfoSelect asignarMatricula={asignarMatricula} horario={horario} key={entry[0]}  matricula={entry[1]} eliminarMateria={()=>eliminarMateria(entry[1].materia!.codigo!)} />
                    })
                }
            </List>
        </div>
    </>
}

export default ListaMaterias;