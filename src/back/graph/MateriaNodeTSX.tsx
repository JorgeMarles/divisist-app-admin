import { Handle, NodeProps, Position, Transform, useStore } from "@xyflow/react";
import { MateriaNode } from "./utilsNode";
import { FC } from "react";
import { Link } from "react-router-dom";

type TransformState = {
    transform: Transform
}

const zoomSelector = (s: TransformState) => s.transform[2] >= 0.7;

const MateriaNodeTSX: FC<NodeProps<MateriaNode>> = ({ data }) => {

    const mostrarTodo = useStore(zoomSelector)

    return (
        <div className={`nodo-materia ${ data.materia.isElectiva ? "electiva" : "obligatoria" }`}>
            <Handle
                type="target"
                position={Position.Left}
            />
            <div>
                {
                    mostrarTodo ?
                        <>
                            <Link to={`/materia/${data.materia.codigo}`} rel="noopener noreferrer">
                                <div className="font-bold underline text-blue-600">
                                    {data.materia.codigo}
                                </div>
                            </Link>
                            <div className="truncate w-full">
                                {data.materia.nombre}
                            </div>
                            <div>
                                Horas: {data.materia.horas} Creditos: {data.materia.creditos}
                            </div>
                        </> :
                        <div className="font-bold text-xl">
                            {data.materia.codigo}
                        </div>
                }
            </div>
            <Handle
                type="source"
                position={Position.Right}
            />

        </div>
    );
}

export default MateriaNodeTSX;