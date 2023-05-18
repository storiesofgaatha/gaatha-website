import React from 'react';
import { _cs } from '@togglecorp/fujs';
import Link from 'next/link';

import Page from 'components/Page';
import GaathaLogo from 'components/GaathaLogo';

import styles from './styles.module.css';

interface Props {
    className?: string;
}

function Home(props: Props) {
    const {
        className,
    } = props;

    return (
        <Page
            pageTitle="Home"
            className={_cs(styles.home, className)}
            contentClassName={styles.mainContent}
        >
            <GaathaLogo variant="large" className={styles.logo} />
            <div className={styles.routes}>
                <Link
                    className={styles.route}
                    href="/works"
                    passHref
                >
                    Works
                </Link>
                <Link
                    className={styles.route}
                    href="/studio"
                    passHref
                >
                    Studio
                </Link>
                <Link
                    className={styles.route}
                    href="/contact"
                    passHref
                >
                    Contact
                </Link>
            </div>
        </Page>
    );
}

export default Home;
