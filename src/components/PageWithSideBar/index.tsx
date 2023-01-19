import Head from 'next/head';
import { _cs } from '@togglecorp/fujs';
import SideNavbar from './SideNav';

import styles from './styles.module.css';

interface Props {
    className?: string;
    pageTitle?: string;
    children: React.ReactNode;
    contentClassName?: string;
    mode: 'dark' | 'light';
}

function PageWithSideBar(props: Props) {
    const {
        mode,
        className,
        pageTitle = 'Gaatha',
        children,
        contentClassName,
    } = props;

    return (
        <div className={_cs(
            styles.page,
            className,
            mode === 'dark' ? styles.dark : styles.light,
            )}>
            <Head>
                {pageTitle}
            </Head>
            <div className={styles.sideNavbar}>
                <SideNavbar className={styles.navbar} />
                <div className={_cs(styles.content, contentClassName)}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PageWithSideBar;
