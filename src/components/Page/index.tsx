import Head from 'next/head';
import { _cs } from '@togglecorp/fujs';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

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
        pageTitle = 'Next',
        children,
        contentClassName,
    } = props;

    return (
        <div className={_cs(styles.page, className)}>
            <Head>
                {pageTitle}
            </Head>
            <Navbar className={styles.navbar} />
            <div className={_cs(styles.content, contentClassName)}>
                {children}
            </div>
            <Footer className={styles.footer} />
        </div>
    );
}

export default Page;
