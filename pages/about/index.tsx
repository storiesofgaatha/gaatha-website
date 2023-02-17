import { _cs } from '@togglecorp/fujs';
import SideNavbar from 'components/PageWithSideBar/SideNav';
import Image from 'next/image';

import StoriesBlock from 'components/StoriesBlock';

import styles from './styles.module.css';

function About() {
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
                        src="office-desk.png"
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
                            studio
                        </h4>
                        <p>
                            While our workspace follows basic fundamentals and layouts of
                            any design office, the studio isn’t just limited to that but expands
                            to our working site and related collaboration offices working together
                            in a regulated structure. We have organized our workspace such that there
                            are events of critical brainstorming and planning
                            while having interactive sessions within the team building up connections
                            and unity, all adding up to create a
                            joyful experience and story of its own.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
