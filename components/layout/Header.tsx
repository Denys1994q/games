import styles from "./Header.module.sass";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";

const Header = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <nav className={styles.header__nav}>
                <ul className={styles.header__list}>
                <li className={styles.header__listItem}>
                        <Link href='/'>
                            <FontAwesomeIcon
                                icon={faHome}
                                size='xl'
                                style={{ width: 20 }}
                                className={styles.header__searchIcon}
                            />
                        </Link>
                    </li>
                    <li className={styles.header__listItem}>
                        <Link href='/search'>
                            <FontAwesomeIcon
                                icon={faSearch}
                                size='xl'
                                style={{ width: 20 }}
                                className={styles.header__searchIcon}
                            />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
