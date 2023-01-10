import Page from 'components/Page';
import Link from 'next/link';

import styles from './styles.module.css';

const mapLink = 'https://maps.google.com/maps?q=gaatha&t=&z=15&ie=UTF8&iwloc=&output=embed';
const mapAnchorLink = 'https://www.whatismyip-address.com';

function Contact() {
    return (
        <Page
            pageTitle="Contact"
            className={styles.contact}
            contentClassName={styles.mainContent}
        >
            <div className={styles.map}>
                <div className={styles.mapOuter}>
                    <div className={styles.gmapCanvas}>
                        <iframe
                            title="gaathaMap"
                            width={600}
                            height={600}
                            id="gmap_canvas"
                            src={mapLink}
                        />
                        <a
                            href={mapAnchorLink}
                        >
                            Gaatha Location
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.contact}>
                <div className={styles.contactDetail}>
                    <p>Address</p>
                    <p>Kupondole, Jwagal Road</p>
                    <p>Lalitpur, Province 3, Nepal</p>
                </div>
                <div className={styles.contactDetail}>
                    <p>Telephone</p>
                    <p>+977-1234567890</p>
                    <p>+01-1234567</p>
                </div>
                <div className={styles.contactDetail}>
                    <p>Enquiries</p>
                    <p>studio@storiesofgaatha.com</p>
                    <p>For business and general enquires</p>
                </div>
                <div className={styles.contactDetail}>
                    <p>Jobs</p>
                    <p>recruit@storiesofgaatha.com</p>
                    <p>For job opportunities and intership related enquires</p>
                </div>
                <div className={styles.contactDetail}>
                    <p>Social Media</p>
                    <p>
                        <Link
                            href="/"
                        >
                            Instagram
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/"
                        >
                            LinkedIn
                        </Link>
                    </p>
                </div>
            </div>
        </Page>
    );
}

export default Contact;
