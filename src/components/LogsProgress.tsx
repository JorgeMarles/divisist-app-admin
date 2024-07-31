import { FC } from "react"
import { Progress } from "flowbite-react"
import { DataSocket } from "../util/typeReact"


type LogsProgressType = {
    logs: DataSocket[],
    progress: number
}

const LogsProgress: FC<LogsProgressType> = ({ logs, progress }) => {

    /**
     * Reescala un valor de un rango de entrada a un rango de salida.
     * @param x - El valor a reescalar.
     * @param inMin - El límite inferior del rango de entrada.
     * @param inMax - El límite superior del rango de entrada.
     * @param outMin - El límite inferior del rango de salida.
     * @param outMax - El límite superior del rango de salida.
     * @returns El valor reescalado al nuevo rango.
     */
    function map(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    

    return (<>
        <div className="w-1/2 p-2 max-h-[500px] min-h-[500px]">
            <Progress 
                progress={progress} 
                progressLabelPosition="inside"
                textLabel={`Progreso: ${logs[logs.length-1].finished} / ${logs[logs.length-1].total}`}
                textLabelPosition="outside"
                size="lg" 
                labelProgress
                labelText
                />

            <div className="flex flex-col-reverse mt-4 overflow-auto h-[95%]">
                {
                    logs.map(el =>
                        <div key={el.date!.getTime()} className="flex   bg-red-300  p-2 justify-between border-b-2 border-b-red-400">
                            <div className="truncate w-[75%] flex">
                                {el.message}
                            </div>
                            <div>
                                {el.date!.toLocaleString()}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </>)
}

export default LogsProgress