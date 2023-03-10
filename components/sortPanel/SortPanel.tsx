import styles from "./SortPanel.module.sass";
import cn from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faSortAlphaAsc, faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";

import { useHttp } from "../../hooks/http.hook";
import { ISortProps } from "./sortPanel.props";
import { Platform } from "../btns/Btns.props";

// помилку обробити
const SortPanel = ({
    activeIconIndex,
    setActiveIconIndex,
    activeBtn,
    setGamesArr,
    showGames,
}: ISortProps): JSX.Element => {
    const { request } = useHttp();

    const icons = [faCalendarAlt, faSortAlphaAsc, faSortAmountAsc];

    const contentIcons = icons.map((item, index) => {
        return (
            <li
                key={index}
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
        const platform = activeBtn === 0 ? "pc" : "browser";
        request(
            `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${type}&platform=${platform}`,
            "GET",
            null,
            {
                "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            }
        )
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
            const platform = activeBtn === 0 ? Platform.PC : Platform.BROWSER;
            setActiveIconIndex(null);
            showGames({ platform: platform, index: activeBtn });
        }
    };

    return <ul className={styles.sortPanel}>{contentIcons}</ul>;
};

export default SortPanel;
