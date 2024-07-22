import { FC } from "react"
import HoraClase from "../back/HoraClase"
import { TableCell } from "flowbite-react"

type MateriaHorarioTablaType = {
    horaClase: HoraClase
}



const MateriaHorarioTabla: FC<MateriaHorarioTablaType> = ({ horaClase }) => {

    

    return <TableCell className={`rounded-none max-w-[180px] truncate p-1 text-center text-black`} style={{backgroundColor: horaClase.color ?? "white"}}>
        {
            horaClase.salon ? 
            <>
                <div className={`justify-center truncate text-center font-bold`}>
                    {horaClase.materia?.nombre}
                </div>
                <div className="flex justify-center text-center">
                    {horaClase.grupo?.nombre}
                </div>
                <div className="flex justify-center text-center">
                    {horaClase.salon}
                </div>
            </> 
            : 
            "-"
        }
    </TableCell>
}

export default MateriaHorarioTabla;