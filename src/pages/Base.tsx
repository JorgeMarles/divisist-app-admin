import { Outlet, useOutletContext } from "react-router-dom"
import Header from "../components/Header";
import MyFooter from "../components/MyFooter";
import { useEffect, useState } from "react";
import Pensum from "../back/Pensum";

type PensumType = {pensum: Pensum}

const Base = () => {
    const [pensum,_] = useState<Pensum>(new Pensum())
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(()=>{
        console.log(import.meta.env.VITE_REACT_APP_BACKEND_URL);
        pensum.init().then(()=>{
            setLoading(false)
        }).catch(()=>{
            setError(true)
            setLoading(false)
        })
    }, [])

    return <>
        <div className='min-h-full h-full relative'>
            <Header pensum={pensum} loading={loading} />
            <div className='h-4/6 overflow-y-auto m-14'>
                {
                    error ? 
                    <>Error</>
                    :
                    loading ? 
                    <>Cargando...</>
                    :
                    <Outlet context={{pensum}} />
                }
            </div>
            <MyFooter />
        </div>

    </>
}

export const usePensum = () => {
    return useOutletContext<PensumType>();
}

export default Base;
