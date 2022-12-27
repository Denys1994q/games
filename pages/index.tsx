import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.sass";

import SortPanel from "../components/pages/main/sortPanel/Main_sortPanel";
import Main_List from "../components/pages/main/Main";
import { useState } from "react";

// кусок коду вкинути в мейнліст і стилі не забути
export default function Home() {
    return (
        <>
            <Head>
                <title>Games</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                <Main_List />
            </main>
        </>
    );
}
