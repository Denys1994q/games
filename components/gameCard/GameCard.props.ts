export interface IArrAllGames {
    thumbnail: string;
    id: number;
    title: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
}

export interface GamesType {
    games: IArrAllGames[];
    loading?: boolean;
    start: number,
    offset: number
}