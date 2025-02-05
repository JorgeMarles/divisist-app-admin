import { useState, useEffect } from "react";
import Materia from "../back/Materia";
import PensumComponent from "../components/PensumComponent";
import ShowMateriaInfo from "../components/ShowMateriaInfo";
import { usePensum } from "./Base";



const PensumTSX =  () => {
    const {pensum} = usePensum();
    const [pensumX, setPensumX] = useState<Materia[][]>([]);
    const [materia, setMateria] = useState<Materia>(new Materia());


    useEffect(() => {
        const x: Materia[][] = pensum.getMateriasPorSemestre();
        console.log(x);
        
        setPensumX(x);
    }, [])

    return <>
        <div className="flex w-full flex-col-reverse md:flex-row md:max-h-[500px] md:min-h-[500px] overflow-auto">
            <PensumComponent setMateria={setMateria} materias={pensumX} pensum={pensum} />
            <ShowMateriaInfo materia={materia} pensum={pensum} />
        </div>
    </>
}

export default PensumTSX;