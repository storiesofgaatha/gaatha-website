import React from 'react';
import { _cs, isDefined, isNotDefined } from '@togglecorp/fujs';
import Link from 'next/link';

import Page from 'components/Page';
import GaathaLogo from 'components/GaathaLogo';
import { primaryRoutes } from 'components/WorkNavbar';

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
