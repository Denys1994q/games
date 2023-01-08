export interface PaginationProps {
    gamesPerPage: number, 
    start: number,
    games: object[], 
    showPrevPage: () => void,
    showNextPage: () => void,
    showChosenPage: (pageNumber: number) => void 
    divider: any
}