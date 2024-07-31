import { FC, useRef } from "react"
import { Progress } from "flowbite-react"
import { DataSocket } from "../util/typeReact"


type LogsProgressType = {
    logs: DataSocket[],
    progress: number
}

const LogsProgress: FC<LogsProgressType> = ({ logs, progress }) => {
    const ref = useRef<HTMLDivElement>(null);


    return (<>
        <div className="w-1/2 p-2 max-h-[500px] min-h-[500px]">
            <Progress 
                progress={progress} 
                progressLabelPosition="inside"
                textLabel={`Progreso: ${logs[0] ? logs[0].finished : 0} / ${logs[0] ? logs[0].total : 0}`}
                textLabelPosition="outside"
                size="lg" 
                labelProgress
                labelText
                />

            <div className="flex flex-col mt-4 overflow-auto h-[95%]" ref={ref}>
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