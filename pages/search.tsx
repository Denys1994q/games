import styles from "../styles/Search.module.sass";

import { IArrAllGames } from "../components/gameCard/GameCard.props";

import SliderComponent from "../components/slider/Slider";
import FindInput from "../components/findInput/FindInput";

export const getServerSideProps = async () => {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    };
    const res = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", options);
    const res1 = await res.json();

    return {
        props: { gamesFromPrerender: res1 },
    };
};

interface ISearchPageProps {
    gamesFromPrerender: IArrAllGames[];
    error: boolean;
}

// треба це більш на компоненти розбити (інпут в окремий компонент по пошуку) !!!!!!!!
const Search = ({ gamesFromPrerender }: ISearchPageProps): JSX.Element => {
    let randomNumbersArr: number[] = [];
    const getRandomGames = (arr: object[]) => {
        for (let i = 0; i < 16; i++) {
            randomNumbersArr.push(Math.floor(Math.random() * (arr.length - 0) + 0));
        }
    };

    let slidesArr: string[] = [];
    getRandomGames(gamesFromPrerender);
    if (randomNumbersArr.length > 0 && gamesFromPrerender.length > 0) {
        randomNumbersArr.map(number => {
            slidesArr.push(gamesFromPrerender[number].thumbnail);
        });
    }

    return (
        <section className={styles.search}>
            <h2 className={styles.search__title}>You may like it</h2>
            <SliderComponent arr={slidesArr} slidesToShowNum={3} />
            <h2 className={styles.search__title}>Find</h2>
            <FindInput arrWithAllGames={gamesFromPrerender} />
        </section>
    );
};

export default Search;
