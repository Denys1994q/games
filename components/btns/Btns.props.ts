// import '../gameCard/GameCard.props'

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
    activeBtn: number | null;
    setActiveIconIndex: any,
    showGames: ({ platform, index }: IShowGames) => void
}