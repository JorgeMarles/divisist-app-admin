import { FC, useEffect } from "react";
import Materia from "../back/Materia";
import { Table, TableRow } from "flowbite-react";
import Pensum from "../back/Pensum";


type PensumComponentType = {
    materias: Materia[][],
    setMateria: Function,
    pensum: Pensum
};

const PensumComponent: FC<PensumComponentType> = ({ materias, setMateria, pensum }) => {

useEffect(()=>{
    console.log(materias);
    
},[])

    return <>
        <div className="w-full md:w-[70%] overflow-auto">
            <Table className="rounded-none bg-white" border={2}>
                <Table.Body className="divide-y">
                    {
                        materias.map((semestre, i) => {

                            return <TableRow key={"semestre " + i} className="divide-x">
                                <Table.Cell className="uppercase font-bold text-center bg-slate-300">
                                    Semestre {i + 1}
                                </Table.Cell>
                                {
                                    semestre.map(materia => {
                                        const contenido: JSX.Element = <Table.Cell onClick={()=>setMateria(materia)} key={materia.codigo} className="text-center bg-white hover:bg-slate-200">
                                            <div className="font-semibold">{materia.nombre}</div>
                                            <div>{materia.codigo}</div>
                                            <div>{materia.creditos} créditos</div>
                                        </Table.Cell>
                                        return materia.isValida(pensum) ? contenido : <></>;
                                    }).filter(el => el !== <></>)
                                }
                                <Table.Cell />
                            </TableRow>
                        })
                    }
                </Table.Body>
            </Table>
        </div>
    </>
}

export default PensumComponent;