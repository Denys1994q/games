import styles from "./Main_sortPanel.module.sass";
import cn from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faSortAlphaAsc, faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { useHttp } from "../../../../hooks/http.hook";
import { ISortProps } from "./Main_sortPanel.props";
import { Platform } from "../../../layout/btns/Btns.props";

// помилку обробити
const SortPanel = ({ setGamesArr, showGames }: ISortProps): JSX.Element => {
    const { request } = useHttp();

    const [activeIconIndex, setActiveIconIndex] = useState(null);

    const icons = [faCalendarAlt, faSortAlphaAsc, faSortAmountAsc];

    const contentIcons = icons.map((item, index) => {
        return (
            <li
                onClick={() => sortGames(index)}
                className={cn(styles.sortPanel__item, {
                    [styles.sortPanel__item_active]: index === activeIconIndex,
                })}>
                <FontAwesomeIcon
                    icon={item}
                    size='xl'
                    style={{ width: 25 }}
                    className={cn(styles.sortPanel__icon, {
                        [styles.sortPanel__icon_active]: index === activeIconIndex,
                    })}
                />
            </li>
        );
    });

    const fetchSortedGames = (type: string) => {
        request(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${type}`, "GET", null, {
            "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        })
            .then(response => setGamesArr(response))
            .catch(er => console.log(er));
    };

    // при сортуванні скидати на першу сторінку завжди
    const sortGames = (index: any) => {
        setActiveIconIndex(index);
        switch (index) {
            case 0:
                fetchSortedGames("release-date");
                break;
            case 1:
                fetchSortedGames("alphabetical");
                break;
            case 2:
                fetchSortedGames("relevance");
                break;
            default:
                break;
        }
        // якщо клік на вже вибраному типі сортування, то всі типи стають не активні і завантажуються дані несортовані
        if (index === activeIconIndex) {
            setActiveIconIndex(null);
            showGames({ platform: Platform.PC, index: 0 });
        }
    };

    return <ul className={styles.sortPanel}>{contentIcons}</ul>;
};

export default SortPanel;
