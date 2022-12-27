import styles from "./header.module.sass";

const Header = (props: any) => {
    return (
        <header className={styles.header}>
            <nav className={styles.header__nav}>
                <ul className={styles.header__list}>
                    <li className={styles.header__listItem}>
                        <a href='#'>
                            <img className={styles.header__searchIcon} src='./search-icon.webp' alt='search-icon' />
                        </a>
                    </li>
                    <li className={styles.header__listItem}>
                        <a href='#'>Log In</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
