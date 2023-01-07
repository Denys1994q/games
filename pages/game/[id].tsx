import styles from "../../styles/Game.module.sass";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import cn from "classnames";

import { useHttp } from "../../hooks/http.hook";
import ClipLoader from "react-spinners/ClipLoader";

import SliderComponent from "../../components/common/slider/Slider";

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
    image: "";
}

// ЯКЩО ПОМИЛКА ЗРОБИТИ І ВСЕ ОПИСАТИ ЩО ТУТ Є
const Game = (): JSX.Element => {
    const router = useRouter();
    const { id } = router.query;
    const { request } = useHttp();

    const [allGames, setAllGames] = useState<IGame[] | null>(null);
    const [gameCard, setGameCard] = useState<IGame | null>(null);
    const [openReadMoreBlock, setOpenReadMoreBlock] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    // slides imgs arr
    const [screenshotsSlidesArr, setScreenshotsSlidesArr] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            setLoading(true);
            const splitedArr = window.location.href.split("/");
            const IdFromUlr = splitedArr[splitedArr.length - 1];

            request(`https://free-to-play-games-database.p.rapidapi.com/api/games`, "GET", null, {
                "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            }).then(response => setGameCard(response.filter((it: { id: number }) => it.id === +IdFromUlr)));
        } else {
            setLoading(true);
            request(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, "GET", null, {
                "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            }).then(response => setGameCard(response));
            // .catch(er => setError(er));
        }
    }, [id]);

    const showFullDesc = () => {
        if (!openReadMoreBlock) {
            setOpenReadMoreBlock(true);
        } else {
            setOpenReadMoreBlock(false);
        }
    };

    let clipedDescription;
    let shortDescription;
    let firstDotIndex;
    if (gameCard && gameCard.description) {
        firstDotIndex = gameCard.description.indexOf(".");
        shortDescription = gameCard.description.slice(0, firstDotIndex + 1);
        clipedDescription = gameCard.description.slice(shortDescription.length, gameCard.description.length);
    }

    useEffect(() => {
        let copy: string[] = [];
        if (gameCard) {
            {
                gameCard.hasOwnProperty("screenshots") && gameCard.screenshots.length > 0
                    ? gameCard.screenshots.map(item => {
                          copy.push(item.image);
                      })
                    : null;
            }

            setScreenshotsSlidesArr(copy);
        }
    }, [gameCard]);

    return (
        <>
            {!error && gameCard && gameCard.id ? (
                <div className={styles.game}>
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
                            <SliderComponent
                                arr={screenshotsSlidesArr}
                                slidesToShowNum={2}
                                imgClass={styles.slider__image}
                            />
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
                </div>
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

export default Game;
