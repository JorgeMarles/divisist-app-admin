import Pensum from "../back/Pensum"

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export enum SocketMessageStatus {
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

export type FunctionPensum = {
    pensum: Pensum,
    loading: boolean
}

export type DataSocket = SocketProgressMessage;
