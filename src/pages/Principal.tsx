import { useEffect } from "react";
import MateriaControl from "../components/MateriaControl";
import Horario from "../back/Horario";
import HorarioComponent from "../components/HorarioComponent";
import { usePensum } from "./Base";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLoaderData } from "react-router-dom";
import Pensum from "../back/Pensum";

const Principal = () => {
    const [horario, setHorario] = useLocalStorage<Horario>('horario',new Horario(), Horario);
    const pensum = useLoaderData() as Pensum;

    return <>
        <div className="flex w-full flex-col-reverse md:flex-row md:max-h-[500px] md:min-h-[500px] overflow-auto">
            <HorarioComponent horario={horario}/>
            <MateriaControl horario={horario} pensum={pensum} setHorario={setHorario} />
        </div>
    </>
}

export default Principal;