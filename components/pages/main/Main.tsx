import styles from "./Main.module.sass";

import { useState } from "react";
import { useHttp } from "../../../hooks/http.hook";

import { Platform } from "../../btns/Btns.props"; 

import Btns from "../../btns/Btns";
import Select from "../../inputs/Select";
import GameCard from "../../gameCard/GameCard";
import PaginationPanel from "../../pagination/PaginationPanel";
import SortPanel from "../../sortPanel/SortPanel";

export interface IShowGames {
    platform: Platform;
    index: number;
}

interface MainPageProps {
    prerenderedGames: [];
}

// назвати Main і можливо перенести частину розмітки в новий компонент Main__list
const Main = ({ prerenderedGames }: MainPageProps): JSX.Element => {
    const { request } = useHttp();

    const [gamesArr, setGamesArr] = useState<[]>(prerenderedGames);
    const [activeBtn, setActiveBtn] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    // pagination
    const [start, setStart] = useState<number>(0);
    const startOptions: number[] = [20, 40];
    const [gamesPerPage, setGamesPerPage] = useState(startOptions[0]);
    const [divider, setDivider] = useState(5);
    // яка сторінка зараз активна, потрібно для divider
    const [activeIndex, setActiveIndex] = useState(0);

    // запит до API за списком ігор
    const showGames = ({ platform, index }: IShowGames): void => {
        setLoading(true);
        setActiveBtn(index);

        // коли перехід з кнопки PC на кнопку Browser, скидаємо всі налаштування сторінок на початкові
        setStart(0);
        setActiveIndex(0);
        setDivider(5);

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

    // попередня сторінка з іграми
    // start + gamesPerPage !== 0
    const showPrevPage = () => {
        // якщо активна сторінка не перша, значить можна мінусувати сторінку
        if (activeIndex > 0) {
            // мінусуємо сторінку в списку сторінок
            setActiveIndex(index => index - 1);
            // мінусуємо сторінку у верстці
            setStart(start => start - gamesPerPage);
        }
        // якщо активна сторінка перша з блоку з 5, які показуються && якщо активна сторінка не перша загалом з усього списку
        if (activeIndex === divider - 5 && activeIndex > 0) {
            setDivider(divider => divider - 5);
        }
    };
    // наступна сторінка з іграми
    const showNextPage = () => {
        // якщо активна сторінка не остання
        if (activeIndex + 1 < gamesArr.length / gamesPerPage) {
            // плюсуємо сторінку в списку сторінок
            setActiveIndex(index => index + 1);
            setStart(start => start + gamesPerPage);
        }
        // якщо активна сторінка остання з блоку з 5, які показуються && якщо активна сторінка не остання загалом з усього списку
        if (activeIndex === divider - 1 && activeIndex + 1 < gamesArr.length / gamesPerPage) {
            setDivider(divider => divider + 5);
        }
    };
    // показуємо ту сторінку, по якій клікнув користувач
    const showChosenPage = (pageNumber: number) => {
        setActiveIndex(pageNumber);
        setStart(start => gamesPerPage * pageNumber);
    };

    const setNumOfGamesOnPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGamesPerPage(+e.target.value);
        // показуємо з першої сторінки, скидаємо всі показники при зміни селекту
        setStart(0);
        setActiveIndex(0);
        setDivider(5);
    };

    const [activeIconIndex, setActiveIconIndex] = useState(null);

    return (
        <>
            <div className={styles.main__left}>
                {gamesArr && gamesArr.length > 0 ? (
                    <SortPanel
                        activeBtn={activeBtn}
                        setGamesArr={setGamesArr}
                        showGames={showGames}
                        activeIconIndex={activeIconIndex}
                        setActiveIconIndex={setActiveIconIndex}
                    />
                ) : null}
            </div>
            <div className={styles.main__right}>
                <div className={styles.gameTypes}>
                    <div>
                        <Btns showGames={showGames} activeBtn={activeBtn} setActiveIconIndex={setActiveIconIndex} />
                    </div>
                    <Select options={startOptions} changeAction={setNumOfGamesOnPage} />
                </div>
                {!error ? (
                    <ul className={styles.gameList}>
                        <GameCard games={gamesArr} loading={loading} start={start} offset={gamesPerPage} />
                    </ul>
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
