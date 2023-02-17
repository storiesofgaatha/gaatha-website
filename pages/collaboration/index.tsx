import { _cs } from '@togglecorp/fujs';
import SideNavbar from 'components/PageWithSideBar/SideNav';
import Image from 'next/image';

import StoriesBlock from 'components/StoriesBlock';

import styles from './styles.module.css';

function Collaboration() {
    return (
        <div className={_cs(
            styles.studio,
        )}
        >
            <div className={styles.bgWrap}>
                <SideNavbar
                    className={styles.navbar}
                    transparentMode
                />
                <div className={styles.leftBackground}>
                    <Image
                        className={styles.image}
                        alt="Left Image"
                        src="about_left.png"
                        placeholder="blur"
                        fill
                    />
                </div>
                <div className={styles.rightBackground}>
                    <Image
                        className={styles.image}
                        alt="Right Image"
                        src="gaatha-dummy.png"
                        placeholder="blur"
                        fill
                    />
                </div>
                <div className={styles.studioContent}>
                    <Image
                        src="logo-dark.png"
                        alt="Gaatha"
                        width={145}
                        height={100}
                    />
                    <StoriesBlock
                        className={styles.storiesBlock}
                        semiTransparent
                    />
                    <div className={styles.studioRoutes}>
                        <h4>
                            collaboration
                        </h4>
                        <p>
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
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collaboration;
