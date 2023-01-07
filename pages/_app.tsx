import { Oswald } from "@next/font/google";

import "../styles/globals.sass";
import type { AppProps } from "next/app";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const font = Oswald({ weight: ["400", "600"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className='wrapper'>
            <Header />
            <div className={font.className + " " + "container"}>
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    );
}
