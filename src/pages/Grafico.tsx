import {useEffect, useMemo } from "react";
import { usePensum } from "./Base";
import '@xyflow/react/dist/style.css';
import '../assets/css/nodos.css'
import { useState, useCallback } from 'react';
import {
    ReactFlow,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Edge,
    type FitViewOptions,
    type OnConnect,
    type OnNodesChange,
    type OnEdgesChange,
    type DefaultEdgeOptions,
    Background,
    Controls,
    MiniMap,
} from '@xyflow/react';
import { getNodeList, MateriaDesbloqueo, MateriaNode } from "../back/graph/utilsNode";
import MateriaNodeTSX from "../back/graph/MateriaNodeTSX";
import Materia from "../back/Materia";


const materia: Materia = new Materia();
materia.codigo = '1155404';
materia.nombre = 'test';
materia.semestre = 1;
materia.creditos = 5;
materia.horas = 9;
const materiad: MateriaDesbloqueo = { ...materia, desbloqueos: ['1165532'] };

const initialNodes: MateriaNode[] = [
    { id: '1', data: { materia: materiad }, position: { x: 5, y: 5 }, draggable: true, selectable: true, connectable: false, type: 'materia' },
];

const initialEdges: Edge[] = [
    { id: '1155404-1155605', source: '1155404', target: '1155605', type: 'step', style: { stroke: "#FF0000" } },
    { id: 'e1-3', source: '1', target: '3', type: 'step', style: { stroke: "#00FF00" } }
];

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: false,
};



const Grafico = () => {
    const {pensum} = usePensum();
    const [nodes, setNodes] = useState<MateriaNode[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const nodeTypes = useMemo(() => ({ materia: MateriaNodeTSX }), []);


    useEffect(() => {
        pensum.init();
        const resultado = getNodeList(pensum);
        console.log(resultado);

        //pensum.buscarMateria('1155101')!
        setNodes(resultado.nodes)
        setEdges(resultado.edges);


    }, [])



    const onNodesChange: OnNodesChange<MateriaNode> = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges<MateriaNode>(changes, nds)),
        [setNodes],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <>
            <div>
                A continuación se muestra un gráfico con cada materia del pensum con grupos disponibles, así como flechas de todas las materias que desbloquea cada una (Las materias grises son electivas).
            </div>
            <div className="w-full  md:max-h-[450px] md:min-h-[450px] h-[450px] border-black border">
                <ReactFlow
                    defaultViewport={{x:200, y:200, zoom:0.2}}
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    fitViewOptions={fitViewOptions}
                    defaultEdgeOptions={defaultEdgeOptions}
                >

                    <Background />
                    {/*<MiniMap />*/}
                    <Controls />
                </ReactFlow>
            </div >
        </>
    );
}

export default Grafico;

