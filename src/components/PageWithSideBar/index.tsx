import Head from 'next/head';
import { isNotDefined, _cs } from '@togglecorp/fujs';
import StudioNavbar from 'components/StudioNavbar';
import WorkNavbar from 'components/WorkNavbar';
import GaathaLogo from 'components/GaathaLogo';
import SideNavbar from './SideNav';

import styles from './styles.module.css';

interface Category {
    id: string;
    name: string;
}

interface Props {
    className?: string;
    pageTitle?: string;
    children: React.ReactNode;
    contentClassName?: string;
    lightMode?: boolean;
    navbar?: 'studio' | 'work';
    categories?: Category[] | undefined;
    navbarClassName?: string;
    hideGaathaLogo?: boolean;
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
        categories,
        hideGaathaLogo,
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
                <GaathaLogo
                    className={styles.responsiveLogo}
                    variant="small"
                    lightMode={lightMode}
                />
                {isNotDefined(navbar) && (
                    <SideNavbar
                        className={_cs(navbarClassName, styles.navbar)}
                        lightMode={lightMode}
                        hideGaathaLogo={hideGaathaLogo}
                    />
                )}
                {navbar === 'studio' && (
                    <StudioNavbar
                        className={_cs(navbarClassName, styles.navbar)}
                        lightMode={lightMode}
                        hideGaathaLogo={hideGaathaLogo}
                    />
                )}
                {navbar === 'work' && (
                    <WorkNavbar
                        className={_cs(navbarClassName, styles.navbar)}
                        lightMode={lightMode}
                        categories={categories ?? []}
                        hideGaathaLogo={hideGaathaLogo}
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
