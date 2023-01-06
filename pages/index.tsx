import React from 'react';

import Page from 'components/Page';

import styles from './styles.module.css';

function Home() {
    return (
        <Page
            pageTitle="Home"
            className={styles.home}
            contentClassName={styles.mainContent}
        >
            This is gaatha home page
        </Page>
    );
}

export default Home;
