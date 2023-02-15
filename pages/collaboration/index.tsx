import { _cs } from '@togglecorp/fujs';
import SideNavbar from 'components/PageWithSideBar/SideNav';
import Image from 'next/image';

import styles from './styles.module.css';

function Collaboration() {
    return (
        <div className={_cs(
            styles.studio,
        )}
        >
            <div className={styles.bgWrap}>
                <SideNavbar
                    transparentMode
                />
                <div className={styles.leftBackground}>
                    <Image
                        alt="Left Image"
                        src="about_left.png"
                        placeholder="blur"
                        quality={100}
                        width={1104}
                        height={920}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <div className={styles.rightBackground}>
                    <Image
                        alt="Right Image"
                        src="gaatha-dummy.png"
                        placeholder="blur"
                        quality={100}
                        width={700}
                        height={1000}
                        sizes="100vw"
                        style={{
                            objectFit: 'fill',
                        }}
                    />
                </div>
                <div className={styles.studioContent}>
                    <Image
                        src="logo-dark.png"
                        alt="Gaatha"
                        width={145}
                        height={100}
                    />
                    <div className={styles.studioDescription}>
                        We have valued our partnerships while collaborating with
                        various engineering professionals, architects, artists,
                        academicians, local communities and stakeholders aiding
                        in useful and interactive problem-solving in the overall
                        design and delivery process. Constant interaction with
                        multiple disciplines inspires us into newer perspectives
                        of approaching a subject while opening a window of
                        opportunity to learn and grow. For instance, getting
                        to know the material and construction techniques of
                        natural building practice from the perspective of site
                        personnel allows our team to experiment further on
                        possibilities of design which ultimately opens up further
                        conversation for innovation in the projects.
                    </div>
                    <div className={styles.studioRoutes}>
                        <div className={styles.studioDescription}>
                            <h4>
                                collaboration
                            </h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Corrupti praesentium
                                impedit libero voluptatum officiis. Vero
                                iure cumque inventore. Animi, sit?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collaboration;
