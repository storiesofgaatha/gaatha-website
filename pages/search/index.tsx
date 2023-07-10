import Head from 'next/head';
import Link from 'next/link';

import GaathaLogo from 'components/GaathaLogo';

import styles from './styles.module.css';

function Search() {
    return (
        <div className={styles.search}>
            <Head>
                Search
            </Head>
            <GaathaLogo variant="large" />
            <h2>This page is currently being modeled.</h2>
            <Link
                href="/"
            >
                Go back to home page
            </Link>
        </div>
    );
}

export default Search;
