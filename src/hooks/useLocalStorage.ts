import { useEffect, useState } from "react";

interface Constructor<T> {
    new (): T;
}

type ApplyT ={
    apply(data: any): void
}

export default function useLocalStorage<T extends ApplyT>
    (key: string, defaultObject: T, constructor: Constructor<T>)
    : [T, React.Dispatch<React.SetStateAction<T>>] 
{
    const [object, setObject] = useState<T>(defaultObject);

    useEffect(()=>{
        
        const savedItem = localStorage.getItem(key);
        if(savedItem){            
            const obj: T = new constructor();
            obj.apply(JSON.parse(savedItem));            
            setObject(obj);
        }
    }, []);

    useEffect(()=>{        
        localStorage.setItem(key, JSON.stringify(object));
    }, [object]);

    return [object, setObject]
}