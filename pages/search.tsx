import { useEffect, useState } from "react";

import styles from "../styles/Search.module.sass";

import { useHttp } from "../hooks/http.hook";
import { Platform } from "../components/layout/btns/Btns.props";

import { IArrAllGames } from "../components/pages/main/gameCard/Main_gameCard.props";

import SliderComponent from "../components/common/slider/Slider";
import FindInput from "../components/pages/search/FindInput/FindInput";

// user?.name - так ставити. Означає, якщо є така властивість
// круто, буває, коли ми точно знаємо, що не буде нулем. Наприклад, при першому юзефекті відразу з нуля стане чимось, в такому випадку ми можемо писати {} as User. Брешемо тс що цей пустий об'єкт це User

// ОНОВЛЮЮТЬСЯ СЛАЙДИ ДВІЧІ

// треба це більш на компоненти розбити (інпут в окремий компонент по пошуку) !!!!!!!!
const Search = (): JSX.Element => {
    const { request } = useHttp();

    const [arrWithAllGames, setArrWithAllGames] = useState<[] | IArrAllGames[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [slidesUrlsImgs, setSlidesUrlsImgs] = useState<[] | string[]>([]);

    const showGames = ({ platform, index }: any): void => {
        request(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`, "GET", null, {
            "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        })
            .then(response => setArrWithAllGames(response))
            .catch(er => setError(er));
    };

    useEffect(() => {
        showGames({ platform: Platform.PC });
    }, []);

    useEffect(() => {
        let arrCopy: string[] = [];
        getRandomGames(arrWithAllGames);
        if (randomNumberArr.length > 0 && arrWithAllGames.length > 0) {
            randomNumberArr.map(number => {
                arrCopy.push(arrWithAllGames[number].thumbnail);
            });
        }
        setSlidesUrlsImgs(arrCopy);
    }, [arrWithAllGames]);

    let randomNumberArr: number[] = [];
    const getRandomGames = (arr: object[]) => {
        for (let i = 0; i < 16; i++) {
            randomNumberArr.push(Math.floor(Math.random() * (arr.length - 0) + 0));
        }
    };

    return (
        <section className={styles.search}>
            {!error ? (
                <>
                    <h2 className={styles.search__title}>You may like it</h2>
                    <SliderComponent arr={slidesUrlsImgs} slidesToShowNum={3} />
                    <h2 className={styles.search__title}>Find</h2>
                    <FindInput arrWithAllGames={arrWithAllGames} />
                </>
            ) : (
                <h3>Service unavailable</h3>
            )}
        </section>
    );
};

export default Search;
