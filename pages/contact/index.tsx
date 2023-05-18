import { _cs } from '@togglecorp/fujs';
import LabelValue from 'components/Page/LabelValue';
import PageWithSideBar from 'components/PageWithSideBar';
import Link from 'next/link';

import styles from './styles.module.css';

const mapLink = 'https://maps.google.com/maps?q=gaatha&t=&z=15&ie=UTF8&iwloc=&output=embed';

function Contact() {
    return (
        <PageWithSideBar
            pageTitle="Contact"
            className={styles.page}
            contentClassName={styles.mainContent}
        >
            <div className={styles.map}>
                <div className={styles.mapOuter}>
                    <div className={styles.gmapCanvas}>
                        <iframe
                            className={styles.gmapIframe}
                            title="gaathaMap"
                            width={600}
                            height={600}
                            id="gmap_canvas"
                            src={mapLink}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.contact}>
                <div className={styles.contactDetail}>
                    <LabelValue
                        label="Address"
                        value={(
                            <>
                                <p>
                                    Kupondole, Jwagal Road
                                </p>
                                <p>
                                    Lalitpur, Province 3, Nepal
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className={styles.contactDetail}>
                    <LabelValue
                        label="Telephone"
                        value={(
                            <>
                                <p>
                                    <Link
                                        href="tel:+977-123456789"
                                        className={styles.link}
                                    >
                                        +977-123456789
                                    </Link>
                                </p>
                                <p>
                                    <Link
                                        className={styles.link}
                                        href="tel:+01-1234567"
                                    >
                                        +1-1234567
                                    </Link>
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className={styles.contactDetail}>
                    <LabelValue
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
