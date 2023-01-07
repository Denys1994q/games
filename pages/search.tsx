import styles from "../styles/Search.module.sass";

import { useHttp } from "../hooks/http.hook";
import { IArrAllGames } from "../components/pages/main/gameCard/Main_gameCard.props";

import SliderComponent from "../components/common/slider/Slider";
import FindInput from "../components/pages/search/FindInput/FindInput";

// user?.name - так ставити. Означає, якщо є така властивість
export const getServerSideProps = async () => {
    const { request } = useHttp();

    let err = false;
    const options = {
        "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    };

    const res = await request(
        "https://free-to-play-games-database.p.rapidapi.com/api/games",
        "GET",
        null,
        options
    ).catch(e => (err = true));

    // if (!res.ok) {
    //     err = true;
    // }
    // const data = await res.json();
    return {
        props: { gamesFromPrerender: res, error: err },
    };
};

interface ISearchPageProps {
    gamesFromPrerender: IArrAllGames[];
    error: boolean;
}

// треба це більш на компоненти розбити (інпут в окремий компонент по пошуку) !!!!!!!!
const Search = ({ gamesFromPrerender, error }: ISearchPageProps): JSX.Element => {
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
            {!error ? (
                <>
                    <h2 className={styles.search__title}>You may like it</h2>
                    <SliderComponent arr={slidesArr} slidesToShowNum={3} />
                    <h2 className={styles.search__title}>Find</h2>
                    <FindInput arrWithAllGames={gamesFromPrerender} />
                </>
            ) : (
                <h3>Service unavailable</h3>
            )}
        </section>
    );
};

export default Search;
