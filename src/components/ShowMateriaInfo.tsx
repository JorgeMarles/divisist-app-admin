import { FC } from "react";
import Materia, { getEstado } from "../back/Materia"
import Pensum from "../back/Pensum";
import Grupo from "../back/Grupo";
import { Accordion } from "flowbite-react";
import { Link } from "react-router-dom";


type ShowMateriaInfoType = {
    materia: Materia,
    pensum: Pensum
};

const ShowMateriaInfo: FC<ShowMateriaInfoType> = ({ materia, pensum }) => {

    const getInfoRequi = (requisito: string): string => {
        const reg = /^(\d{7})$/g;
        if (reg.test(requisito)) {

            const materia = pensum.buscarMateria(requisito);
            if (materia) {
                return materia.toString();
            } else {
                return ""
            }
        } else {
            const parteNum: number = parseInt(requisito.split(":")[1]);
            return `${parteNum} créditos aprobados.`
        }
    }

    return <>
        <div className="w-full p-2 md:w-[30%] md:max-h-[500px] md:h-[500px] h-[300px] overflow-auto bg-gray-100 flex flex-col items-center justify-around">
            {
                materia.codigo ?
                    <>
                        <Link to={`/materia/${materia.codigo}`}>
                            <div className="font-bold text-xl w-full text-center">
                                <div>
                                    {materia.nombre}
                                </div>
                                <div className="text-lg">
                                    {materia.codigo}
                                </div>
                            </div>
                        </Link>
                        <div className="w-full flex flex-col items-center">
                            <div className="flex justify-between w-1/2">
                                <div className="font-semibold">
                                    Semestre:
                                </div>
                                <div>
                                    {materia.semestre}
                                </div>
                            </div>
                            <div className="flex justify-between w-1/2">
                                <div className="font-semibold">
                                    Creditos:
                                </div>
                                <div>
                                    {materia.creditos}
                                </div>
                            </div>
                            <div className="flex justify-between w-1/2">
                                <div className="font-semibold">
                                    Horas semanales:
                                </div>
                                <div>
                                    {materia.horas}
                                </div>
                            </div>
                            <div className="flex justify-between w-1/2">
                                <div className="font-semibold">
                                    Es electiva?
                                </div>
                                <div>
                                    {materia.isElectiva ? "Sí" : "No"}
                                </div>
                            </div>
                            <div className="flex justify-between w-1/2">
                                <div className="font-semibold">
                                    Estado de la materia
                                </div>
                                <div>
                                    {getEstado(materia.estado!)}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center">
                            {
                                materia.requisitos!.length > 0 ?
                                    <>
                                        <div className="font-semibold">Requisitos</div>
                                        {
                                            materia.requisitos!.map((el: string) => {
                                                return <div key={"requi" + el}>{getInfoRequi(el)}</div>
                                            })
                                        }
                                    </>
                                    : <></>
                            }
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="font-semibold">Grupos Disponibles</div>
                            {
                                Object.entries(materia.grupos!).length > 0 ?
                                    <>
                                        <Accordion className="w-full bg-slate-300" collapseAll>
                                            {Object.entries(materia.grupos!).sort((a, b) => a[0].localeCompare(b[0])).map(([_, grupo]: [string, Grupo]) => {
                                                const contenido = <Accordion.Panel key={"codigo_grupo_" + _}>
                                                    <Accordion.Title className="bg-red-500 focus:bg-red-500 focus:ring-0 text-white hover:bg-red-600">
                                                        {grupo.toString()}
                                                    </Accordion.Title>
                                                    <Accordion.Content className="px-0" >
                                                        <table className="w-full">
                                                            <tbody>
                                                                <tr>
                                                                    <th className="w-[40%]">
                                                                        Profesor
                                                                    </th>
                                                                    <td className="text-center">
                                                                        {grupo.profesor}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="w-[40%]">
                                                                        Cupos disponibles
                                                                    </th>
                                                                    <td className="text-center">
                                                                        {grupo.disponible}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="w-[40%]">
                                                                        Cupos totales
                                                                    </th>
                                                                    <td className="text-center">
                                                                        {grupo.maximo}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="w-[40%]">
                                                                        Clases
                                                                    </th>
                                                                    <td className="text-center">
                                                                        <ul>
                                                                            {
                                                                                grupo.clases!.map((el) => {
                                                                                    return <li key={"grupo_" + grupo.nombre + "_clase_" + el.toString()}>{el.toString()}</li>
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </Accordion.Content>
                                                </Accordion.Panel>;

                                                return contenido
                                            })}
                                        </Accordion>
                                    </> :
                                    <>
                                        <div className="w-full text-center">No hay grupos disponibles para la materia</div>
                                    </>
                            }
                        </div>
                    </>
                    :
                    <></>
            }

        </div>
    </>
}

export default ShowMateriaInfo;