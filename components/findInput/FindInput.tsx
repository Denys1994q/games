import { useState } from "react";
import cn from "classnames";

import styles from "./FindInput.module.sass";

import { IFindInputProps } from "./FindInput.props";
import { IArrAllGames } from "../gameCard/GameCard.props";

import GameCard from "../gameCard/GameCard";
import Select from "../inputs/Select";

// самий інпут один винести з його функціями в окремий компонент, ще подрібнити
const FindInput = ({ arrWithAllGames }: IFindInputProps): JSX.Element => {
    // value інпута для пошуку
    const [inputValue, setInputValue] = useState<string>(" ");
    // масив зі знайденими іграми
    const [arrFoundGames, setArrFoundGames] = useState<null | IArrAllGames[]>(null);

    const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        // при новому пошуку (введення нових літер) видаляються знайдені ігри
        setArrFoundGames(null);
    };

    const onFocusChange = () => {
        setInputValue("");
    };

    const onBlurChange = () => {
        setInputValue(" ");
    };
    // знайдені ігри з інпута
    const searchGame = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.length > 0) {
            const searchedGames: IArrAllGames[] = arrWithAllGames.filter((item: IArrAllGames) => {
                let lowerCasedTitle = item.title.toLowerCase();
                return lowerCasedTitle.indexOf((e.target as HTMLInputElement).value.toLowerCase()) > -1;
            });
            setArrFoundGames(searchedGames);
        } else {
            setArrFoundGames(null);
        }
    };
    // знайдені ігри з селекта
    const getGamesFromSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const searchedGames: IArrAllGames[] = arrWithAllGames.filter((item: IArrAllGames) => {
            return item.genre.toLowerCase() === e.target.value.toLowerCase();
        });
        setArrFoundGames(searchedGames);
    };

    return (
        <>
            <input
                value={inputValue}
                onChange={changeInputValue}
                onKeyUp={e => searchGame(e)}
                onFocus={onFocusChange}
                onBlur={onBlurChange}
                id='game'
                type='text'
                className={cn(styles.inputSearch, {
                    [styles.inputSearch_empty]: !inputValue,
                })}
                placeholder='game title'
            />
            <div className={styles.findSelect}>
                <Select
                    options={[
                        "",
                        "shooter",
                        "fighting",
                        "MMOARPG",
                        "ARPG",
                        "Action RPG",
                        "Battle Royale",
                        "MOBA",
                        "Strategy",
                        "Card Game",
                        "MMO",
                        "Sports",
                    ]}
                    changeAction={getGamesFromSelect}
                />
            </div>
            <ul className={styles.inputSearch__list}>
                {arrFoundGames && arrFoundGames.length > 0 ? (
                    <GameCard games={arrFoundGames} start={0} offset={arrFoundGames.length} />
                ) : null}
            </ul>
            {arrFoundGames && arrFoundGames.length === 0 ? (
                <h4 className={styles.inputSearch__notFound}>Games not found</h4>
            ) : null}
        </>
    );
};

export default FindInput;
