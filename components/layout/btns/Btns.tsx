import styles from "./btns.module.sass";

import cn from "classnames";

import { Btn, Platform, btnsProps } from "./Btns.props";

const Btns = ({ showGames, activeBtn }: btnsProps): JSX.Element => {
    const btnsArr: Btn[] = [{ name: "PC" }, { name: "Browser" }];

    const btns = btnsArr.map((item, index) => {
        const platform = item.name === "PC" ? Platform.PC : Platform.BROWSER;
        return (
            <button
                key={index}
                onClick={() => showGames({ platform, index })}
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
