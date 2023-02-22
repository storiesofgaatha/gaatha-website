import React from 'react';
import { _cs } from '@togglecorp/fujs';
import Link from 'next/link';
import Image from 'next/image';

import Page from 'components/Page';

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
            <Image
                className={styles.logo}
                src="/logo-light.png"
                alt="Gaatha"
                width={400}
                height={300}
            />
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
