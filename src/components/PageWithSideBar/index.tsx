import Head from 'next/head';
import { isNotDefined, _cs } from '@togglecorp/fujs';
import StudioNavbar from 'components/StudioNavbar';
import WorkNavbar from 'components/WorkNavbar';
import SideNavbar from './SideNav';

import styles from './styles.module.css';

interface Props {
    className?: string;
    pageTitle?: string;
    children: React.ReactNode;
    contentClassName?: string;
    lightMode?: boolean;
    navbar?: 'studio' | 'work';
    subRoutes?: React.ReactNode;
    subRoutesClassName?: string;
    navbarClassName?: string;
}

function PageWithSideBar(props: Props) {
    const {
        className,
        pageTitle = 'Gaatha',
        children,
        contentClassName,
        lightMode = false,
        navbar,
        navbarClassName,
        subRoutes,
        subRoutesClassName,
    } = props;

    return (
        <div className={_cs(
            styles.page,
            className,
            lightMode && styles.light,
        )}
        >
            <Head>
                {pageTitle}
            </Head>
            <div className={styles.pageContent}>
                {isNotDefined(navbar) && (
                    <SideNavbar
                        className={_cs(navbarClassName, styles.navbar)}
                        lightMode={lightMode}
                    />
                )}
                {navbar === 'studio' && (
                    <StudioNavbar
                        className={_cs(navbarClassName, styles.navbar)}
                        lightMode={lightMode}
                    />
                )}
                {navbar === 'work' && (
                    <WorkNavbar
                        className={_cs(navbarClassName, styles.navbar)}
                        lightMode={lightMode}
                        subRoutes={subRoutes}
                        subRoutesClassName={subRoutesClassName}
                    />
                )}
                <div className={_cs(styles.content, contentClassName)}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PageWithSideBar;
