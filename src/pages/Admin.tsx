import { useState } from "react";
import LogsProgress from "../components/LogsProgress";
import { DataSocket } from "../util/typeReact";
import PensumLoader from "../components/PensumLoader";

const Admin = () => {
    const [logs, setLogs] = useState<DataSocket[]>([]);
    const [progress, setProgress] = useState<number>(0);

    return (
        <>
            <div className="flex lg:flex-row flex-col">
                <PensumLoader setLogs={setLogs} setProgress={setProgress} />
                <LogsProgress logs={logs} progress={progress} />
            </div>
        </>
    )
}

export default Admin;