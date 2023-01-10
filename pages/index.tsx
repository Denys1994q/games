import Head from "next/head";
import styles from "../styles/Home.module.sass";

import Main from "../components/pages/main/Main";

export const getStaticProps = async () => {
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "660acd6f64msh16b15f2e86fab3ep160cf2jsn20fce72e0ccb",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    };

    const res = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc", options);

    const games = await res.json();

    return {
        props: { games },
        revalidate: 5,
    };
};

export default function Home({ games }: any) {
    return (
        <>
            <Head>
                <title>Games</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                <Main prerenderedGames={games} />
            </main>
        </>
    );
}
