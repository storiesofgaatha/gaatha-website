import React, { useLayoutEffect, useState } from 'react';
import { _cs, isDefined, isNotDefined } from '@togglecorp/fujs';
import Link from 'next/link';

import Page from 'components/Page';
import GaathaLogo from 'components/GaathaLogo';
import { primaryRoutes } from 'components/WorkNavbar';

import styles from './styles.module.css';

function PreLoad(props: { show: boolean }) {
    const {
        show,
    } = props;
    const [showAnimation] = useState(show);

    if (!showAnimation) {
        return null;
    }

    return (
        <div id="preload" className={styles.preload}>
            <div className={styles.top} />
            <div className={styles.bottom} />
        </div>
    );
}

interface Props {
    className?: string;
}

function Home(props: Props) {
    const {
        className,
    } = props;

    const [preloadDone, setPreloadDone] = useState<boolean>();
    useLayoutEffect(() => {
        setPreloadDone(sessionStorage.getItem('animationCompleted') === 'true');
        sessionStorage.setItem('animationCompleted', 'true');
    }, []);

    return (
        <Page
            pageTitle="Home"
            className={_cs(styles.home, className)}
            contentClassName={styles.mainContent}
        >

            {isDefined(preloadDone) && (
                <PreLoad show={!preloadDone} />
            )}
            <GaathaLogo variant="large" className={styles.logo} />
            <div className={styles.routes}>
                {primaryRoutes.map((route) => (
                    <Link
                        href={isDefined(route.url) ? route.url : {}}
                        className={_cs(
                            isNotDefined(route.url) && styles.disabled,
                            styles.route,
                        )}
                    >
                        {route.displayName}
                    </Link>
                ))}
            </div>
        </Page>
    );
}

export default Home;
