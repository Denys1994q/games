import styles from "./pagination.module.sass";
import cn from "classnames";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { PaginationProps } from "../pagination/Pagination.props";

// пагінація - по gamesPerPage пропозицій робіт на одній сторінці
const PagesPanel = ({
    start,
    gamesPerPage,
    games,
    showPrevPage,
    showNextPage,
    showChosenPage,
    divider,
}: PaginationProps) => {
    // індекс активної сторінки, розділювач - по скільки сторінок, стале число, межа - останнє число, яке показується. Якщо індекс > межа, межа зростає на розділювач. Основне правило: все, що до межі - 5 не показується.
    // показувати ті, що менше розділювача. Якщо індекс стає більше розділювача, то всі до нього зникають, а наступні 5 показуються
    // всього сторінок 22. Індекс активної сторінки - 8. Розділювач 5. Межа - Індекс активної сторінки - розділювач. Коли я стану на 6 сторінку, все, що до 6 дісплей нан, все, що 6 + 5 показується.

    // divider зростає на 5, все що перед ним зникає, крім divider - 5
    // коли клацає на index > divider divider збільшується на 5.

    const showPagesNumbers =
        games && games.length > 0
            ? games.map((item: any, index: number) => {
                  // скільки створюється загалом сторінок
                  if (index < games.length / gamesPerPage) {
                      // скільки з них показується
                      if (index < divider) {
                          return (
                              <li
                                  key={index}
                                  onClick={() => showChosenPage(index)}
                                  className={cn({
                                      [styles.activePageNumber]: index === start / gamesPerPage,
                                      [styles.hide]: index < divider - 5,
                                  })}>
                                  {index + 1}
                              </li>
                          );
                      }
                  }
              })
            : null;

    return (
        <div className={styles.pagesPanel}>
            <ul>
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    style={{ color: "#7D859C", width: 25, height: 18, opacity: start !== 0 ? "1" : ".2" }}
                    onClick={() => showPrevPage()}
                    className={styles.pagesPanel__leftArrow}></FontAwesomeIcon>
                {showPagesNumbers}
                <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                        color: "#7D859C",
                        width: 25,
                        height: 18,
                        opacity: start + gamesPerPage < games.length ? "1" : ".2",
                    }}
                    onClick={() => showNextPage()}
                    className={styles.pagesPanel__rightArrow}></FontAwesomeIcon>
            </ul>
        </div>
    );
};

export default PagesPanel;
