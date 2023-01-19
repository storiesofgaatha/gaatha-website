import PageWithSideBar from 'components/PageWithSideBar';

import styles from './styles.module.css';

function People() {
    return (
        <PageWithSideBar
            pageTitle="People"
            mode="dark"
        >
            <div className={styles.people}>
                <div className={styles.listingContainer}>
                    This is the listing container
                </div>
                <div className={styles.artworkContainer}>
                    This is the artwork container
                </div>
            </div>
        </PageWithSideBar>
    );
}

export default People;
