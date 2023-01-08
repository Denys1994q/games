import styles from "../../styles/Game.module.sass";

import { useState } from "react";
import cn from "classnames";

import { useHttp } from "../../hooks/http.hook";

import SliderComponent from "../../components/slider/Slider";

interface IGamePageProps {
    gameCard: IGame;
}
interface IGame {
    thumbnail: string;
    title: string;
    description: string;
    developer: string;
    freetogame_profile_url: string;
    game_url: string;
    genre: string;
    id: number;
    minimum_system_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    };
    platform: string;
    publisher: string;
    release_date: string;
    screenshots: IGameScreenshots[];
    short_description: string;
    status: string;
}

interface IGameScreenshots {
    image: string;
}

export const getStaticPaths = async () => {
    const res: any = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    });

    const res1 = await res.json();

    const paths = res1.map((game: { id: string }) => {
        return {
            params: { id: game.id.toString() },
        };
    });
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context: any) => {
    const gameId = context.params.id;
    const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    });
    const res1 = await res.json();
    return {
        props: {
            gameCard: res1,
        },
    };
};

const Game = ({ gameCard }: IGamePageProps): JSX.Element => {
    const [openReadMoreBlock, setOpenReadMoreBlock] = useState<boolean>(false);

    const showFullDesc = () => {
        if (!openReadMoreBlock) {
            setOpenReadMoreBlock(true);
        } else {
            setOpenReadMoreBlock(false);
        }
    };

    const firstDotIndex = gameCard.description.indexOf(".");
    const shortDescription = gameCard.description.slice(0, firstDotIndex + 1);
    const clipedDescription = gameCard.description.slice(shortDescription.length, gameCard.description.length);

    const slidesArr = gameCard.screenshots.map((item: { image: string }) => {
        return item.image;
    });

    return (
        <>
            <section className={styles.game}>
                <div className={styles.image}>
                    <img src={gameCard.thumbnail} alt='game-image' />
                    <p className={cn([styles.infoItem, styles.status])}>Status: {gameCard.status}</p>
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>{gameCard.title}</p>
                    <div className={cn([styles.subtitleBlock, styles.infoBlock])}>
                        <p className={styles.subtitleName}></p>
                        <div className={styles.infoItem}>
                            <span>Release Date</span>
                            <p>{gameCard.release_date}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Game developer</span>
                            <p>{gameCard.developer}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Publisher</span>
                            <p>{gameCard.publisher}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Genre</span>
                            <p>{gameCard.genre}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Platform</span>
                            <p>{gameCard.platform}</p>
                        </div>
                    </div>
                    <div className={styles.subtitleBlock}>
                        <p className={styles.subtitleName}>About {gameCard.title}</p>
                        <p>{shortDescription}</p>
                        <p
                            className={cn({
                                [styles.description__active]: openReadMoreBlock,
                                [styles.fullDescription]: !openReadMoreBlock,
                            })}>
                            {clipedDescription}
                        </p>
                        <span onClick={() => showFullDesc()} className={styles.readMore}>
                            {openReadMoreBlock ? "Read less" : "Read more"}
                        </span>
                    </div>
                    <div className={styles.subtitleBlock}>
                        <SliderComponent arr={slidesArr} slidesToShowNum={2} imgClass={styles.slider__image} />
                    </div>
                    <div className={styles.subtitleBlock}>
                        <p className={styles.subtitleName}>Minimum System Requirements</p>

                        <div className={cn([styles.subtitleBlock, styles.infoBlock])}>
                            <p className={styles.subtitleName}></p>
                            {gameCard.minimum_system_requirements ? (
                                <>
                                    <div className={styles.infoItem}>
                                        <span>OS</span>
                                        <p>{gameCard.minimum_system_requirements.os}</p>
                                        <span>Memory</span>
                                        <p>{gameCard.minimum_system_requirements.memory}</p>
                                        <span>Storage</span>
                                        <p>{gameCard.minimum_system_requirements.storage}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span>Processor</span>
                                        <p>{gameCard.minimum_system_requirements.processor}</p>
                                        <span>Graphics</span>
                                        <p>{gameCard.minimum_system_requirements.graphics}</p>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Game;
