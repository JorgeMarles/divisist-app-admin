import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../back/socket/socket";
import { Label, FileInput, Button, Progress, Tabs } from "flowbite-react";
import ReactJson from "react-json-view";
import { VscJson } from "react-icons/vsc";
import { FaCookie } from "react-icons/fa";
import PensumByJSON from "../components/PensumByJSON";
import PensumByCookie from "../components/PensumByCookie";


const Admin = () => {

    return (
        <Tabs aria-label="Default tabs" variant="default" className="p-1">
            <Tabs.Item active title="Por JSON" icon={VscJson}>
                <PensumByJSON />
            </Tabs.Item>
            <Tabs.Item title="Por cookie" icon={FaCookie}>
                <PensumByCookie />
            </Tabs.Item>
            
        </Tabs>
    )
}

export default Admin;