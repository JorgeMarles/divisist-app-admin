import { Label, FileInput, Button, Progress, TextInput, ToggleSwitch } from "flowbite-react";
import { useState, ChangeEvent, useEffect, FC } from "react";
import ReactJson from "react-json-view";
import { MdDownload, MdUpload } from "react-icons/md";
import { socket } from "../back/socket/socket";
import download, { ContentType } from "../util/download";
import { DataSocket, SetState } from "../util/typeReact";
import { RxCrossCircled } from "react-icons/rx";
import { roundTo } from "../util/numberUtil";


export type PensumLoadComponentType = {
    setLogs: SetState<DataSocket[]>,
    setProgress: SetState<number>
}


const PensumLoader: FC<PensumLoadComponentType> = ({ setLogs, setProgress }) => {

    const [cookie, setCookie] = useState<string>("");
    const [json, setJson] = useState<object>({});
    const [showCookie, setShowCookie] = useState<boolean>(true);

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

    useEffect(() => {

        socket.on('progress', (data: DataSocket) => {
            setLogs((logs: DataSocket[]) => [...logs, { ...data, date: new Date(data.date!) }])
            setProgress(roundTo(map(data.finished, 0, data.total, 1, 100), 2))
        });
        socket.on('exit', (data: DataSocket) => {
            alert("Completed: " + data.message)
            setJson(data.data)
            setProgress(100);
        });
    }, [])


    const handleSubmit = async () => {
        setProgress(0);
        setLogs([]);
        const params: URLSearchParams = new URLSearchParams();
        params.append('ci_session', cookie)
        fetch(`${import.meta.env.VITE_REACT_APP_BAKCEND_URL}/divisist/pensum?${params.toString()}`, {
            method: "GET"
        })
    }

    const handleBorrar = () => {
        setProgress(0);
        setLogs([]);
        setCookie("")
    }

    const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
        if (!evt.target.files) return;
        setJson(JSON.parse(await evt.target.files[0].text()));
    }

    const handleValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setCookie(evt.target.value)
    }

    const descargar = () => {
        download(JSON.stringify(json), `pensum_${new Date().getTime()}.json`, ContentType.APPLICATION_JSON)
    }

    return (<>
        <div className="w-1/2 flex flex-col max-h-[500px] min-h-[500px] bg-slate-300">
            <div className="w-[98%] p-2 flex justify-between">
                <ToggleSwitch checked={showCookie} label={`Mostrando ${showCookie ? "Cookie" : "JSON"}`} onChange={setShowCookie} />
                <div className="w-[20%] flex justify-around items-end h-full">
                    <div className="h-fit">
                        <Button.Group>
                            <Button onClick={handleSubmit} color={"success"} title="Enviar JSON para procesar">
                                <MdUpload className="size-5" />
                            </Button>
                            <Button onClick={handleBorrar} color={"failure"} title="Borrar JSON cargado">
                                <RxCrossCircled className="size-5" />
                            </Button>
                            <Button onClick={descargar} color={"blue"} title="Descargar JSON">
                                <MdDownload className="size-5" />
                            </Button>
                        </Button.Group>
                    </div>
                </div>
            </div>
            <div className="w-[96%] m-2">
                <div>
                    <Label htmlFor="input" value={showCookie ? "ci_session Cookie" : "Archivo pensum.json"} />
                </div>
                {
                    showCookie ?
                        <TextInput id="input" pattern="[A-Fa-f0-9]{40}" value={cookie} onChange={handleValueChange} />
                        :
                        <FileInput id="input" helperText="JSON" accept=".JSON" onChange={handleFileChange} />
                }
            </div>
            <div className="p-2 overflow-auto">
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
        </div>
    </>)
}

export default PensumLoader;