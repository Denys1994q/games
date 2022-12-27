import '../../pages/main/gameCard/Main_gameCard.props'

export enum Platform {
    PC = "pc",
    BROWSER = "browser",
}

export interface Btn {
    name: string;
}

interface IShowGames {
    platform: Platform;
    index: number;
}

export interface btnsProps {
    activeBtn: number;
    showGames: ({ platform, index }: IShowGames) => void
}