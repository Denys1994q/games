import { Dispatch, SetStateAction } from "react"

export interface ISelect {
    setGamesPerPage: Dispatch<SetStateAction<number>>,
    options: number[]
}