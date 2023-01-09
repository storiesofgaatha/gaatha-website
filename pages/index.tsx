import React from 'react';

import Page from 'components/Page';
import Link from 'next/link';

import styles from './styles.module.css';

function Home() {
    return (
        <Page
            pageTitle="Home"
            className={styles.home}
            contentClassName={styles.mainContent}
        >
            This is gaatha home page
            <div className={styles.routes}>
                <Link
                    href="/works"
                    passHref
                >
                    Works
                </Link>
                <Link
                    href="/studio"
                    passHref
                >
                    Studio
                </Link>
                <Link
                    href="/contact"
                    passHref
                >
                    Contact
                </Link>
                <Link
                    href="/search"
                    passHref
                >
                    Search
                </Link>
            </div>
        </Page>
    );
}

export default Home;
