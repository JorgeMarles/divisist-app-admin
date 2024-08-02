import { useEffect, useState } from "react";
import LogsProgress from "../components/LogsProgress";
import { DataSocket } from "../util/typeReact";
import PensumLoader from "../components/PensumLoader";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [logs, setLogs] = useState<DataSocket[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const { getUser } = useUser();
    const navigate = useNavigate()

    useEffect(() => {
        if (getUser() === null) {
            navigate("/divisist-app-admin/login")
        }
    }, [])


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