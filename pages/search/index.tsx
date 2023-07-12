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
            <p>This page is under construction.</p>
            <Link
                href="/"
            >
                Go back to home page
            </Link>
        </div>
    );
}

export default Search;
