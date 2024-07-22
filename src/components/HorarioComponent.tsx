import { FC } from "react";
import Horario from "../back/Horario";
import { Table, TableCell, TableHeadCell, TableRow } from "flowbite-react";
import HoraClase from "../back/HoraClase";
import MateriaHorarioTabla from "./MateriaHorarioTabla";

type HorarioComponentType = {
    horario: Horario
}

const HorarioComponent: FC<HorarioComponentType> = ({ horario }) => {    
    const dias = ["","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]

    const getHora = (idx: number) => {
        return `${(idx+6).toString().padStart(2,"0")}:00 - ${(idx+7).toString().padStart(2,"0")}:00`
    }

    return <>
        <div className="w-full md:w-[70%] overflow-auto">
            <Table className="rounded-none" border={2}>
                <Table.Head className="sticky">
                    {dias.map((el) => <TableHeadCell key={"dia"+el} className="text-center bg-slate-400">
                        {el}
                    </TableHeadCell>)}
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        horario.horarioClase.map((el: HoraClase[], i: number) => {
                            return <TableRow key={i + "rowrow"} className="rounded-none divide-x">
                                <TableCell className="text-center p-1 bg-slate-300">
                                    {
                                        getHora(i)
                                    }
                                </TableCell>
                                {
                                    el.map((el2: HoraClase, j: number) => {
                                        return <MateriaHorarioTabla key={(i * 6 + j) + "celcel"} horaClase={el2} />
                                    })
                                }
                            </TableRow>
                        })
                    }
                </Table.Body>
            </Table>

        </div>
    </>
}

export default HorarioComponent;