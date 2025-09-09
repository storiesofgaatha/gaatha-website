import { _cs } from '@togglecorp/fujs';
import LabelValue from 'components/Page/LabelValue';
import PageWithSideBar from 'components/PageWithSideBar';
import Link from 'next/link';

import styles from './styles.module.css';

function Contact() {
    return (
        <PageWithSideBar
            pageTitle="Contact"
            className={styles.page}
            contentClassName={styles.mainContent}
        >
            <div className={styles.contact}>
                <div className={styles.contactDetail}>
                    <LabelValue
                        className={styles.labelValue}
                        label="Telephone"
                        value={(
                            <>
                                <p>
                                    <Link
                                        href="tel:+977-9766388487"
                                        className={styles.link}
                                    >
                                        +977-9766388487
                                    </Link>
                                </p>
                                {/*
                                <p>
                                    <Link
                                        className={styles.link}
                                        href="tel:+01-1234567"
                                    >
                                        +1-1234567
                                    </Link>
                                </p>
                                  */}
                            </>
                        )}
                    />
                </div>
                <div className={styles.contactDetail}>
                    <LabelValue
                        className={styles.labelValue}
                        label="Enquiries"
                        value={(
                            <>
                                <Link
                                    className={_cs(styles.link, styles.email)}
                                    target="_blank"
                                    href="mailto:studio@storiesofgaatha.com"
                                    rel="noreferrer noopener"
                                >
                                    studio@storiesofgaatha.com
                                </Link>
                                <p>
                                    For business and general enquires
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className={styles.contactDetail}>
                    <LabelValue
                        className={styles.labelValue}
                        label="Jobs"
                        value={(
                            <>
                                <Link
                                    className={_cs(styles.link, styles.email)}
                                    target="_blank"
                                    href="mailto:recruit@storiesofgaatha.com"
                                    rel="noreferrer noopener"
                                >
                                    recruit@storiesofgaatha.com
                                </Link>
                                <p>
                                    For job opportunities and internship related enquires
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className={styles.contactDetail}>
                    <LabelValue
                        className={styles.labelValue}
                        label="Social Media"
                        value={(
                            <>
                                <p>
                                    <Link
                                        className={styles.link}
                                        target="_blank"
                                        href="https://www.instagram.com/_gaatha_/"
                                    >
                                        Instagram
                                    </Link>
                                </p>
                                <p>
                                    <Link
                                        className={styles.link}
                                        target="_blank"
                                        href="https://www.linkedin.com/in/gaatha-admin-3b14a421b/"
                                    >
                                        LinkedIn
                                    </Link>
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className={styles.contactQuote}>
                    We&apos;d love to hear from you.
                </div>
            </div>
        </PageWithSideBar>
    );
}

export default Contact;
