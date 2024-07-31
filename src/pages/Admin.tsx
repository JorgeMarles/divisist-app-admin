import { ChangeEvent, useEffect, useState } from "react";
import LogsProgress from "../components/LogsProgress";
import { DataSocket, SocketMessageStatus } from "../util/typeReact";
import PensumLoader from "../components/PensumLoader";






const Admin = () => {
    const [logs, setLogs] = useState<DataSocket[]>(Array<DataSocket>(100).fill({ finished: 10, total: 30, message: "olasdjiaiedfhwriyhvurnvuhebuchnwhdbuwhbefhwbvhbwhjrsdfwfrerfa", status: SocketMessageStatus.OK, date: new Date() }));
    const [progress, setProgress] = useState<number>(20.66666666666);

    return (
        <>
            <div className="flex">
                <PensumLoader setLogs={setLogs} setProgress={setProgress} />
                <LogsProgress logs={logs} progress={progress} />
            </div>
        </>
    )
}

export default Admin;