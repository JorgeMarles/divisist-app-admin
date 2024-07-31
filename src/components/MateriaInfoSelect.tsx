import { FC, useEffect, useState } from "react"
import { Button, Label, List } from "flowbite-react"
import Matricula from "../back/Matricula"
import { ImCross } from "react-icons/im";
import Select, { ActionMeta, SingleValue } from 'react-select'
import Horario from "../back/Horario";

type MateriaInfoSelectType = {
    matricula: Matricula,
    eliminarMateria: Function,
    asignarMatricula: Function,
    horario: Horario
}

const MateriaInfoSelect: FC<MateriaInfoSelectType> = ({ matricula, eliminarMateria, asignarMatricula, horario }) => {
    const [selectValues, setSelectValues] = useState<GrupoSelect[]>([]);
    const [selectedValue, setSelectedValue] = useState<number>(0);

    useEffect(() => {
        const res = Object.entries(matricula.materia!.grupos!).map(([codigo, grupo], i): GrupoSelect => {            
            if(codigo === matricula.codigoGrupo) {                
                setSelectedValue(i)
            }
            const resp: string = horario.grupoValido(grupo, matricula.materia!);
            const isDisabled: boolean = codigo === matricula.codigoGrupo ? false : resp !== '';            
            return {
                value: codigo,
                label: grupo.toString() + (isDisabled ? `\n(Conflicto con ${resp})` : ""),
                isDisabled: isDisabled
            }
        })
        setSelectValues(res)
    }, [horario])

    const changeSelectHandler = (newValue: SingleValue<GrupoSelect>, actionMeta: ActionMeta<GrupoSelect>) => {
        const newMat: Matricula = new Matricula();
        newMat.materia = matricula.materia;
        newMat.codigoGrupo = newValue?.value;
        
        asignarMatricula(newMat, ()=>{setSelectedValue(selectValues.findIndex(el => {
            if(actionMeta && actionMeta.removedValue && actionMeta.removedValue.value){
                return el.value === actionMeta!.removedValue?.value;
            }
            return false;
        }))})
        
        setSelectedValue(selectValues.findIndex(el => el.value === newValue?.value))
    }

    type GrupoSelect = {
        value: string,
        label: string,
        isDisabled?: boolean,
    }

    return <>
        <List.Item className="pb-3 sm:pb-4">
            <div>
                <div className="text-lg font-semibold flex justify-between">
                    <div>
                        {matricula.materia!.nombre} (Cre:{matricula.materia!.creditos})
                    </div>
                    <div>
                        <Button outline pill color={"failure"} onClick={() => eliminarMateria()}>
                            <ImCross />
                        </Button>
                    </div>
                </div>
                <div>
                    <Label>Selecciona de los siguientes grupos:</Label>
                    <Select options={selectValues} value={selectValues[selectedValue]} onChange={changeSelectHandler} name="color" styles={{
                        menuList(base) {
                            return {
                                ...base, maxHeight: "200px", paddingTop: "0"
                            }
                        }
                    }}/>
                </div>
            </div>
        </List.Item>
    </>
}

export default MateriaInfoSelect;