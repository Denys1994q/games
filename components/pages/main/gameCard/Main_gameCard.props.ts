
type Obj = {
    thumbnail: string;
    title: string;
};

export interface GamesType {
    games: Obj[];
    loading: boolean;
    start: number,
    offset: number
}