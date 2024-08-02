import { Label, FileInput, Button, TextInput, ToggleSwitch } from "flowbite-react";
import { useState, ChangeEvent, useEffect, FC } from "react";
import ReactJson from "react-json-view";
import { MdDownload, MdUpload } from "react-icons/md";
import { socket } from "../back/socket/socket";
import download, { ContentType } from "../util/download";
import { DataSocket, SetState } from "../util/typeReact";
import { RxCrossCircled } from "react-icons/rx";
import { roundTo } from "../util/numberUtil";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";


export type PensumLoadComponentType = {
    setLogs: SetState<DataSocket[]>,
    setProgress: SetState<number>
}


const PensumLoader: FC<PensumLoadComponentType> = ({ setLogs, setProgress }) => {

    const [cookie, setCookie] = useState<string>("");
    const [json, setJson] = useState<object>({});
    const [showCookie, setShowCookie] = useState<boolean>(true);
    const {getAccessToken} = useUser();

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


    const erasePensum = () => {
        if (confirm("Deseas borrar el pensum?")) {
            toast.promise(fetch(`${import.meta.env.VITE_REACT_APP_BAKCEND_URL}/materias/deletepensum/115`, {
                method: "DELETE",
                headers: {
                    'authorization': `Bearer ${getAccessToken()}`
                }
            }),
                {
                    error: "Ha ocurrido un error borrando el pensum",
                    pending: "Borrando Pensum de la base de datos",
                    success: "Pensum borrado correctamente de la base de datos"
                }
            )
        }
    }

    useEffect(() => {

        socket.on('progress', (data: DataSocket) => {
            setLogs((logs: DataSocket[]) => [{ ...data, date: new Date(data.date!) }, ...logs])
            setProgress(roundTo(map(data.finished, 0, data.total, 1, 100), 2))
        });
        socket.on('exit', (data: DataSocket) => {
            console.log("exit", data.data);

            toast.success(data.message)
            setJson(data.data)
            setProgress(100);
        });
        socket.on('error', (data: DataSocket) => {
            toast.error(data.message)
        })
    }, [])


    const handleSubmit = async () => {
        setProgress(0);
        setLogs([]);
        if(showCookie && !/[A-Fa-f0-9]{40}/g.test(cookie)){
            toast.error('El valor de la cookie no es válido, debe ser un texto de 40 caracteres hexadecimales.')
            return;
        }
        if (showCookie) {
            const params: URLSearchParams = new URLSearchParams();
            params.append('ci_session', cookie)
            params.append('delay', '2');
            console.log(getAccessToken());
            
            fetch(`${import.meta.env.VITE_REACT_APP_BAKCEND_URL}/divisist/pensum?${params.toString()}`, {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${getAccessToken()}`
                }
            })
        } else {
            fetch(`${import.meta.env.VITE_REACT_APP_BAKCEND_URL}/materias/addpensum`, {
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getAccessToken()}`
                },
                method: "POST"
            })
        }

    }

    const handleBorrar = () => {
        setProgress(0);
        setLogs([]);
        setCookie("")
        setJson({})
    }

    const handleFileChange = async (evt: ChangeEvent<HTMLInputElement>) => {
        if (!evt.target.files) return;
        setJson(JSON.parse(await evt.target.files[0].text()));
    }

    const handleValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setCookie(evt.target.value)
    }

    const descargar = () => {
        console.log(json);

        download(JSON.stringify(json), `pensum_${new Date().getTime()}.json`, ContentType.APPLICATION_JSON)
    }

    return (<>
        <div className="lg:w-1/2 w-full flex flex-col max-h-[500px] min-h-[500px] bg-slate-300">
            <div className="w-[98%] p-2 flex justify-between">
                <ToggleSwitch className="w-[60%]" checked={showCookie} label={`Mostrando ${showCookie ? "Cookie" : "JSON"}`} onChange={setShowCookie} />
                <div className="w-[40%] flex justify-around items-end h-full">
                    <div className="h-fit">
                        <Button onClick={erasePensum} color={"failure"}>
                            Borrar Pensum
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-[96%] m-2">
                <div>
                    <Label htmlFor="input" value={showCookie ? "ci_session Cookie" : "Archivo pensum.json"} />
                </div>
                <div className="flex">
                    <div className="w-8/12">
                        {
                            showCookie ?
                                <>
                                    <TextInput id="input" pattern="[A-Fa-f0-9]{40}" value={cookie} onChange={handleValueChange} />
                                </>
                                :
                                <FileInput id="input" helperText="JSON" accept=".JSON" onChange={handleFileChange} />
                        }
                    </div>

                    <Button.Group className="h-fit">
                        <Button className="p-0" onClick={handleSubmit} color={"success"} title={`Enviar petición para procesar`}>
                            <MdUpload className="size-5" />
                        </Button>
                        <Button className="p-0" onClick={handleBorrar} color={"failure"} title={`Borrar JSON cargado`}>
                            <RxCrossCircled className="size-5" />
                        </Button>
                        <Button className="p-0" onClick={descargar} color={"blue"} title={`Descargar JSON`}>
                            <MdDownload className="size-5" />
                        </Button>
                    </Button.Group>
                </div>
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