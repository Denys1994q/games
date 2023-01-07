import styles from "./Pagination.module.sass";
import cn from "classnames";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { PaginationProps } from "../pagination/Pagination.props";

const PagesPanel = ({
    // рух по створених сторінках: +-, 0 +-
    start,
    // к-ість ігор на одній сторінці: 20
    gamesPerPage,
    // список ігор: 105
    games,
    // показувати попередню сторінку
    showPrevPage,
    // показувати наступну сторінку
    showNextPage,
    // показувати вибрану сторінку (коли юзер клікнув на номер сторінки)
    showChosenPage,
    // скільки зі створених сторінок показується юзеру, наприклад по 5. Коли start доходить до крайнього значення, divider зростає і показуються наступні 5 сторінок
    divider,
}: PaginationProps) => {
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
