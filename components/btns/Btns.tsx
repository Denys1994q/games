import styles from "./Btns.module.sass";

import cn from "classnames";

import { Btn, Platform, btnsProps } from "./Btns.props";

const Btns = ({ showGames, activeBtn, setActiveIconIndex }: btnsProps): JSX.Element => {
    const btnsArr: Btn[] = [{ name: "PC" }, { name: "Browser" }];

    const getGames = (platform: Platform, index: number) => {
        // коли перемикаємо категорію (pc or browser) забираємо сортування
        setActiveIconIndex(null);
        // завантажуємо ігри
        showGames({ platform, index });
    };

    const btns = btnsArr.map((item, index) => {
        const platform = item.name === "PC" ? Platform.PC : Platform.BROWSER;
        return (
            <button
                key={index}
                onClick={() => getGames(platform, index)}
                className={cn([styles.pcBtn, styles.btn], {
                    [styles.btn_active]: activeBtn === index,
                })}>
                {item.name}
            </button>
        );
    });

    return <>{btns}</>;
};

export default Btns;
