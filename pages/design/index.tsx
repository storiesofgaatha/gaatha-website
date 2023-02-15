import { _cs } from '@togglecorp/fujs';
import SideNavbar from 'components/PageWithSideBar/SideNav';
import Image from 'next/image';

import styles from './styles.module.css';

function Design() {
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
                        src="dummy.png"
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
                        From the very first interaction to everything that comes along the process,
                        everyone has a story, be that the clients, designers, field workers or the
                        site itself. Collecting and expressing those experiences with
                        us in the process along with theoretical and practical knowledge
                        combined with the most abstract
                        ideas enhance the design, ultimately adding
                        to the experience. Moreover, the idea
                        of multi-disciplinary thinking helps the design evolve in sense of material,
                        aesthetics, functionality and purpose.
                    </div>
                    <div className={styles.studioRoutes}>
                        <div className={styles.studioDescription}>
                            <h4>
                                design
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

export default Design;
