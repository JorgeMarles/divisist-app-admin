import { Outlet, useOutletContext } from "react-router-dom"
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import { useEffect, useState } from "react";
import Pensum from "../back/Pensum";

type PensumType = {pensum: Pensum}

const Base = () => {
    const [pensum] = useState<Pensum>(new Pensum());

    useEffect(()=>{
        pensum.init();
        console.log(import.meta.env.VITE_REACT_APP_BAKCEND_URL);
        
    }, [])

    return <>
        <div className='min-h-full h-full relative'>
            <Header />
            <div className='h-4/6 overflow-y-auto m-14'>
                <Outlet context={{pensum}} />
            </div>
            <MyFooter />
        </div>

    </>
}

export const usePensum = () => {
    return useOutletContext<PensumType>();
}

export default Base;
