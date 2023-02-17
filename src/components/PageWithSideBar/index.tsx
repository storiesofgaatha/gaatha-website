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
}

function PageWithSideBar(props: Props) {
    const {
        className,
        pageTitle = 'Gaatha',
        children,
        contentClassName,
        lightMode = false,
        navbar,
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
                        className={styles.navbar}
                        lightMode={lightMode}
                    />
                )}
                {navbar === 'studio' && (
                    <StudioNavbar
                        className={styles.navbar}
                        lightMode={lightMode}
                    />
                )}
                {navbar === 'work' && (
                    <WorkNavbar
                        className={styles.navbar}
                        lightMode={lightMode}
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
