import StudioNavbar from 'components/StudioNavbar';
import Image from 'next/image';
import Link from 'next/link';

import StoriesBlock from 'components/StoriesBlock';
import styles from './styles.module.css';

function Studio() {
    return (
        <div className={styles.studio}>
            <div className={styles.bgWrap}>
                <StudioNavbar
                    className={styles.navbar}
                    transparentMode
                />
                <div className={styles.content}>
                    <div className={styles.studioContent}>
                        <div className={styles.logoWrapper}>
                            <Image
                                className={styles.image}
                                src="/logo-dark.png"
                                alt="Gaatha"
                                width={145}
                                height={100}
                            />
                        </div>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.studioDescription}>
                                Based in Kathmandu, Gaatha (Nepali: गाथा), translating to s
                                stories, started with a young group of collaborative
                                professionals aligned together in creating a studio where
                                ideas are valued to reinforce better solutions in architectural
                                practice. Our studio incorporates a team constantly striving
                                to enhance the built environment with the same care and detail
                                in all works of architecture, planning, landscape, art,
                                graphics and research. Exploring, creating and documenting
                                stories with a team from diverse disciplines across the globe,
                                our practice has remained true to its core values ever since.
                            </div>
                            <StoriesBlock />
                        </div>
                        <div className={styles.studioRoutes}>
                            <Link
                                href="studio/about"
                            >
                                studio
                            </Link>
                            <Link
                                href="studio/design"
                            >
                                design
                            </Link>
                            <Link
                                href="studio/collaboration"
                            >
                                collaboration
                            </Link>
                        </div>
                    </div>
                    <div className={styles.rightBackground}>
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src="/about_right.png"
                            placeholder="blur"
                            fill
                        />
                    </div>
                </div>
                <div className={styles.leftBackground}>
                    <Image
                        className={styles.image}
                        alt="Left Image"
                        src="/about_left.png"
                        placeholder="blur"
                        fill
                    />
                </div>
            </div>
        </div>
    );
}

export default Studio;
