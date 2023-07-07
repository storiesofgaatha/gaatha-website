import { _cs } from '@togglecorp/fujs';
import LabelValue from 'components/Page/LabelValue';
import PageWithSideBar from 'components/PageWithSideBar';
import Link from 'next/link';

import styles from './styles.module.css';

const mapLink = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d883.3079914281183!2d85.31767726964863!3d27.679224598512448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e05ed0b465%3A0xecaf2661bf809d2d!2sGaatha!5e0!3m2!1sen!2snp!4v1684749192840!5m2!1sen!2snp';

function Contact() {
    return (
        <PageWithSideBar
            pageTitle="Contact"
            className={styles.page}
            contentClassName={styles.mainContent}
        >
            <div className={styles.map}>
                <div className={styles.mapOuter}>
                    <iframe
                        className={styles.gmapIframe}
                        title="gaathaMap"
                        id="gmap_canvas"
                        src={mapLink}
                    />
                </div>
            </div>
            <div className={styles.contact}>
                <div className={styles.contactDetail}>
                    <LabelValue
                        className={styles.labelValue}
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
                        className={styles.labelValue}
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
