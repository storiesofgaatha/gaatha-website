import Head from 'next/head';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.module.css';

interface Props {
    className?: string;
    pageTitle?: string;
    children: React.ReactNode;
    contentClassName?: string;
}

function Page(props: Props) {
    const {
        className,
        pageTitle = 'Gaatha',
        children,
        contentClassName,
    } = props;

    return (
        <div className={_cs(styles.page, className)}>
            <Head>
                {pageTitle}
            </Head>
            <div className={styles.sideNavbar}>
                <div className={_cs(styles.content, contentClassName)}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Page;
