import { Label, FileInput, Button, Progress, TextInput } from "flowbite-react";
import { useState, ChangeEvent, useEffect } from "react";
import ReactJson from "react-json-view";
import { json } from "react-router-dom";
import { socket } from "../back/socket/socket";
import download, { ContentType } from "../util/download";

enum SocketMessageStatus {
    OK = 200,
    ERROR = 500
}

type SocketMessage = {
    message: string,
    date?: Date,
    status: SocketMessageStatus,
    data?: any
}

type SocketProgressMessage = SocketMessage & {
    total: number,
    finished: number
}

type DataSocket = SocketProgressMessage;

const PensumByCookie = () => {
    const [logs, setLogs] = useState<DataSocket[]>([]);
    const [cookie, setCookie] = useState<string>("");
    const [json, setJson] = useState<object>({});
    const [progress, setProgress] = useState<number>(0);


    useEffect(() => {

        socket.on('progress', (data: DataSocket) => {
            setLogs(logs => [...logs, { ...data, date: new Date(data.date!) }])
            setProgress(map(data.finished, 0, data.total, 1, 100))
        });
        socket.on('exit', (data: DataSocket) => {
            alert("Completed: " + data.message)
            setJson(data.data)
            setProgress(100);
        });
    }, [])

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

    const handleSubmit = async () => {
        setProgress(0);
        setLogs([]);
        const params: URLSearchParams = new URLSearchParams();
        params.append('ci_session',cookie)
        fetch(`${import.meta.env.VITE_REACT_APP_BAKCEND_URL}/divisist/pensum?${params.toString()}`, {
            method: "GET"
        })
    }

    const handleBorrar = () => {
        setProgress(0);
        setLogs([]);
        setCookie("")
    }

    const handleValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setCookie(evt.target.value)
    }

    const descargar = () => {
        download(JSON.stringify(json), `pensum_${new Date().getTime()}.json`, ContentType.APPLICATION_JSON)
    }

    return (<>
        <div className="w-full flex flex-col max-h-[500px] min-h-[500px] bg-slate-300">
            <div className="w-[96%] m-2 flex items-center justify-around">
                <div className="w-[80%]">
                    <div>
                        <Label htmlFor="cookie" value="ci_session Cookie" />
                    </div>
                    <TextInput id="file" pattern="[A-Fa-f0-9]{40}" onChange={handleValueChange} />
                </div>
                <div className="w-[20%] flex justify-around">
                    <Button onClick={handleSubmit}>
                        Subir
                    </Button>
                    <Button onClick={handleBorrar}>
                        Borrar
                    </Button>
                    <Button onClick={descargar}>
                        Descargar JSON
                    </Button>
                </div>
            </div>
            <div className="flex flex-row m-2 h-ful">
                <div className="w-[50%] me-2 overflow-auto h-[350px]">
                    <ReactJson
                        src={json}
                        name={null}
                        collapsed
                        onAdd={() => { }}
                        onDelete={() => { }}
                        onEdit={() => { }}
                        displayDataTypes={false}
                    />
                </div>
                <div className="w-[50%]  overflow-auto h-[350px] p-2">
                    <Progress progress={progress} />
                    <div className="flex flex-col-reverse">
                        {
                            logs.map(el =>
                                <div key={el.date!.getTime()} className="flex   bg-red-300  p-2 justify-between border-b-2 border-b-red-400">
                                    <div className="truncate w-[75%] flex">
                                        <div>{`${el.finished}/${el.total} (${(100 * (el.finished / el.total)).toFixed(2)}%)  `}</div>
                                        &nbsp;|&nbsp;
                                        <div>{el.message}</div>
                                    </div>
                                    <div>
                                        {el.date!.toLocaleString()}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default PensumByCookie;