import StudioNavbar from 'components/StudioNavbar';
import Image from 'next/image';

import StoriesBlock from 'components/StoriesBlock';

import styles from './styles.module.css';

function About() {
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
                                src="/logo-dark.png"
                                alt="Gaatha"
                                width={145}
                                height={100}
                            />
                        </div>
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
                                any design office, the studio isn’t just limited to that but
                                expands to our working site and related collaboration offices
                                working together in a regulated structure. We have organized
                                our workspace such that there are events of critical
                                brainstorming and planning while having interactive sessions
                                within the team building up connections and unity, all adding
                                up to create a joyful experience and story of its own.
                            </p>
                        </div>
                    </div>
                    <div className={styles.rightBackground}>
                        {
                            // TODO: Add image after receiving it from clients
                        }
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src="https://images.unsplash.com/photo-1676909027980-4d01f76652e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
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

export default About;
