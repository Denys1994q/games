import styles from "./GameCard.module.sass";

import Image from "next/image";

import ClipLoader from "react-spinners/ClipLoader";
// props types
import { GamesType } from "./gameCard.props";
import Link from "next/link";

const GameCard = ({ games, loading, start, offset }: GamesType): JSX.Element => {
    return (
        <>
            {games && games.length > 0 && !loading ? (
                games.slice(start, start + offset).map((item, i) => {
                    return (
                        <li key={i} className={styles.gameCard}>
                            {games && games.length > 0 ? (
                                <Image
                                    src={item.thumbnail}
                                    width='220'
                                    height='120'
                                    className={styles.gameCard__img}
                                    alt='game__img'
                                />
                            ) : null}
                            <h4 className={styles.title}>{item.title}</h4>
                            <h5 className={styles.type}>{item.genre}</h5>
                            <Link href={`/game/${item.id}`} className={styles.details}>
                                visit page
                            </Link>
                        </li>
                    );
                })
            ) : (
                <ClipLoader
                    color={"#ddd"}
                    loading={loading}
                    size={30}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                />
            )}
        </>
    );
};

export default GameCard;
