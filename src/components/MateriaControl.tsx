import { Button, Label, TextInput } from "flowbite-react";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import Materia from "../back/Materia";
import Pensum from "../back/Pensum";
import ListaMaterias from "./ListaMaterias";
import Horario from "../back/Horario";
import Matricula from "../back/Matricula";


type MateriaControlType = {
    horario: Horario,
    pensum: Pensum,
    setHorario: Function
}
const MateriaControl: FC<MateriaControlType> = ({ horario, setHorario, pensum }) => {

    const [codMateria, setCodMateria] = useState<string>("");
    const reg = /^(\d{7})$/g;
    const reg2 = /^(\d{0,7})$/g;

    const addMateria = () => {
        if (reg.test(codMateria)) {
            const mat: Materia | undefined = pensum.buscarMateria(codMateria);
            if (mat) {
                try {
                    const horarioNew = new Horario();
                    horarioNew.from(horario)
                    horarioNew.asignarMateria(mat);
                    console.log(horarioNew.toString());
                    
                    setHorario(horarioNew)
                } catch (error) {
                    alert(error)
                }

            } else {
                alert(`No existe una materia con codigo ${codMateria}`)
            }
        } else {
            alert(`${codMateria} no es un codigo de materia válido`)
        }
    }

    const asignarMatricula = (matricula: Matricula, callbackError: Function | undefined) => {
        try {
            const horarioNew = new Horario();
            horarioNew.from(horario);
            horarioNew.asignarMatricula(matricula);
            setHorario(horarioNew)
        } catch (error) {
            callbackError!();
            alert(error)
        }
    }

    const eliminarMateria = (codigo: string) => {
        try {

            const mat: Materia | undefined = pensum.buscarMateria(codigo);
            if (mat) {
                const horarioNew = new Horario();
                horarioNew.from(horario)
                horarioNew.eliminarMateria(mat)
                setHorario(horarioNew)
            } else {
                throw `Materia con codigo ${codigo} no encontrada`
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleChangeNum = (evt: ChangeEvent<HTMLInputElement>) => {
        const val = evt.target.value;

        if (reg2.test(val)) {
            setCodMateria(val)
        }
    }

    const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            evt.preventDefault()
            addMateria()
        }
    }


    return <>
        <div className="w-full md:w-[30%] md:max-h-[500px] md:h-[500px] flex flex-col h-[300px] bg-gray-100">
            <div className="m-2 w-[96%] flex border-b-black">
                <div className=" w-[78%]">
                    <div className="mb-2 block">
                        <Label htmlFor="codigo" value="Codigo materia (7 digitos)" />
                    </div>
                    <TextInput id="codigo" className="pe-2 h-1/3" value={codMateria} onKeyDown={handleKeyDown} onChange={handleChangeNum} />

                </div>
                <div className="flex items-end">
                    <Button className="h-1/2 items-end bg-red-600" onClick={addMateria}>Añadir</Button>
                </div>
            </div>
            <ListaMaterias asignarMatricula={asignarMatricula} eliminarMateria={eliminarMateria} horario={horario} />

            <div className={`m-2 w-[96%] flex mt-auto font-bold ${horario.sumaCreditos > 20 ? "text-red-600" : ""}`}>
                {horario.sumaCreditos} créditos matriculados
            </div>
        </div>
    </>
}

export default MateriaControl;