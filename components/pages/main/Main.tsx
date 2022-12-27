import styles from "./Main.module.sass";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useHttp } from "../../../hooks/http.hook";

import { Platform } from "../../layout/btns/Btns.props";

import Btns from "../../layout/btns/Btns";
import Select from "../../layout/inputs/Select";
import GameCard from "./gameCard/Main_gameCard";
import PaginationPanel from "../../common/pagination/PaginationPanel";
import SortPanel from "./sortPanel/Main_sortPanel";

export interface IShowGames {
    platform: Platform;
    index: number;
}

// назвати Main і можливо перенести частину розмітки в новий компонент Main__list
const Main = (): JSX.Element => {
    const { request } = useHttp();

    const [gamesArr, setGamesArr]: [[], Dispatch<SetStateAction<[]>>] = useState([]); // any!!!!!
    const [activeBtn, setActiveBtn]: any = useState(null); // any!!!!!
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // pagination
    const [start, setStart] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(20);

    useEffect(() => {
        showGames({ platform: Platform.PC, index: 0 });
    }, []);

    // запит до API за списком ігор
    const showGames = ({ platform, index }: IShowGames): void => {
        setLoading(true);
        setActiveBtn(index);
        // видалив, не пам'ятаю, що робить
        // setStart(0);
        request(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`, "GET", null, {
            "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        })
            .then(response => getData(response))
            .catch(er => setError(er));
    };

    // оновлення даних на сторінці
    const getData = (response: any) => {
        setLoading(false);
        setGamesArr(response);
    };

    const [activeIndex, setActiveIndex] = useState(0);
    // попередня сторінка з іграми
    const showPrevPage = () => {
        // в обох проблема з крайніми, по кліку відбувається дія, хоч і не показується
        if (activeIndex > 0) {
            setActiveIndex(index => index - 1);
        }
        // відняти 5, якщо сторінка
        if (activeIndex === divider - 5 && start + gamesPerPage !== 0 && activeIndex > 0) {
            setDivider(divider => divider - 5);
        }
        if (start !== 0) {
            setStart(start => start - gamesPerPage);
        }
    };
    // наступна сторінка з іграми

    const showNextPage = () => {
        if (activeIndex + 1 < gamesArr.length / gamesPerPage) {
            setActiveIndex(index => index + 1);
        }

        if (activeIndex === divider - 1 && start + gamesPerPage < gamesArr.length) {
            setDivider(divider => divider + 5);
        }
        if (start + gamesPerPage < gamesArr.length) {
            setStart(start => start + gamesPerPage);
        }
    };
    // якщо остання сторінка в масиві сторінок, далі не йде
    // показуємо ту сторінку, по якій клікнув користувач
    const [divider, setDivider] = useState(5);
    const showChosenPage = (pageNumber: number) => {
        setActiveIndex(pageNumber);
        setStart(start => gamesPerPage * pageNumber);
    };

    return (
        <>
            <div className={styles.main__left}>
                {gamesArr && gamesArr.length > 0 ? <SortPanel setGamesArr={setGamesArr} showGames={showGames} /> : null}
            </div>
            <div className={styles.main__right}>
                <div className={styles.gameTypes}>
                    <div>
                        <Btns showGames={showGames} activeBtn={activeBtn} />
                    </div>
                    <Select options={[20, 40]} setGamesPerPage={setGamesPerPage} />
                </div>
                {!error ? (
                    <>
                        <ul className={styles.gameList}>
                            <GameCard games={gamesArr} loading={loading} start={start} offset={gamesPerPage} />
                        </ul>
                    </>
                ) : (
                    "Sorry, service unavailable..."
                )}
                {gamesArr && gamesArr.length > 0 && !loading ? (
                    <PaginationPanel
                        start={start}
                        gamesPerPage={gamesPerPage}
                        games={gamesArr}
                        showPrevPage={showPrevPage}
                        showNextPage={showNextPage}
                        showChosenPage={showChosenPage}
                        divider={divider}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Main;
