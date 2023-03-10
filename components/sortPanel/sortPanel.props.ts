import {Dispatch, SetStateAction} from 'react'
import {IShowGames} from '../pages/main/Main'

export interface ISortProps {
    activeIconIndex: number | null,
    setActiveIconIndex: any,
    activeBtn: number,
    setGamesArr: Dispatch<SetStateAction<[]>>,
    showGames: ({ platform, index }: IShowGames) => void
}

