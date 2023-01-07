import {Dispatch, SetStateAction} from 'react'

export interface ISelect {
    changeAction?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    options: number[] | string[]
}

