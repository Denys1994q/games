import {Dispatch, SetStateAction} from 'react'
import {IShowGames} from '../Main'

export interface ISortProps {
    setGamesArr: Dispatch<SetStateAction<[]>>,
    showGames: ({ platform, index }: IShowGames) => void
}

